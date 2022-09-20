<template>
    <div class="MakerNode">
        <div class="create_box" v-loading="loading">
            <div class="create_title" v-if="!isMaker">
                <h1 v-if="pageStatus == 1">Create a New Orbiter Market Maker Node</h1>
                <!-- <img src="../../assets/img/x.png" alt=""> -->
                <!-- <svg-icon :iconName="'close'" style="width: 20px; height: 20px"></svg-icon> -->
            </div>
            <div class="token_box">
                <span>Token</span>
                <TokenSelect @setTokenItem="setTokenItem"></TokenSelect>
            </div>
            <div class="network_box clearfix">
                <span class="fl">Network</span>
                <div class="network_list fr">
                    <el-row :gutter="20">
                        <el-col :span="6" v-for="(item, i) in networkList" :key="i">
                            <div class="network_item">
                                <el-checkbox size="large" @click="chooseNetwork($event, item)"/>
                                <svg-icon :iconName="showChainIcon(item.chainid)" style="width: 20px; height: 20px"></svg-icon>
                                <span>{{item.name}}</span>
                            </div>
                        </el-col>
                    </el-row>
                </div>
            </div>
            <div class="from_title">
                <span>Set Withholding Fee, Trading Fee and Trasaction Limit for each transaction pair.</span>
            </div>
            <div class="form_box">
                <SetTable ref="setTable" :tableList="tableList" @setTabList="setTabList" @setIsValidate="setIsValidate"></SetTable>
            </div>
            <div class="margin_box">
                <div class="margin_test">
                    <span style="font-weight: bold;font-size: 16px" v-if="pageStatus === 1">The Margin amount you need to deposit in Orbiter Contract:</span>
                    <span style="font-weight: bold;font-size: 16px" v-if="pageStatus === 2">The new Margin amount you need to deposit in Orbiter Contract is <span style="color: #DF2E2D">{{ethTotal}} ETH</span>, you need to <span style="color: #DF2E2D">add</span> Margin:</span>
                    <span style="font-weight: bold;font-size: 16px" v-if="pageStatus === 3">The new Margin amount you need to deposit in Orbiter Contract is <span style="color: #DF2E2D">{{ethTotal}} ETH</span>, you need to <span style="color: #DF2E2D">reduce</span> Margin:</span>
                </div>
                <div class="margin_input clearfix">
                    <el-input class="fl" v-model="payEth" placeholder="" readonly/>
                    <span class="fl uint">ETH</span>
                </div>
            </div>
            <div class="margin_detail">
                <div class="details_item">
                    <svg-icon :iconName="'sigh-b'" style="width: 16px; height: 16px"></svg-icon>
                    <span>The Margin is used to send back to the user, when you do not response correctly in time.</span>
                </div>
                <div class="details_item">
                    <svg-icon :iconName="'sigh-b'" style="width: 16px; height: 16px"></svg-icon>
                    <span>You can adjust the Margin amount by modifying the <span style="font-weight: bold;">Limit</span> of every transaction pair. </span>
                </div>
                <div class="details_item">
                    <svg-icon :iconName="'sigh-b'" style="width: 16px; height: 16px"></svg-icon>
                    <span>You can get back the Margin immediately, when you shut down and remove the node.</span>
                </div>
                <div class="details_title">
                    <h3>Recommend liquidity:  110 ~ 180ETH</h3>
                </div>
                <div class="details_item">
                    <svg-icon :iconName="'sigh-b'" style="width: 16px; height: 16px"></svg-icon>
                    <span>In oder to response to the users in time, you’d better <span style="font-weight: bold;">keep 110 ~180 ETH in the Node Account (0x1234…1234)</span> as liquidity. </span>
                </div>
                <div class="details_item">
                    <svg-icon :iconName="'sigh-b'" style="width: 16px; height: 16px"></svg-icon>
                    <span>The liquidity does not need to deposit in Orbiter’s contract, it only need keep in your own EOA address.</span>
                </div>
            </div>
            <div class="agree_box">
                <el-checkbox size="large" @change="agreeClick"/>
                <span>I have read the document and already know the risk.</span>
            </div>
            <div class="margin_btnbox">
                <div class="margin_btn" @click="createMaker" v-if="pageStatus === 1">
                    <span>Deposit {{payEth}} ETH Margin and Go to Next Step</span>
                </div>
                <div class="margin_btn" v-if="pageStatus === 2">
                    <span>Confirm and Add {{payEth}} ETH Margin</span>
                </div>
                <div class="margin_btn" v-if="pageStatus === 3">
                    <span>Confirm and Reduce {{payEth}} ETH Margin</span>
                </div>
            </div>
        </div>
    </div>
</template>


<script lang="ts">
import { ref, reactive, nextTick } from 'vue';
import TokenSelect from './TokenSelect.vue'
import SetTable from './SetTable.vue'
import { chain2icon, makerToken, chainName } from '../../utils/chain2id';
import { useQuery } from '@urql/vue';
import { contract_obj, contractMethod, contract_addr } from '../../contracts'
import { ElNotification, ElLoading } from 'element-plus'
import { mapState } from 'vuex' 
import store from '../../store';
 
