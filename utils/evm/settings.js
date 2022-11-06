const gasReporter = (
  printToConsole,
  enabled = true,
  excludeContracts = [],
  outputFile,
  currency = 'USD',
  coinmarketcap
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
