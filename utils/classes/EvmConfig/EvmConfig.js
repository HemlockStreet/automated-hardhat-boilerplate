require('dotenv').config();
const settings = require('./settings');
const { etherscan, networks } = require('./credentials');

class EvmConfig {
  constructor(reporterArgs, solidityArgs) {
    this.gasReporter = reporterArgs
      ? settings.gasReporter(...reporterArgs)
      : settings.gasReporter();

    this.solidity = solidityArgs
      ? settings.solidity(...solidityArgs)
      : settings.solidity();

    this.etherscan = etherscan;

    this.networks = networks;

    console.log();
  }
}

module.exports = EvmConfig;
