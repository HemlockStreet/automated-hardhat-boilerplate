require('dotenv').config();
const settings = require('./settings');
const { getCredentials } = require('./credentials');

class EvmConfig {
  constructor(printToConsole, reporterArgs, solidityArgs) {
    const { etherscan, networks, coinmarketcap } =
      getCredentials(printToConsole);

    this.gasReporter = reporterArgs
      ? settings.gasReporter(...reporterArgs)
      : settings.gasReporter();

    this.solidity = solidityArgs
      ? settings.solidity(...solidityArgs, coinmarketcap)
      : settings.solidity();

    this.etherscan = etherscan;

    this.networks = networks;

    if (printToConsole) console.log('\nEvmConfig Prepared!\n');
  }
}

module.exports = EvmConfig;
