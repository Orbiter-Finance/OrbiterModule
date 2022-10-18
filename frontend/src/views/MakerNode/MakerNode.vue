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
                                <el-checkbox size="large" v-model="item.isCheck" @click="chooseNetwork($event, item, i)"/>
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
                <SetTable ref="setTable" :tableList="tableList" @setMultipleSelection="setMultipleSelection" @setTabList="setTabList" @setIsValidate="setIsValidate" @stopLp="stopLp" @pauseLp="pauseLp"></SetTable>
            </div>
            <div class="margin_box">
                <div class="margin_test">
                    <span style="font-weight: bold;font-size: 16px" v-if="pageStatus === 1">The Margin amount you need to deposit in Orbiter Contract:</span>
                    <span style="font-weight: bold;font-size: 16px" v-if="pageStatus === 2">The new Margin amount you need to deposit in Orbiter Contract is <span style="color: #DF2E2D">{{ethTotal}} ETH</span>, you need to <span style="color: #DF2E2D">add</span> Margin:</span>
                    <span style="font-weight: bold;font-size: 16px" v-if="pageStatus === 3">The new Margin amount you need to deposit in Orbiter Contract is <span style="color: #DF2E2D">{{ethTotal}} ETH</span>, you need to <span style="color: #DF2E2D">reduce</span> Margin:</span>
                </div>
                <div class="margin_input clearfix">
                    <div class="margin_input_box">
                        <div class="price" v-if="pageStatus == 1"><span>{{payEth}}</span></div>
                        <div class="price" v-if="pageStatus == 2"><span>+</span><span>{{payEth}}</span></div>
                        <div class="price" v-if="pageStatus == 3"><span>-</span><span>{{payEth}}</span></div>
                        <!-- <el-input v-if="pageStatus == 1" class="fl" v-model="payEth" placeholder="" readonly /> -->
                        <span class="fl uint">ETH</span>
                    </div>
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
                    <span>In oder to response to the users in time, you’d better <span style="font-weight: bold;">keep 110 ~180 ETH in the Node Account {{`${showMakerAddr}`}}</span> as liquidity. </span>
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
                <div class="margin_btn" @click="createMaker" v-if="pageStatus === 2">
                    <span>Confirm and Add {{payEth}} ETH Margin</span>
                </div>
                <div class="margin_btn" @click="reduceStake" v-if="pageStatus === 3">
                    <span>Confirm and Reduce {{payEth}} ETH Margin</span>
                </div>
            </div>
        </div>
    </div>
</template>


<script lang="ts">
import { ref, reactive, nextTick } from 'vue'
import TokenSelect from './TokenSelect.vue'
import SetTable from './SetTable.vue'
import { chain2icon, makerToken, chainName } from '../../utils/chain2id'
import { useQuery } from '@urql/vue';
import { contract_obj, contractMethod, contract_addr, linkNetwork } from '../../contracts'
import { ElNotification, ElLoading } from 'element-plus'
import { mapState } from 'vuex' 
import store from '../../store'
import { MerkleTree } from 'merkletreejs'
import {Buffer} from 'buffer';
import { $env } from '@/env'
 