export default {
    components: { TokenSelect, SetTable },
    inject: ['reload'],
    setup() {
        const ethTotal = ref(0)
        const pageStatus = ref(1)
        const payEth = ref(0)
        const tokenItem = ref(1)
        const networkList = reactive([])
        const checkNetwork = reactive([])
        const pairsData = reactive([])
        const tableList = reactive([])
        const isValidate = ref(false)
        const setTable = ref(null)
        const loading = ref(true)
        const contract_ORMakerDeposit = ref(null)
        const contract_ORProtocalV1 = ref(null)
        return {
            isCreate: true,
            pageStatus,
            ethTotal,
            payEth,
            agree: false,
            tokenItem,
            networkList,
            checkNetwork,
            pairsData,
            tableList,
            isValidate,
            setTable,
            loading,
            contract_ORMakerDeposit,
            contract_ORProtocalV1
        }
    },
    async mounted() {
        this.getNetwrokList(this.tokenItem)
        await this.getMaker()
        this.loading = false
    },
    computed: {
        ...mapState(['account', 'isMaker'])
    },
    methods: {
        showChainIcon(localChainID) {
            return chain2icon(Number(localChainID))
        },
        agreeClick(value) {
            this.agree = value
        },
        setTokenItem(val) {
            this.tokenItem = val
        },
        setTabList(val) {
            this.tableList = val
        },
        setIsValidate(val) {
            this.isValidate = val
        },
        async getMakerInfo() {
            
        },
        async getMaker() {
            let contract_factory = await contract_obj('ORMakerV1Factory')
            let makerAddr = await contract_factory.methods.getMaker(this.account).call()
            if (makerAddr === '0x0000000000000000000000000000000000000000') {
                nextTick(() => {
                    store.commit('setMaker', false)
                    this.pageStatus = 1
                })
            } else {
                nextTick(() => {
                    store.commit('setMaker', true)
                    this.pageStatus = 2
                })
                this.contract_ORMakerDeposit = await contract_obj('ORMakerDeposit', makerAddr)
            }
        },
        async getNetwrokList(tokenid) {
            const result = await useQuery({
                query: `
                query MyQuery {
                    chainEntity(id: "${tokenid}") {
                        batchLimit
                        id
                    }
                    pairEntities {
                        sourceChain
                        destChain
                        destToken
                        sourceToken
                        ebcId
                    }
                }
                `
            });
            const data = result.data.value.pairEntities
            this.pairsData = data
            console.log("this.pairsData ==>", this.pairsData)
            let tokenType = makerToken.filter(v => v.chainid == tokenid)
            let pairs = data.filter(v => v.sourceToken == tokenType[0].address)
            pairs.map(v => {
                if (this.networkList.filter((val) => val.chainid == v.sourceChain).length == 0) {
                    this.networkList.push({chainid: v.sourceChain, name: chainName(v.sourceChain), address: v.sourceToken, ebcId: v.ebcId})
                }
            })
        },
        async chooseNetwork(e, item) {
            if (e.target.tagName !== 'INPUT') return
            let contract_manager = await contract_obj('ORManager')
            if (!this.checkNetwork.includes(item)) {
                this.checkNetwork.push(item)
                await Promise.all(this.pairsData.map(async v => {
                    if (v.sourceChain == item.chainid) {
                        let stake_token = await contract_manager.methods.tokenInfos(v.sourceChain, v.sourceToken).call()
                        let tokenType = makerToken.filter(v => v.chainid == this.tokenItem)
                        if (tokenType[0].address == stake_token.mainTokenAddress) {
                            this.tableList.push({
                                from: chainName(v.sourceChain),
                                fromChainid: v.sourceChain,
                                to: chainName(v.destChain),
                                toChainid: v.destChain,
                                limit: '',
                                withholdingFee: '',
                                tradingFee: ''
                            })
                        }
                    }
                }))
            } else {
                this.checkNetwork.splice(this.checkNetwork.indexOf(item),1)
                let modeArr = this.tableList.map(v => v);
                modeArr.forEach((v) => {
                    if (v.fromChainid == item.chainid) {
                        this.tableList.splice(this.tableList.indexOf(v), 1)
                    }
                })
            }

            this.payPrice()
        },
        async payPrice() {
            let contract_manager = await contract_obj('ORManager')
            let needStake = 0
            await Promise.all(this.checkNetwork.map(async (v) => {
                let ebcAddr = await contract_manager.methods.getEBC(v.ebcId).call()
                let contract_ORProtocalV1 = await contract_obj('ORProtocalV1', ebcAddr)
                let needPay = await contract_ORProtocalV1.methods.getDepositAmount().call()
                if (needPay >= needStake) {
                    needStake = needPay
                }
            }))
            nextTick(() => {
                this.payEth = needStake
            })
        },
        async createMaker() {
            if (!this.agree) return ElNotification({
                title: 'Error',
                message: `No consent agreement`,
                type: 'error',
            })
            if (this.tableList.length == 0) return ElNotification({
                title: 'Error',
                message: `Please select network`,
                type: 'error',
            })
            this.setTable.handleSubmit()
            if (this.isValidate) {
                console.log("pass", this.tableList, this.account)
                let data = {
                    name: 'createMaker',
                    inputs: [],
                    arguments: []
                }
                const loading = ElLoading.service({
                    lock: true,
                    text: 'Loading',
                })
                let res: any = await contractMethod(this.account, contract_addr['ORMakerV1Factory'].addr, data).catch(err => {
                    loading.close()
                    ElNotification({
                        title: 'Error',
                        message: `Failed transactions: ${err.message}`,
                        type: 'error',
                    })
                })
                console.log("res ==>", res)
                loading.close()
                if (res.code === 200) {
                    ElNotification({
                        title: 'Success',
                        message: `Create maker successfully`,
                        type: 'success',
                    })
                }
            } else {
                ElNotification({
                    title: 'Error',
                    message: `Failure of calibration`,
                    type: 'error',
                })
            }
        }
    }
}


