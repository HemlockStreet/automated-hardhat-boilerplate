require('../utils/evm/diagnostics');
const { ethers } = require('hardhat');

(async () => {
  const signers = await ethers.getSigners();
  for await (const signer of signers) {
    console.log(
      signer.address,
      parseInt((await ethers.provider.getBalance(signer.address)).toString())
    );
  }
})();
