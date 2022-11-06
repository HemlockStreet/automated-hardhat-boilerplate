const hre = require('hardhat');
const deployment = require('../utils/evm/deployment');

async function deployLock() {
  const { chainId } = await hre.ethers.provider.getNetwork();
  const unlockTime = Math.round(Date.now() / 1000) + 365 * 24 * 60 * 60;
  const value = hre.ethers.utils.parseEther('1');
  return await deployment.andVerify('Lock', chainId, [unlockTime, { value }]);
}

deployLock().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
