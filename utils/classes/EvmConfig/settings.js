const { coinmarketcap } = require('./credentials');

const solidity = (
  version = '0.8.17',
  optimizer = { enabled: true, runs: 200 },
  otherSettings = {}
) => {
  return {
    version,
    settings: {
      optimizer,
      ...otherSettings,
    },
  };
};

const gasReporter = (
  enabled = true,
  excludeContracts = [],
  outputFile,
  currency = 'USD'
) => {
  let settings = {
    enabled,
    currency,
    excludeContracts,
    coinmarketcap,
  };

  if (!coinmarketcap) settings.enabled = false;

  if (outputFile) {
    settings.outputFile = outputFile;
    settings.noColors = true;
  }

  return settings;
};

module.exports = { solidity, gasReporter };
