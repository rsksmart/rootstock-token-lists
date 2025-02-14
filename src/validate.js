
import { schema } from '@uniswap/token-lists';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import ROOTSTOCK_LIST from '../tokens-list.json' with { type: "json" };

async function validate() {
  const ajv = new Ajv({ allErrors: true, verbose: true })
  addFormats(ajv)
  const validator = ajv.compile(schema);
  const valid = validator(ROOTSTOCK_LIST)
  if (valid) {
    return valid
  }
  if (validator.errors) {
    throw validator.errors.map(error => {
      delete error.data
      return error
    })
  }
}

validate()
  .then(console.log("List is valid. ✅"))
  .catch(console.error)
