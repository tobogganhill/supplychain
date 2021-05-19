# Supply Chain & Data Auditing

This repository containts an Ethereum DApp demonstrating a Supply Chain flow
between a Seller and a Buyer. A Seller can add items to the inventory system stored
on the blockchain. A Buyer can purchase these items from the inventory system.
Additionally, a Seller can mark an item as Shipped, and a Buyer can
mark an item as Received.

The DApp User Interface when running should look like the following:

![truffle test](images/ftc_product_overview.png)

![truffle test](images/ftc_farm_details.png)

![truffle test](images/ftc_product_details.png)

![truffle test](images/ftc_transaction_history.png)

## Getting Started

These instructions will get a copy of the project up and running on your local
machine for development and testing purposes. See deployment for notes on how to
deploy the project on a live system.

### Prerequisites

Install ganache-cli, Truffle and enable the MetaMask extension in your browser.

### Versions

Truffle v5.1.62
Node v15.12.0

### Installing

Clone this repository:

```
git clone https://github.com/udacity/nd1309/tree/master/course-5/project-6
git clone https://github.com/tobogganhill/supplychain
```

Change directory to `project-6` folder and install all requisite npm packages
(as listed in `package.json`):

```
cd project-6
npm install
```

Launch Ganache:

```
ganache-cli -m "spirit supply whale amount human item harsh scare congress discover talent hamster"
```

Your terminal will look something like the following:

![truffle test](images/ganache-cli.png)

In a separate terminal window, Compile smart contracts:

```
truffle compile
```

Your terminal should look something like this:

![truffle test](images/truffle_compile.png)

This will create the smart contract artifacts in folder `build\contracts`.

Migrate smart contracts to the locally running blockchain, ganache-cli:

```
truffle migrate
```

Your terminal should look something like this:

![truffle test](images/truffle_migrate.png)

Test smart contracts:

```
truffle test
```

All 10 tests must pass.

![truffle test](images/truffle_test.png)

In a separate terminal window, launch the DApp:

```
npm run dev
```

## Built With

- [Ethereum](https://www.ethereum.org/)
- [IPFS](https://ipfs.io/)
- [Truffle Framework](http://truffleframework.com/)
