require('@nomicfoundation/hardhat-toolbox');
const Config = require('./utils/evm/Config');

const fs = require('fs');
if (!fs.existsSync(`./utils/deploymentMap`))
  fs.mkdirSync('./utils/deploymentMap');
if (!fs.existsSync(`./utils/interfaces`)) fs.mkdirSync('./utils/interfaces');
if (!fs.existsSync(`.env`)) {
  fs.writeFileSync('.env', fs.readFileSync('sample.env', 'utf-8'));
  console.log(
    '\n\x1B[31mENV FILE NOT DETECTED\x1B[39m\n\x1B[33mOne has been generated for your convenience. Please try that again!\x1B[39m\n'
  );
  process.exit(1);
}

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
