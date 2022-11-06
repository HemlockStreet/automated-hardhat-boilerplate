require('@nomicfoundation/hardhat-toolbox');
const EvmConfig = require('./utils/classes/EvmConfig/EvmConfig');

// EvmConfig(
//   printToConsole = false,
//   reporterArgs = {
//     enabled: true,
//     currency: 'USD',
//     excludeContracts: [],
//   },
//   solidityArgs = {
//     version: '0.8.17',
//     settings: {
//       optimizer: { enabled: true, runs: 200 },
//     },
//   }
// );

module.exports = { ...new EvmConfig(true) };
