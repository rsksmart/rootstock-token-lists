import fs from 'fs';

const tokenUrl = 'https://raw.githubusercontent.com/rsksmart/rsk-contract-metadata/refs/heads/master/contract-map.json';

const fetchTokens = async () => {
  try {
    const response = await fetch(tokenUrl);

    if (response.ok && response.status === 200) {
      const data = await response.json();

      return Promise.resolve(data);
    }

    return Promise.resolve({});
  } catch (e) {
    return Promise.resolve({});
  }
}

async function generate() {
  return new Promise(async (resolve, reject) => {
    const v = { "major": 1, "minor": 0, "patch": 1 };
    const datetime = new Date().toISOString();
    const tokensList = [];
    const rawTokens = await fetchTokens();
    const output = {
      "name": "Rootstock Tokens List",
      "logoURI": "https://avatars.githubusercontent.com/u/28455056",
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
      "timestamp": datetime,
      "version": v
    }

    for (const address in rawTokens) {
      const token = rawTokens[address];
      let addr = address;
      let logoURL = `https://raw.githubusercontent.com/rsksmart/rsk-contract-metadata/refs/heads/master/images/${token.logo}`;
      if (token.symbol === 'WRBTC') {
        addr = '0x542fDA317318eBF1d3DEAf76E0b632741A7e677d';
      }

      if (token.symbol === 'stRIF') {
        logoURL = `https://raw.githubusercontent.com/rsksmart/rsk-contract-metadata/refs/heads/master/images/rif.png`;
      }

      tokensList.push({
        "name": token.name,
        "decimals": 18,
        "symbol": token.symbol,
        "address": addr,
        "chainId": 30,
        "logoURI": logoURL,
        "tags": []
      })
    }

    output.timestamp = datetime;
    output.tokens = tokensList;


    fs.writeFile('tokens-list.json', JSON.stringify(output, null, 2), () => {
      console.log('successfully generated tokens-list.json');
      fs.writeFile('tokenlist.json', JSON.stringify({
        "name": "Rootstock Token List",
        "timestamp": datetime,
        "version": v,
        "keywords": [
          "audited",
          "verified",
          "mainnet",
          "rootstock"
        ],
        "tokens": tokensList
      }, null, 2), () => {
        console.log('successfully generated tokenlist.json');
        resolve();
      });
    });
  });
}

generate()
  .then(console.log("Generated tokens-list.json file. ✅"))
  .catch(console.error)
