# **IC-Vault SDK**

Use this SDK to interact with ic-vault.

IC-Vault is a **blockchain based decentralized password & secret manager**. IC-Vault uses [Internet Computer Protocol](https://dfinity.org/) as platform to host and store user passwords & project secrets over blockchain.

#### Project status & support

- Status: **in active development**

**_NOTE!_** _IC-VAULT and IC-VAULT-SDK is **alpha-stage** software. It means IC-Vault hasn't been security audited and programming APIs and data formats can still change. We encourage you to reach out to the maintainers, if you plan to use IC-Vault in mission critical systems._

**Installation:**

```
yarn add @icvault/sdk-js
```

or

```
npm install @icvault/sdk-js
```

**Basic Usage:**

```js
import Vault from "@icvault/sdk-js";
const icVaultInstance = new Vault();
//use async function for this:
await icVaultInstance.initIdentity("----Private-key----");

icVaultInstance.getVaultListRequest(); //to fetch all vault list owned by user.
```

## Example:

```js
import Vault from "@icvault/sdk-js";

const identity = "---Private key here ----";

const icVaultInstance = new Vault();

const main = async () => {
  await icVaultInstance.initIdentity(identity);
  const vaultList = await icVaultInstance.getVaultListRequest();
  console.log(vaultList); //logs list of vaults
};

main();
```
