require('../utils/evm/diagnostics');
const hre = require('hardhat');
const deployment = require('../utils/evm/deployment');
const contract = require('../utils/evm/contract');

async function deployLock() {
  const unlockTime = Math.round(Date.now() / 1000) + 365 * 24 * 60 * 60;
  const value = hre.ethers.utils.parseUnits('1.0', 'gwei');
  return await deployment.andVerify('Lock', chainId, [unlockTime, { value }]);
}

async function checkLock() {
  const lock = contract.retrieve('Lock', chainId);
  const signers = await hre.ethers.provider.getSigners();
}

(async () => {
  const { chainId } = await hre.ethers.provider.getNetwork();
  await deployLock(chainId);
  await checkLock(chainId);
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
