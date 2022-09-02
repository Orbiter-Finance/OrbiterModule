<template>
    <div class="TokenSelect">
        <el-select popper-class="tokenlist" v-model="tokenValue" placeholder="">
            <template #prefix>
                <svg-icon :iconName="showChainIcon(1)" style="width: 24px; height: 24px"></svg-icon>
            </template>
            <div class="title">
                <h3>Select  a Token</h3>
                <!-- <img src="../../assets/img/x.png" alt="" @click="closeSelect"> -->
                <svg-icon :iconName="'close'" style="width: 16px; height: 16px" @click="closeSelect"></svg-icon>
                <!-- <SvgIconThemed  icon="mode" /> -->
            </div>
            <div class="search_box">
                <el-input v-model="search" class="w-50 m-2" size="large" placeholder="search" :prefix-icon="Search"/>
            </div>
            <div class="item_box">
                <el-option v-for="item in tokenList" :key="item.currencyid" :label="item.name" :value="item.currencyid">
                    <div class="token_icon">
                        <svg-icon :iconName="showChainIcon(1)" style="width: 24px; height: 24px"></svg-icon>
                        <span>{{item.name}}</span>
                    </div>
                </el-option>
            </div>
        </el-select>
    </div>
</template>

<script lang="ts" setup>
import { Search } from '@element-plus/icons-vue'
import { reactive, ref } from 'vue';
import { chain2icon } from '../../utils/chain2id';

const tokenValue = ref(1)
const search = ref('')
const token = reactive([
    {name: 'ETH', currencyid: 1},
    {name: 'USDC', currencyid: 2},
    {name: 'USDT', currencyid: 3},
    {name: 'DAI', currencyid: 4},
    {name: 'Metis', currencyid: 5},
])
const tokenList = ref({...token})
const showChainIcon = (localChainID) => {
    return chain2icon(localChainID)
}
const closeSelect = () => {
    
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