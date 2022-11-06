require('@nomicfoundation/hardhat-toolbox');
const Config = require('./utils/evm/Config');
const fs = require('fs');

if (!fs.existsSync(`./utils/deploymentMap`))
  fs.mkdirSync('./utils/deploymentMap');
if (!fs.existsSync(`./utils/interfaces`)) fs.mkdirSync('./utils/interfaces');

// Config(
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

module.exports = { ...new Config() };
