<template>
    <div class="metamask">
        <div class="metamask-var">
            <span>to：</span>
            <el-input v-model="address" style="width:500px" placeholder="Please input address" />
        </div>
        <div class="metamask-var">
            <span>value：</span>
            <el-input v-model="amount" type="number" style="width:500px" placeholder="ETH" />
        </div>
        <el-button type="primary" @click="sendEther">transaction by metamask</el-button>
    </div>
</template>

<script lang="ts" setup>
import Web3 from 'web3';
import { ElMessage } from 'element-plus'
import { ref } from 'vue'
let provider: any;
if (window.ethereum || window.web3) {
    try {
        provider = window.ethereum || window.web3.currentProvider
        window.ethereum.enable()
    } catch (error) {
        alert("用户取消授权")
    }

} else {
    alert("请安装metamask")
}
const web3 = new Web3(provider);
const [account] = await web3.eth.getAccounts()
const address = ref("")
const amount = ref(0)
async function sendEther() {
    if (address.value.length != 42) {
        alert("address error")
    }
    if (!amount.value || amount.value === 0) {
        alert("value cant not be zero")
    }
    const tx = await web3.eth.sendTransaction({
        from: account,
        to: address.value,
        value: amount.value * 1000000000000000000
    })
    address.value = ""
    amount.value = 0
    ElMessage({
        message: 'submit success!',
        type: 'success',
        center: true
    })
    console.log(tx)
}
</script>

<style lang="scss">
.metamask {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.metamask-var {
    margin: 20px 0;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 600px;
}
</style>
