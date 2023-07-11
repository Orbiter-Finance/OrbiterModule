export const Orbiter_Router_ABI = [
    {
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
        "inputs": [{ "internalType": "address[]", "name": "tos", "type": "address[]" }, {
            "internalType": "uint256[]",
            "name": "values",
            "type": "uint256[]"
        }], "name": "transfers", "outputs": [], "stateMutability": "payable", "type": "function"
    }];