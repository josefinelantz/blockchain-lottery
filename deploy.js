require('dotenv').config();
const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const { interface, bytecode } = require("./compile");
const mnemonicPhrase = process.env.MNEMONIC;

let provider = new HDWalletProvider({
  mnemonic: {
    phrase: mnemonicPhrase
  },
  providerOrUrl: process.env.HTTP_URL
});


const web3 = new Web3(provider);

const deploy = async () => {
	const accounts = await web3.eth.getAccounts();
	console.log("Attempting to deploy from account", accounts[0]);

	const result = await new web3.eth.Contract(interface)
		.deploy({ data: bytecode
		})
		.send({ gas: "1000000", from: accounts[0] });
	
	console.log("Contract deployed to", result.options.address);
};
deploy();