export default {
    components: { TokenSelect, SetTable },
    inject: ['reload'],
    setup() {
        const ethTotal = ref(0)
        const pageStatus = ref(1)
        const payEth = ref(0)
        const ethAmount = ref(0)
        const stakeAmount = ref(0)
        const tokenItem = ref(1)
        const tokenType = ref()
        const networkList = reactive([])
        const checkNetwork = reactive([])
        const pairsData = reactive([])
        const tableList = reactive([])
        const isValidate = ref(false)
        const setTable = ref(null)
        const loading = ref(true)
        const contract_ORMakerDeposit = ref(null)
        const contract_ORProtocalV1 = ref(null)
        const result = reactive({})
        const makerAddr = ref("")
        const multipleSelection = reactive([])
        return {
            result,
            isCreate: true,
            pageStatus,
            ethTotal,
            payEth,
            ethAmount,
            stakeAmount,
            agree: false,
            tokenItem,
            tokenType,
            makerAddr,
            networkList,
            checkNetwork,
            pairsData,
            tableList,
            isValidate,
            setTable,
            loading,
            contract_ORMakerDeposit,
            contract_ORProtocalV1,
            multipleSelection
        }
    },
    async mounted() {
        await this.getNetwrokList()
        await this.getMaker()
        this.getIdleAmount()
        this.loading = false
        this.tokenType = makerToken.find(item => item.chainid == this.tokenItem)
    },
    computed: {
        ...mapState(['account', 'isMaker', 'maker']),
        showMakerAddr() {
            if (this.isMaker) {
                let str1 = this.makerAddr.substr(0, 6)
                let str2 = this.makerAddr.substr(this.makerAddr.length - 4, 4)
                return `(${str1}...${str2})`
            } else {
                return ''
            }
        },
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
            this.tokenType = makerToken.find(item => item.chainid == val)
        },
        setMultipleSelection(val) {
            this.multipleSelection = val
        },
        async getIdleAmount() {
            if(!this.isMaker) return
            let tokenType = makerToken.filter(v => v.chainid == this.tokenItem)
            const ethAmount = await this.contract_ORMakerDeposit.methods.idleAmount(tokenType[0].address).call()
            this.ethAmount = this.$web3.utils.fromWei(ethAmount, 'ether')
            // let banl = await this.$web3.eth.getBalance(this.makerAddr)
            // console.log("getBalance ==>", this.$web3.utils.fromWei(banl, 'ether'))
            const stakeAmount = await this.contract_ORMakerDeposit.methods.usedDeposit(tokenType[0].address).call()
            this.stakeAmount = this.$web3.utils.fromWei(stakeAmount, 'ether')
            if (this.ethAmount > this.stakeAmount) {
                this.payEth = this.ethAmount
                this.pageStatus = 3
            }
            console.log("amount ==>", this.ethAmount, this.stakeAmount)
        },
        async setTabList(val) {
            // console.log("val", val)
            this.tableList = val
            this.setTable.toggleSelection(val)
            // console.log(this.tableList)
            let needStake = 0
            let contract_manager = await contract_obj('ORManager')
            // if (this.checkNetwork.length === 0) return
            
            await Promise.all(this.checkNetwork.map(async (v) => {
                let ebcAddr = await contract_manager.methods.getEBC(v.ebcId).call()
                this.contract_ORProtocalV1 = await contract_obj('ORProtocalV1', ebcAddr)
            }))
            await Promise.all(this.tableList.map(async (v) => {
                if (v.maxPrice !== '' && v.status == 0) {
                    let chainEntitie = this.result.chainEntities.filter(item => item.id == v.sourceChain)
                    console.log('tokentype ==>', chainEntitie[0].batchLimit, this.$web3.utils.toWei(v.maxPrice + '', 'ether'))
                    const needPay = await this.contract_ORProtocalV1.methods.getDepositAmount(chainEntitie[0].batchLimit, this.$web3.utils.toWei(v.maxPrice + '', 'ether')).call()
                    if (this.$web3.utils.fromWei(needPay + '', 'ether') >= needStake) {
                        needStake = this.$web3.utils.fromWei(needPay + '', 'ether')
                    }
                }
            }))
            // this.ethTotal = needStake
            console.log('needStake ==>', needStake, this.ethAmount)
            if (this.isMaker) {
                if (Number(needStake) >= Number(this.ethAmount)) {
                    nextTick(() => {
                        this.pageStatus = 2
                        this.payEth = needStake - this.ethAmount
                        this.ethTotal = this.payEth
                    })
                } else {
                    nextTick(() => {
                        this.pageStatus = 3
                        this.payEth = this.ethAmount - needStake
                    })
                }
            } else {
                this.ethTotal = needStake
                this.payEth = this.ethTotal
            }
            console.log(this.ethTotal, this.ethAmount, needStake, this.payEth, this.stakeAmount)
        },
        setIsValidate(val) {
            this.isValidate = val
        },
        async getMakerInfo() {
            if (!this.result || this.result.makerEntities.length == 0) return
            let data = this.result.makerEntities[0]
            let actions = data.effectLpIds
            if (actions != null) {
                let lpList = actions.map(v => data.lps.filter(item => item.id === v))
                let timer = new Date().getTime() / 1000
                let contract_manager = await contract_obj('ORManager')
                lpList.map(async v => {
                    let ebcAddr = await contract_manager.methods.getEBC(v[0].pair.ebcId).call()
                    this.contract_ORProtocalV1 = await contract_obj('ORProtocalV1', ebcAddr)
                    const stopDealyTime = await this.contract_ORProtocalV1.methods.getStopDealyTime(v[0].pair.sourceChain).call()
                    const isStop = timer >= (Number(stopDealyTime) + Number(v[0].stopTime)) ? true : false
                    const isPause = v[0].status == 1 ? true : false
                    // console.log('xxxxx ==>', stopDealyTime, isStop, (Number(stopDealyTime) + Number(v[0].stopTime)))
                    this.tableList.push({
                        from: chainName(v[0].pair.sourceChain),
                        to: chainName(v[0].pair.destChain),
                        status: v[0].status,
                        isStop,
                        isPause,
                        isChoose: true,
                        sourceChain: v[0].pair.sourceChain,
                        destChain: v[0].pair.destChain,
                        sourceTAddress: v[0].pair.sourceToken,
                        destTAddress: v[0].pair.destToken,
                        ebcid: v[0].pair.ebcId,
                        sourcePresion: v[0].sourcePresion,
                        destPresion: v[0].destPresion,
                        minPrice: Number(v[0].minPrice),
                        numberMinPrice: Number(this.$web3.utils.fromWei(v[0].minPrice + '', 'ether')),
                        maxPrice: Number(this.$web3.utils.fromWei(v[0].maxPrice + '', 'ether')),
                        gasFee: Number(this.$web3.utils.fromWei(v[0].gasFee + '', 'ether')),
                        tradingFee: Number(this.$web3.utils.fromWei(v[0].tradingFee + '', 'ether')),
                        startTime: v[0].startTime,
                        stopTime: v[0].stopTime
                    })
                    this.networkList.map(item => {
                        if (item.chainid === v[0].pair.sourceChain && v[0].status == 1) {
                            item.isCheck = true
                            this.checkNetwork.push(item)
                        }
                    })
                    console.log(this.tableList)
                })
            }
        },
        async getMaker() {
            let contract_factory = await contract_obj('ORMakerV1Factory')
            this.makerAddr = await contract_factory.methods.getMaker(this.account).call()
            if (this.makerAddr === '0x0000000000000000000000000000000000000000') {
                nextTick(() => {
                    store.commit('setIsMaker', false)
                    this.pageStatus = 1
                })
            } else {
                nextTick(() => {
                    store.commit('setIsMaker', true)
                    this.pageStatus = 2
                })
                this.contract_ORMakerDeposit = await contract_obj('ORMakerDeposit', this.makerAddr)
                // let banlance = await this.$web3.eth.getBalance(this.makerAddr)
                // console.log("makerAddr balance ==>", this.$web3.utils.fromWei(banlance, 'ether'))
                this.getMakerInfo()
            }
        },
        async getNetwrokList(tokenid = 1) {
            console.log(this.maker)
            const result = await useQuery({
                query: `
                query MyQuery {
                    chainEntities {
                        id
                        batchLimit
                    }
                    pairEntities {
                        sourceChain
                        destChain
                        destToken
                        sourceToken
                        ebcId
                        id
                    }
                    makerEntities(where: {id: "${this.maker}"}) {
                        id
                        createdAt
                        deletedAt
                        owner
                        updatedAt
                        effectLpIds
                        lps {
                            createdAt
                            destPresion
                            gasFee
                            id
                            maxPrice
                            minPrice
                            sourcePresion
                            startTime
                            stopTime
                            tradingFee
                            status
                            pair {
                                sourceChain
                                destChain
                                sourceChain
                                destToken
                                ebcId
                                sourceToken
                            }
                        }
                    }
                }
                `
            });
            this.result = result.data.value
            console.log("this.result ==>", this.result)
            if (this.result) {
                const data = result.data.value.pairEntities
                this.pairsData = data
                let tokenType = makerToken.filter(v => v.chainid == tokenid)
                let pairs = data.filter(v => v.sourceToken == tokenType[0].address)
                pairs.map(v => {
                    if (this.networkList.filter((val) => val.chainid == v.sourceChain).length == 0) {
                        this.networkList.push({chainid: v.sourceChain, name: chainName(v.sourceChain), address: v.sourceToken, ebcId: v.ebcId, isCheck: false})
                    }
                })
                console.log("networkList ==>", this.networkList)
            }
        },
        async chooseNetwork(e, item, i) {
            if (e.target.tagName !== 'INPUT') return
            const loading = ElLoading.service({
                lock: true,
                text: 'Loading',
            })
            let contract_manager = await contract_obj('ORManager')
            if (!this.checkNetwork.includes(item)) {
                this.networkList[i].isCheck = true
                this.checkNetwork.push(item)
                try {
                    await Promise.all(this.pairsData.map(async v => {
                        if (v.sourceChain == item.chainid) {
                            let sourceChain_token = await contract_manager.methods.getTokenInfo(v.sourceChain, v.sourceToken).call()
                            let destChain_token = await contract_manager.methods.getTokenInfo(v.destChain, v.destToken).call()
                            let tokenType = makerToken.filter(item => item.address == v.sourceToken)
                            let minPrice = $env.defaultMinPrice[this.tokenItem][v.sourceChain]
                            if (tokenType[0] && sourceChain_token.chainID != 0 && destChain_token.chainID != 0 && tokenType[0].address == sourceChain_token.mainTokenAddress) {
                                let isPushArr = this.tableList.find((item) => item.sourceChain == v.sourceChain && item.destChain == v.destChain)
                                if (!isPushArr) {
                                    this.tableList.push({
                                        from: chainName(v.sourceChain),
                                        to: chainName(v.destChain),
                                        status: 0,
                                        isStop: false,
                                        isPause: false,
                                        isChoose: false,
                                        sourceChain: v.sourceChain,
                                        destChain: v.destChain,
                                        sourceTAddress: v.sourceToken,
                                        destTAddress: v.destToken,
                                        sourcePresion: sourceChain_token.tokenPresion,
                                        destPresion: destChain_token.tokenPresion,
                                        ebcid: v.ebcId,
                                        minPrice,
                                        numberMinPrice: Number(this.$web3.utils.fromWei(minPrice + '', 'ether')),
                                        maxPrice: 1,
                                        gasFee: 1,
                                        tradingFee: 1,
                                        startTime: 0,
                                    })
                                }
                            }
                        }
                    }))
                } catch (error) {
                    console.log(error)
                    loading.close()
                }
            } else {
                this.networkList[i].isCheck = false
                this.checkNetwork.splice(this.checkNetwork.indexOf(item),1)
                let modeArr = this.tableList.map(v => v);
                modeArr.forEach((v) => {
                    if (v.sourceChain == item.chainid && v.status == 0) {
                        this.tableList.splice(this.tableList.indexOf(v), 1)
                    }
                })
                if (this.ethAmount > this.stakeAmount) {
                    this.payEth = this.ethAmount
                    this.ethTotal = this.stakeAmount
                    this.pageStatus = 3
                } else {
                    this.payEth = this.ethAmount
                    this.ethTotal = this.stakeAmount
                    this.pageStatus = 2
                }
                console.log(this.ethAmount, this.stakeAmount, this.payEth, )
                
            }
            loading.close()
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
                console.log('ismaker ==>', this.isMaker)
                if (!this.isMaker) {
                    let data = {
                        name: 'createMaker',
                        contractName: 'ORMakerV1Factory',
                        contractAddr: contract_addr['ORMakerV1Factory'].addr,
                        arguments: []
                    }
                    const loading = ElLoading.service({
                        lock: true,
                        text: 'Loading',
                    })
                    let isCreate = false
                    console.log('createmaker ==>', data)
                    const isNetwork = await linkNetwork()
                    if (isNetwork) {
                        let res: any = await contractMethod(this.account, data).catch(err => {
                            if (err.message == "Returned error: execution reverted: Exists Maker") {
                                isCreate = true
                            } else {
                                isCreate = false
                                loading.close()
                                ElNotification({
                                    title: 'Error',
                                    message: `Failed transactions: ${err.message}`,
                                    type: 'error',
                                })
                            }
                        })
                        if (res && res.code === 200) {
                            isCreate = true
                            ElNotification({
                                title: 'Success',
                                message: `Create maker successfully`,
                                type: 'success',
                            })
                        }
                    } else {
                        loading.close()
                        return
                    }
                    loading.close()
                    if (!isCreate) return
                    await this.getMaker()
                    await this.addLp()
                } else {
                    this.addLp()
                }
            } else {
                ElNotification({
                    title: 'Error',
                    message: `Failure of calibration`,
                    type: 'error',
                })
            }
        },

        getPairID (pair): string {
            const lpId = this.$web3.utils.soliditySha3(
                {type: 'uint', value: pair.sourceChain},
                {type: 'uint', value: pair.destChain},
                {type: 'address', value: pair.sourceTAddress},
                {type: 'address', value: pair.destTAddress},
                {type: 'uint', value: pair.ebcid}
            )
            return lpId.replace('0x', '');
        },

        async reduceStake() {
            if (!this.agree) return ElNotification({
                title: 'Error',
                message: `No consent agreement`,
                type: 'error',
            })
            if (this.ethAmount == 0) return ElNotification({
                title: 'Error',
                message: `No idle funds`,
                type: 'error',
            })

            const loading = ElLoading.service({
                lock: true,
                text: 'Loading',
            })
            let tokenType = makerToken.filter(item => item.chainid == this.tokenItem)
            let data = {
                name: 'withDrawAssert',
                contractName: "ORMakerDeposit",
                contractAddr: this.makerAddr, 
                arguments: [this.$web3.utils.toWei(this.ethAmount + '', 'ether'), tokenType[0].address]
            }
            console.log('lp reduce data ==>', data, this.account, this.makerAddr)
            const isNetwork = await linkNetwork()
            if (isNetwork) {
                let res: any = await contractMethod(this.account, data).catch(err => {
                    loading.close()
                    ElNotification({
                        title: 'Error',
                        message: `Failed transactions: ${err.message}`,
                        type: 'error',
                    })
                    return
                })
                if (res && res.code === 200) {
                    ElNotification({
                        title: 'Success',
                        message: `Reduce successfully`,
                        type: 'success',
                    })
                    setTimeout(() => {
                        loading.close()
                        location.reload()
                    }, 10000);
                }
            } else {
                loading.close()
            }
        },

        async addLp() {
            let lpInfos = JSON.parse(JSON.stringify(this.multipleSelection))
            console.log(lpInfos)
            if (lpInfos.length == 0) {
                ElNotification({
                    title: 'Error',
                    message: `Select Network`,
                    type: 'error',
                })
                return
            }
            lpInfos = lpInfos.filter(v => {
                if (v.status == 0) {
                    delete v.from
                    delete v.to
                    delete v.status
                    delete v.isStop
                    delete v.isPause
                    delete v.isChoose
                    delete v.numberMinPrice
                    v.maxPrice = this.$web3.utils.toWei(v.maxPrice + '', 'ether')
                    v.gasFee = this.$web3.utils.toWei(v.gasFee + '', 'ether')
                    v.tradingFee = this.$web3.utils.toWei(v.tradingFee + '', 'ether')
                    return v
                }
            })
            const leafs = this.pairsData.map((row) => {
                return Buffer.from(row.id.replace('0x', ''), 'hex');
            });
            const { keccak256 } = this.$web3.utils;
            const supportPairTree = new MerkleTree(
                leafs,
                keccak256,
                {
                    sort: true,
                },
            );
            const pairProofLeavesHash = lpInfos.map((row) => {
                return Buffer.from(this.getPairID(row), 'hex');
            })
            const pairProof = pairProofLeavesHash.map((row) => {
                return supportPairTree.getHexProof(row);
            });
            const loading = ElLoading.service({
                lock: true,
                text: 'Loading',
            })
            lpInfos.map((item) => {
                item = JSON.parse(JSON.stringify(item))
                console.log(item)
            })
            console.log("lpInfos ==>", lpInfos)
            const args = [lpInfos, pairProof];
            console.log(args);

            let data = {
                name: 'LPAction',
                contractName: "ORMakerDeposit",
                contractAddr: this.makerAddr, 
                value: this.$web3.utils.toWei(this.payEth + '', 'ether'),
                arguments: args
            }
            console.log('lp add data ==>', data, this.account, this.makerAddr)
            const isNetwork = await linkNetwork()
            if (isNetwork) {
                let res: any = await contractMethod(this.account, data).catch(err => {
                    loading.close()
                    console.log('err ==>', err.message)
                    if (err.message == 'Returned error: insufficient funds for transfer') {
                        ElNotification({
                            title: 'Error',
                            message: `Failed transactions: Insufficient balance`,
                            type: 'error',
                        })
                    } else {
                        ElNotification({
                            title: 'Error',
                            message: `Failed transactions: ${err.message}`,
                            type: 'error',
                        })
                    }
                    return
                })
                if (res && res.code === 200) {
                    ElNotification({
                        title: 'Success',
                        message: `Added successfully`,
                        type: 'success',
                    })
                    setTimeout(() => {
                        loading.close()
                        location.reload()
                    }, 10000);
                }
            } else {
                loading.close()
            }
        },

        async lpChange(type, row) {
            let lpInfos = JSON.parse(JSON.stringify(row))
            
            delete lpInfos.from
            delete lpInfos.to
            delete lpInfos.status
            delete lpInfos.isStop
            delete lpInfos.isPause
            delete lpInfos.isChoose
            delete lpInfos.numberMinPrice

            if (lpInfos instanceof Array) {
                lpInfos.map(v => {
                    v.maxPrice = this.$web3.utils.toWei(v.maxPrice + '', 'ether')
                    v.gasFee = this.$web3.utils.toWei(v.gasFee + '', 'ether')
                    v.tradingFee = this.$web3.utils.toWei(v.tradingFee + '', 'ether')
                })
            } else {
                lpInfos.maxPrice = this.$web3.utils.toWei(lpInfos.maxPrice + '', 'ether')
                lpInfos.gasFee = this.$web3.utils.toWei(lpInfos.gasFee + '', 'ether')
                lpInfos.tradingFee = this.$web3.utils.toWei(lpInfos.tradingFee + '', 'ether')
            }
            const loading = ElLoading.service({
                lock: true,
                text: 'Loading',
            })
            let name = type == 1 ? 'LPPause' : 'LPStop'
            let LPData = {
                name,
                contractName: "ORMakerDeposit",
                contractAddr: this.makerAddr, 
                arguments: [lpInfos]
            }
            console.log('LPData ==>', LPData, this.account, this.makerAddr)
            const isNetwork = await linkNetwork()
            if (isNetwork) {
                let res: any = await contractMethod(this.account, LPData).catch(err => {
                    loading.close()
                    ElNotification({
                        title: 'Error',
                        message: `Failed transactions: ${err.message}`,
                        type: 'error',
                    })
                    return
                })
                if (res && res.code === 200) {
                    ElNotification({
                        title: 'Success',
                        message: type == 1 ? `Pause successfully`: `Stop successfully`,
                        type: 'success',
                    })
                    setTimeout(() => {
                        loading.close()
                        location.reload()
                    }, 10000);
                }
            } else {
                loading.close()
            }
        },

        async pauseLp(row) {
            await this.lpChange(1, [row])
        },

        async stopLp(row) {
            await this.lpChange(2, row)
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
                width: 100%;
                .margin_input_box {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0 auto;
                    
                    .price {
                        min-width: 150px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        border-bottom: 1px solid #333;
                        height: 30px;
                        font-size: 20px;
                        color: #DF2E2D;
                        text-align: center;
                        font-weight: bold;
                        & span:first-child {
                            margin-top: -2px;
                            margin-right: 5px;
                        }
                    }
                    .uint {
                        margin-left: 10px;
                        font-weight: bolder;
                    }
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