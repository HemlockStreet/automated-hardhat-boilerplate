require('dotenv').config();
const { getCredentials } = require('./credentials');

const defaultGas = {
  currency: 'USD',
  excludeContracts: [],
};

const defaultSol = {
  version: '0.8.17',
  settings: {
    optimizer: { enabled: true, runs: 200 },
  },
};

class Config {
  constructor(printToConsole, reporterArgs, solidityArgs) {
    const { etherscan, networks, coinmarketcap } =
      getCredentials(printToConsole);
    this.etherscan = etherscan;
    this.networks = networks;

    this.gasReporter = !reporterArgs
      ? { enabled: coinmarketcap !== undefined, ...defaultGas, coinmarketcap }
      : {
          enabled:
            reporterArgs.enabled === undefined
              ? coinmarketcap !== undefined
              : reporterArgs.enabled,
          currency: reporterArgs.currency
            ? reporterArgs.currency
            : defaultGas.currency,
          excludeContracts: reporterArgs.excludeContracts
            ? reporterArgs.excludeContracts
            : defaultGas.excludeContracts,
          coinmarketcap,
        };

    this.solidity = !solidityArgs
      ? defaultSol
      : {
          version: solidityArgs.version
            ? solidityArgs.version
            : defaultSol.version,
          settings: solidityArgs.settings
            ? solidityArgs.settings
            : defaultSol.settings,
        };

    // if (printToConsole) {
    //   console.log(`|| Settings\n|||| gasReporter:`);
    //   Object.keys(this.gasReporter).forEach((key) => {
    //     const value = this.gasReporter[key];
    //     if (key !== 'coinmarketcap') console.log(`|||||| ${key}: ${value}`);
    //   });
    //   console.log('|||| solidity');
    //   Object.keys(this.solidity).forEach((key) => {
    //     const value = this.solidity[key];
    //     console.log(
    //       `|||||| ${key}: ${
    //         typeof value === typeof {} ? JSON.stringify(value) : value
    //       }`
    //     );
    //   });
    //   console.log('\nEvmConfig Prepared!\n');
    // }
  }
}

module.exports = Config;
