#!/bin/bash

cd `dirname $0`

cat $ZKSYNC_HOME/contracts/artifacts/cache/solpp-generated-contracts/interfaces/IZkSync.sol/IZkSync.json | jq '{ abi: .abi}' > ZkSync.json
cat $ZKSYNC_HOME/contracts/artifacts/cache/solpp-generated-contracts/interfaces/IERC20.sol/IERC20.json | jq '{ abi: .abi}' > IERC20.json
