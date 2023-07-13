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
        "inputs": [{
            "internalType": "address payable",
            "name": "recipient",
            "type": "address"
        }, { "internalType": "address", "name": "token", "type": "address" }, {
            "internalType": "uint256",
            "name": "value",
            "type": "uint256"
        }, { "internalType": "bytes", "name": "data", "type": "bytes" }],
        "name": "swap",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    }, {
        "inputs": [{
            "internalType": "address payable",
            "name": "recipient",
            "type": "address"
        }, { "internalType": "address", "name": "token", "type": "address" }, {
            "internalType": "uint256",
            "name": "value",
            "type": "uint256"
        }, { "internalType": "bytes", "name": "data", "type": "bytes" }],
        "name": "swapAnswer",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
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

const Orbiter_V3_ABI = [{
    "anonymous": false,
    "inputs": [{ "indexed": true, "internalType": "address", "name": "to", "type": "address" }, {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
    }],
    "name": "Transfer",
    "type": "event"
}, {
    "inputs": [{ "internalType": "address", "name": "to", "type": "address" }, {
        "internalType": "bytes",
        "name": "data",
        "type": "bytes"
    }], "name": "transfer", "outputs": [], "stateMutability": "payable", "type": "function"
}, {
    "inputs": [{ "internalType": "contract IERC20", "name": "token", "type": "address" }, {
        "internalType": "address",
        "name": "to",
        "type": "address"
    }, { "internalType": "uint256", "name": "value", "type": "uint256" }, {
        "internalType": "bytes",
        "name": "data",
        "type": "bytes"
    }], "name": "transferToken", "outputs": [], "stateMutability": "payable", "type": "function"
}, {
    "inputs": [{
        "internalType": "contract IERC20",
        "name": "token",
        "type": "address"
    }, { "internalType": "address[]", "name": "tos", "type": "address[]" }, {
        "internalType": "uint256[]",
        "name": "values",
        "type": "uint256[]"
    }], "name": "transferTokens", "outputs": [], "stateMutability": "payable", "type": "function"
}, {
    "inputs": [
        { "internalType": "address[]", "name": "tos", "type": "address[]" }, {
        "internalType": "uint256[]",
        "name": "values",
        "type": "uint256[]"
    }], "name": "transfers", "outputs": [], "stateMutability": "payable", "type": "function"
}];

export { XVM_ABI, Orbiter_V3_ABI };