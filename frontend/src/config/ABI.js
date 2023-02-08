const XVM_ABI = [
    {
        "inputs": [{ "internalType": "address", "name": "maker", "type": "address" }],
        "stateMutability": "nonpayable",
        "type": "constructor"
    }, {
        "anonymous": false,
        "inputs": [{ "indexed": true, "internalType": "address", "name": "maker", "type": "address" }, {
            "indexed": true,
            "internalType": "bool",
            "name": "enable",
            "type": "bool"
        }],
        "name": "ChangeMaker",
        "type": "event"
    }, {
        "anonymous": false,
        "inputs": [{
            "indexed": true,
            "internalType": "address",
            "name": "previousOwner",
            "type": "address"
        }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" }],
        "name": "OwnershipTransferred",
        "type": "event"
    }, {
        "anonymous": false,
        "inputs": [{ "indexed": true, "internalType": "address", "name": "maker", "type": "address" }, {
            "indexed": true,
            "internalType": "address",
            "name": "token",
            "type": "address"
        }],
        "name": "Swap",
        "type": "event"
    }, {
        "anonymous": false,
        "inputs": [{ "indexed": true, "internalType": "uint256", "name": "op", "type": "uint256" }, {
            "indexed": true,
            "internalType": "address",
            "name": "operator",
            "type": "address"
        }, { "indexed": true, "internalType": "address", "name": "recipient", "type": "address" }, {
            "indexed": false,
            "internalType": "bytes32",
            "name": "tradeId",
            "type": "bytes32"
        }],
        "name": "SwapAnswer",
        "type": "event"
    }, {
        "inputs": [{ "internalType": "address", "name": "maker", "type": "address" }, {
            "internalType": "bool",
            "name": "enable",
            "type": "bool"
        }], "name": "changeMaker", "outputs": [], "stateMutability": "nonpayable", "type": "function"
    }, {
        "inputs": [{ "internalType": "address", "name": "", "type": "address" }],
        "name": "getMaker",
        "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [{ "internalType": "bytes[]", "name": "data", "type": "bytes[]" }],
        "name": "multicall",
        "outputs": [{ "internalType": "bytes[]", "name": "results", "type": "bytes[]" }],
        "stateMutability": "payable",
        "type": "function"
    }, {
        "inputs": [],
        "name": "owner",
        "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [],
        "name": "renounceOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "inputs": [{ "internalType": "address payable", "name": "maker", "type": "address" }, {
            "internalType": "address",
            "name": "token",
            "type": "address"
        }, { "internalType": "uint256", "name": "value", "type": "uint256" }, {
            "internalType": "bytes",
            "name": "data",
            "type": "bytes"
        }], "name": "swap", "outputs": [], "stateMutability": "payable", "type": "function"
    }, {
        "inputs": [{
            "internalType": "bytes32",
            "name": "tradeId",
            "type": "bytes32"
        }, {
            "internalType": "address payable",
            "name": "to",
            "type": "address"
        }, {
            "internalType": "address",
            "name": "token",
            "type": "address"
        }, { "internalType": "uint256",
            "name": "op",
            "type": "uint256"
        }, {
            "internalType": "uint256",
            "name": "value",
            "type": "uint256"
        }], "name": "swapAnswer", "outputs": [], "stateMutability": "payable", "type": "function"
    }, {
        "inputs": [{ "internalType": "address", "name": "newOwner", "type": "address" }],
        "name": "transferOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "inputs": [{ "internalType": "address", "name": "token", "type": "address" }],
        "name": "withdraw",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }, { "stateMutability": "payable", "type": "receive" }];

export { XVM_ABI };
