<template>
    <div class="TokenSelect">
        <el-select popper-class="tokenlist" v-model="tokenValue" placeholder="" ref="selectDom" @change="chooseToken">
            <template #prefix>
                <svg-icon :iconName="showChainIcon(tokenValue)" style="width: 24px; height: 24px"></svg-icon>
            </template>
            <div class="title">
                <h3>Select  a Token</h3>
                <!-- <img src="../../assets/img/x.png" alt="" @click="closeSelect"> -->
                <svg-icon :iconName="'close'" style="width: 16px; height: 16px" @click="closeSelect"></svg-icon>
                <!-- <SvgIconThemed  icon="mode" /> -->
            </div>
            <div class="search_box">
                <el-input v-model="search" class="w-50 m-2" size="large" placeholder="search" :prefix-icon="Search" @input="searchInp"/>
            </div>
            <div class="item_box">
                <el-option v-for="item in tokenList" :key="item.currencyid" :label="item.name" :value="item.currencyid">
                    <div class="token_icon">
                        <svg-icon :iconName="showChainIcon(item.currencyid)" style="width: 24px; height: 24px"></svg-icon>
                        <span>{{item.name}}</span>
                    </div>
                </el-option>
            </div>
        </el-select>
    </div>
</template>

<script lang="ts" setup>
import { Search } from '@element-plus/icons-vue'
import { reactive, ref, defineEmits } from 'vue';
import { tokenIcon, makerToken } from '../../utils/chain2id';
import { useQuery } from '@urql/vue';

const tokenValue = ref(1)
const search = ref('')
let token = reactive([
    {name: 'ETH', currencyid: 1, addr: "0x0000000000000000000000000000000000000000"},
])
const tokenList = ref({...token})

const showChainIcon = (localChainID) => {
    return tokenIcon(localChainID)
}
const selectDom = ref()
const closeSelect = () => {
    selectDom.value.blur()
}

const searchInp = (val) => {
    let reg =  new RegExp(`${val}`, 'ig')
    let searchData = token.filter((item) => {
        if (reg.test(item.name)) {
            return item
        }
    })
    if (searchData.length != 0) {
        tokenList.value = searchData
    }
}

const netList = async () => {
    const pairEntities = await useQuery({
        query: `
        query MyQuery {
            pairEntities {
                sourceChain
                destChain
                destToken
                sourceToken
            }
        }
        `
    });
    let data = pairEntities.data.value.pairEntities
    // for (const row of data) {
    //     const token = makerToken.find(item=> item.chainid === row.sourceChain&&item.address === row.sourceToken);
    //     if (token) {
    //         row.sourceSymbol = token.symbol;
    //     }
    // }
    // data.filter(row=> row.sourceSymbol === 'ETH')
    let tokens = reactive([] as any[]);
    data.map((v) => {
        if (!tokens.find((val) => val.addr == v.destToken)) {
            let tokenItem = makerToken.filter((item) => item.address == v.destToken)
            tokens.push({addr: v.destToken, name: tokenItem[0].symbol, currencyid: tokenItem[0].chainid})
        } else if (!tokens.find((val) => val.addr == v.sourceToken)) {
            let tokenItem = makerToken.filter((item) => item.address == v.destToken)
            tokens.push({addr: v.sourceToken, name: tokenItem[0].symbol, currencyid: tokenItem[0].chainid})
        }
    })
    tokenList.value = tokens
    token = tokens
}
netList()
const emits = defineEmits(['setTokenItem'])
const chooseToken = (val) => {
    emits('setTokenItem', val)
}

</script>

<style lang="scss" scoped>
.TokenSelect {
    display: inline-block;
    color: #333;
    :deep(.el-input__inner) {
        border: none;
        width: 150px;
        height: 40px;
        background-color: #F5F5F5;
        border-radius: 12px;
        padding-left: 36px !important;
        color: #333;
        font-weight: bold;
    }
}
</style>
<style lang="scss">
.el-select__popper.el-popper[role=tooltip] {
    border: none;
}
.tokenlist {
    border: none;
    background: transparent;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0px 8px 30px rgba(0, 0, 0, 0.16);
    border-radius: 20px;
    
    .el-select-dropdown__wrap{
        background-color: #fff;
        width: 320px;
        height: 370px;
        // padding: 20px 20px 0 20px;
        padding-top: 20px;
        .el-select-dropdown__list, .el-scrollbar__view, .el-select-dropdown__list {
            margin-top: 0;
        }
        .title {
            text-align: center;
            position: relative;
            margin-bottom: 18px;
            padding: 0 20px;
            box-sizing: border-box;
            h3 {
                margin: 0;
                font-size: 16px;
            }
            svg {
                cursor: pointer;
                height: 20px;
                position: absolute;
                right: 20px;
                top: 0;
            }
        }
        .search_box {
            padding: 0 20px;
            margin-bottom: 10px;
            .el-input__inner {
                height: 40px;
                width: 100%;
                padding-left: 45px;
                border-radius: 40px;
            }
            input {
                &::-webkit-input-placeholder {
                    font-weight: normal;
                }
            }
            .el-icon {
                font-size: 18px;
            }
            .el-input__icon{
                width: 50px;
            }
        }
        .item_box {
            height: 170px;
            overflow: auto;
            .el-select-dropdown__item {
                padding: 0 30px;
                font-weight: bold;
                color: #333;
            }
            .token_icon {
                display: flex;
                align-items: center;
                svg {
                    margin-right: 6px;
                }
            }
        }
    }
}
</style>