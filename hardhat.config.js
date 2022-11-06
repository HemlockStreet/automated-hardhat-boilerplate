require('@nomicfoundation/hardhat-toolbox');
const EvmConfig = require('./utils/classes/EvmConfig/EvmConfig');

// EvmConfig(
//   gasReporterArgs = [
//     enabled = true,
//     excludeContracts = [],
//     outputFile = undefined,
//     currency = 'USD',
//   ],
//   solidityArgs = [
//     version = '0.8.17',
//     optimizer = {
//       enabled: true,
//       runs: 200,
//     },
//     otherSettings = {},
//   ]
// );

module.exports = { ...new EvmConfig() };
