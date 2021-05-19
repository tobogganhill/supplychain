# Supply Chain & Data Auditing

This repository containts an Ethereum DApp demonstrating a Supply Chain flow
between a Seller and a Buyer. A Seller can add items to the inventory system
stored on the blockchain. A Buyer can purchase these items from the inventory
system. Additionally, a Seller can mark an item as Shipped, and a Buyer can mark
an item as Received.

### UML Diagrams

Diagrams can be found in the diagrams folder.

### Backend Libraries

Chai Expect - assert correct properties returned from the fetchItemBuffer
function.  
Truffle Assert - assertions for the emitted events.

### Versions

Truffle v5.1.62
Node v15.12.0  
web3 ^1.2.9  
solidity 0.5.16

### Contract address

https://rinkeby.etherscan.io/address/0x962C5Af10801b1dBdA35D192eefF38D8B2a0DfbE

## Getting Started

These instructions will get a copy of the project up and running on your local
machine for development and testing purposes. See deployment for notes on how to
deploy the project on a live system.

### Prerequisites

Install ganache-cli, Truffle and enable the MetaMask extension in your browser.

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
- [Truffle Framework](http://truffleframework.com/)
