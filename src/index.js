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
    "timestamp": "",
    "version": {
      "major": 0,
      "minor": 1,
      "patch": 0
    }
  }

  for (const address in rawTokens) {
    const token = rawTokens[address];
    tokensList.push({
      "name": token.name,
      "decimals": 18,
      "symbol": token.symbol,
      "address": address,
      "chainId": 30,
      "logoURI": `https://raw.githubusercontent.com/rsksmart/rsk-contract-metadata/refs/heads/master/images/${token.logo}`,
      "tags": []
    })
  }

  output.timestamp = new Date().toISOString();
  output.tokens = tokensList;


  fs.writeFile('tokens-list.json', JSON.stringify(output, null, 2), () => {
    console.log('successfully generated tokens-list.json');
  });
}

generate()
  .then(console.log("Generated tokens-list.json file. ✅"))
  .catch(console.error)
