const hre = require('hardhat');
const { ethers, artifacts, network } = hre;
const { verifiable } = require('./credentials');
const Cache = require('../Cache');

async function runDeployment(name, chainId, args = []) {
  console.log(`\nDeploying ${name}...`);
  const NewFactory = await ethers.getContractFactory(name);
  const NewContract = await NewFactory.deploy(...args);

  await NewContract.deployed();
  console.log(`|| ${name} deployed to ${NewContract.address}`);

  const deploymentMap = new Cache(`./utils/deploymentMap/${chainId}.json`);
  deploymentMap.replace(name, NewContract.address);
  console.log(`|||| Saving address...`);

  console.log(`|||| Saving artifacts...`);
  const abi = new Cache(`./utils/interfaces/${name}.json`);
  abi.update({ abi: artifacts.readArtifactSync(name).abi });

  return NewContract;
}

async function verify(tx, options, chainId) {
  console.log(
    `|||| Awaiting 60 Seconds or 5 Confirmations... Whichever is last...`
  );
  let confirmations = 0;
  let diff = 0;
  let start = Date.now();
  while ((confirmations < 5 && diff > 60) || diff < 60) {
    const receipt = await tx.wait();
    if (receipt.status !== 1) throw new Error('tx failure', receipt);
    confirmations++;
    await new Promise((resolve) => setTimeout(resolve, 1000));
    diff = Math.floor((Date.now() - start) / 1000);
  }

  try {
    console.log('Verifying...');
    await hre.run('verify:verify', options);
    console.log('|||||| Verified!');
  } catch (e) {
    const reason = e.toString().split('\n')[2];
    if (reason === 'Reason: Already Verified')
      console.log('|||||| Double Verified!');
    else if (
      reason ===
      `Reason: The Etherscan API responded that the address ${options.address} does not have bytecode.`
    ) {
      console.log('|||||| Contract not indexed, re-verifying...');
      await verify(tx, options, chainId);
    } else throw e;
  }
}

async function andVerify(name, chainId, args = [], fqn) {
  const NewContract = await runDeployment(name, chainId, args);
  if (!verifiable(network.name)) return NewContract;

  const tx = NewContract.deployTransaction;

  const options = {
    address: NewContract.address,
    constructorArguments: args,
    contract: fqn ? fqn : undefined,
  };

  await verify(tx, options, chainId);

  return NewContract;
}

module.exports = { runDeployment, andVerify };
