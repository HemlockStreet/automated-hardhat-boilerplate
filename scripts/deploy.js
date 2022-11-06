require('../utils/evm/diagnostics');
const hre = require('hardhat');
const deployment = require('../utils/evm/deployment');

async function deployLock() {
  const { chainId } = await hre.ethers.provider.getNetwork();
  const unlockTime = Math.round(Date.now() / 1000) + 365 * 24 * 60 * 60;
  const value = hre.ethers.utils.parseUnits('1.0', 'gwei');
  return await deployment.andVerify('Lock', chainId, [unlockTime, { value }]);
}

deployLock().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