</script>

<style lang="scss" scoped>
.MakerNode {
    color: #333333;
    width: 1000px;
    padding: 25px 40px 55px 40px;
    background: #ffffff;
    border-radius: 20px;
    margin: auto;
    font-family: 'Inter';
    .create_box {
        .create_title {
            margin-bottom: 40px;
            display: flex;
            align-items: center;
            h1 { 
                font-size: 20px;
                margin: 0;
            }
            svg {
                cursor: pointer;
                margin-left: auto;
                height: 24px;
            }
        }
        .token_box, .network_box {
            span {
                display: inline-block;
                width: 80px;
                font-weight: bolder;
                font-size: 16px;
            }
        }
        .network_box {
            margin-top: 25px;
            .network_list {
                width: calc(100% - 80px);
                .el-col {
                    margin-bottom: 25px;
                    padding-right: 0;
                    
                    .network_item {
                        height: 22px;
                        display: flex;
                        align-items: center;
                                               
                        svg {
                            margin-left: 5px;
                        }
                        span {
                            display: inline-block;
                            margin-left: 5px;
                            white-space:nowrap;
                        }
                    }
                }
            }
        }
        .from_title {
            margin: 33px 0 25px;
            span {
                font-size: 16px;
                font-weight: bold;
            }
        }
        .form_box {
            width: 100%;
            border-radius: 20px;
            background-color: rgba(245, 245, 245, 0.6);
            padding: 20px 20px 30px;
            box-sizing: border-box;
            margin-bottom: 35px;
        }
        .margin_box {
            margin-bottom: 25px;
            .margin_test {
                width: 100%;
                margin-bottom: 25px;
                span {
                    font-weight: bold;
                    font-size: 16px;
                }
            }
            .margin_input {
                width: 150px;
                display: flex;
                align-items: center;
                margin: 0 auto;
                :deep(.el-input__inner) {
                    background-color: transparent;
                    border: none;
                    border-bottom: 1px solid #333;
                    border-radius: 0;
                    height: 30px;
                    font-size: 20px;
                    color: #DF2E2D;
                    width: 100%;
                    text-align: center;
                    font-weight: bold;
                }
                .uint {
                    margin-left: 10px;
                    font-weight: bolder;
                }
            }
        }
        .margin_detail {
            width: 100%;
            margin-bottom: 40px;
            .details_item {
                display: flex;
                align-items: center;
                margin-bottom: 8px;
                >span {
                    font-size: 12px;
                    color: rgba(51, 51, 51, 0.8);
                    margin-left: 15px;
                }
            }
            .details_title {
                margin: 35px 0 12px ;
                h3{
                    margin: 0;
                    font-size: 16px;
                }
            }
            & .details_item:last-child {
                margin: 0;
            }
        }
        .agree_box {
            display: flex;
            align-items: center;
            justify-content: center;
            span {
                margin-left: 18px;
            }
        }
        .margin_btnbox {
            width: 100%;
            margin-top: 25px;
            .margin_btn {
                margin: auto;
                width: 490px;
                height: 50px;
                border-radius: 40px;
                background: linear-gradient(90.46deg, #EB382D 4.07%, #BC3035 98.55%);
                box-shadow: inset 0px -8px 0px rgba(0, 0, 0, 0.16);
                text-align: center;
                line-height: 50px;
                font-weight: bold;
                color: #ffffff;
                cursor: pointer;
                &:hover {
                    background: #BC3035;
                    box-shadow: inset 0px -6px 0px rgba(0, 0, 0, 0.16);
                }
            }
        }
    }
}

</style>
<style lang="scss">
.el-checkbox__inner {
    border-radius: 4px ;
    border-color: #333333;
}
.el-checkbox__input.is-checked .el-checkbox__inner {
    background-color: transparent;
    border-color: #333333;
}
.el-checkbox__inner:hover {
    border-color: #DF2E2D;
}
.el-checkbox__input.is-focus .el-checkbox__inner {
    border-color: #333333;
}
.el-checkbox__inner::after {
    border-color: #333333;
}
</style>