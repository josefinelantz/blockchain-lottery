const path = require("path");
const solc = require("solc");
const fileSystem = require("fs");

// Path to contract to compile
const lotteryPath = path.resolve(__dirname, "contracts", "Lottery.sol");

// Read contract from path
const source = fileSystem.readFileSync(lotteryPath, "utf8");

// Configure settings for compilation
var input = {
  language: "Solidity",
	sources: {
    "Lottery.sol": {
      content: source 
			}
    },
  	settings: { 
      outputSelection: {
        "*": {
          "*": [ "*" ]
        }
      }
    }
	};

	// Compile contract and store in output
	const output = JSON.parse(solc.compile(JSON.stringify(input)));

	// Store contract abi and bytecode
	const interface = output.contracts["Lottery.sol"].Lottery.abi;
	const bytecode = output.contracts["Lottery.sol"].Lottery.evm.bytecode.object;

	module.exports = {
		interface,
		bytecode
	};




