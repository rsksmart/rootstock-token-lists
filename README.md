## Rootstock tokens list

This project generates Rootstock tokens list according to `Uniswap` token specification standard. 
Uniswap token specification: https://github.com/Uniswap/token-lists 

## Why

Purpose of this project is to link rootstock tokens to uniswap at: https://tokenlists.org/ 

## Generating and updating tokens list 

Run following command to generate / update `tokens-list.json` file.

```bash
npm run generate
```

- The script `src/index.js` uses tokens defined in https://github.com/rsksmart/rsk-contract-metadata to generate `tokens-list.json` file according to Uniswap specification defined in https://github.com/Uniswap/token-lists 

- The script `src/validate.js` validates the generated token list schema. Both commands are part of `npm run generate`.

## Uniswap Tokens list

https://github.com/Uniswap/token-lists

## Deployment

The generated tokens list file: `tokens-list.json` will be served via github pages using a custom domain. 

Exmaple domain: https://tokens.rootstock.io // Note: This is not live and yet to be discussed with devops.

## How to add tokens to Uniswap list

https://github.com/Uniswap/token-lists

## tokenlist.org source code

https://github.com/Uniswap/tokenlists-org 
