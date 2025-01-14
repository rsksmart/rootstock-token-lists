// Index file to generate rootstock-tokens-list.json

const fs = require('fs');

const json = require('./contract-map.json');

const tokensList = [];

const output = {
  "name": "Rootstock Tokens List",
  "logoURI": "ipfs://bafybeigplh4bk2yhwyn7fbyrh436b5jzsdmmjj544wuuqreg4sc7jwa2di/rootstock-orange.png",
  "keywords": [
    "audited",
    "verified",
    "lending",
    "rsk",
    "rootstock"
  ],
  "tags": {
    "stablecoin": {
      "name": "Stablecoin",
      "description": "Tokens that are fixed to an external asset"
    }
  },
  tokens: tokensList,
  "timestamp": "",
  "version": {
    "major": 0,
    "minor": 1,
    "patch": 0
  }
}

for (address in json) {
  const token = json[address];
  tokensList.push({
    "name":token.name,
    "decimals": 18,
    "symbol":  token.symbol,
    "address": address,
    "chainId": 30,
    "logoURI": `ipfs://bafybeigplh4bk2yhwyn7fbyrh436b5jzsdmmjj544wuuqreg4sc7jwa2di/${token.logo}`,
    "tags": []
  })
}

output.timestamp = new Date().toISOString();
output.tokens = tokensList;


fs.writeFile('rootstock-tokens.json', JSON.stringify(output, null, 2), () => {
  console.log('successfully generated rootstock-tokens-list.json!');
});




