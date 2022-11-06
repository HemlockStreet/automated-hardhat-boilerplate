require('../utils/evm/diagnostics');
const hre = require('hardhat');
const deployment = require('../utils/evm/deployment');
const contract = require('../utils/evm/contract');

async function deploy(chainId, unlockTime, value) {
  return await deployment.andVerify('Lock', chainId, [unlockTime, { value }]);
}

async function andValidate(chainId, unlockTime, value) {
  const lock = contract.retrieve('Lock', chainId);
  const signers = await hre.ethers.getSigners();
  let result;

  result = parseInt((await lock.unlockTime()).toString());
  if (result !== unlockTime) throw new Error('unlockTime');

  result = await lock.owner();
  if (result !== signers[0].address) throw new Error('owner');

  result = parseInt(
    (await hre.ethers.provider.getBalance(lock.address)).toString()
  );
  if (result !== parseInt(value.toString())) throw new Error('value');
}

(async () => {
  const { chainId } = await hre.ethers.provider.getNetwork();
  const unlockTime = Math.round(Date.now() / 1000) + 365 * 24 * 60 * 60;
  const value = hre.ethers.utils.parseUnits('1.0', 'gwei');
  await deploy(chainId, unlockTime, value);
  await andValidate(chainId, unlockTime, value);
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
