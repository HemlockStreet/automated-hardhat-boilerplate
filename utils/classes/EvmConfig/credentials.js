require('dotenv').config();
const { readFileSync, writeFileSync } = require('fs');
const ethers = require('ethers');

// .ENV EXTRACTION
const credentials = {
  mainnet: {
    scanner: process.env.ETHERSCAN,
    provider: process.env.MAINNET_PROVIDER,
  },
  goerli: {
    scanner: process.env.ETHERSCAN,
    provider: process.env.GOERLI_PROVIDER,
  },
  polygon: {
    scanner: process.env.POLYGONSCAN,
    provider: process.env.POLYGON_PROVIDER,
  },
  polygonMumbai: {
    scanner: process.env.POLYGONSCAN,
    provider: process.env.MUMBAI_PROVIDER,
  },
  bsc: {
    scanner: process.env.BSCSCAN,
    provider: process.env.BSC_PROVIDER,
  },
  bscTestnet: {
    scanner: process.env.BSCSCAN,
    provider: process.env.BSC_TESTNET_PROVIDER,
  },
  opera: {
    scanner: process.env.FTMSCAN,
    provider: process.env.OPERA_PROVIDER,
  },
  ftmTestnet: {
    scanner: process.env.FTMSCAN,
    provider: process.env.FTM_TESTNET_PROVIDER,
  },
  avalanche: {
    scanner: process.env.SNOWTRACE,
    provider: process.env.AVALANCHE_PROVIDER,
  },
  avalancheFujiTestnet: {
    scanner: process.env.SNOWTRACE,
    provider: process.env.FUJI_PROVIDER,
  },
};

// BASIC CREDENTIAL DIAGNOSTICS
const verifiable = (name) => credentials[name].scanner;
const deployable = (name) => credentials[name].provider;

// PREPARE HARDHAT VERIFIER CREDENTIALS
console.log(
  '\nPreparing EvmConfig...\n\n|| Credentials\n|||| Scanners & Providers'
);
let apiKey = {};
Object.keys(credentials).forEach((name) => {
  if (deployable(name)) {
    if (!verifiable(name))
      console.log(
        `|||||| \x1B[33m${name} \x1B[39m- Scanner Key Missing (Unable to Verify)`
      );
    else {
      console.log(`||||||\x1B[92m ${name}\x1B[39m`);
      apiKey[name] = verifiable(name);
    }
  } else
    console.log(
      `|||||| \x1B[31m${name} \x1B[39m - Provider Missing (Unable to Deploy)`
    );
});

const etherscan = { apiKey };

// PREPARE GAS REPORTER CREDENTIALS
console.log(`|||| Gas Reporter`);
const coinmarketcap = process.env.COINMARKETCAP_API_KEY;
if (coinmarketcap)
  console.log(`||||||\x1B[92m CoinMarketCap API Key Found!\x1B[39m`);
else
  console.warn(
    `||||||\x1B[33m CoinMarketCap API Key Missing! Unable to report gas consumption...\x1B[39m`
  );

// PREPARE EVM WALLET CREDENTIALS
const WALLET_KEYS = process.env.WALLET_KEYS;
console.log(`|||| Wallet Keys`);
let accounts = '';
if (WALLET_KEYS) {
  accounts = WALLET_KEYS.includes(',') ? WALLET_KEYS.split(',') : [WALLET_KEYS];
  console.log(`||||||\x1B[92m ${accounts.length} Wallet keys found!\x1B[39m`);
  accounts.forEach((key) => {
    console.log(`|||||| ${new ethers.Wallet(key).address}`);
  });
} else {
  const num = 5;
  console.log(
    `||||||\x1B[33m Missing Wallet Keys! Generating ${num} accounts...\x1B[39m`
  );
  let acc = '';
  for (let i = 0; i < num; i++) {
    const wallet = ethers.Wallet.createRandom();
    const key = wallet._signingKey().privateKey;
    acc = acc === '' ? key : `${acc},${key}`;
    console.log(`|||||| ${wallet.address}`);
  }
  writeFileSync('.env', readFileSync('.env', 'utf-8') + `WALLET_KEYS=${acc}\n`);
  accounts = acc.split(',');
}

// PREPARE NETWORK PROVIDER CREDENTIALS
let networks = {};
Object.keys(credentials).forEach((name) => {
  if (deployable(name)) networks[name] = { accounts, url: deployable(name) };
});

module.exports = { etherscan, coinmarketcap, networks, verifiable, deployable };
