#!/bin/bash

function getMakerAddresses() {
    # local resp=$(curl -s http://localhost:3002/global)
    local resp=$(curl -s http://iris_dashboard.orbiter.finance:3002/global)

    local value=$(echo "${resp}" | awk -F"[,:}]" '{for(i=1;i<=NF;i++){if($i~/'makerAddresses'\042/){print $(i+1)}}}' | tr -d '"' | sed -n 2p)

    echo $value
}

getMakerAddresses
