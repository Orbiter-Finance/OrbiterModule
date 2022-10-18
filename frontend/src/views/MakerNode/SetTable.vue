<template>
    <div class="table_box">
        <el-form ref="formTableRef" :model="formTable" :rules="rules">
            <el-table ref="multipleTableRef" :data="tableData" style="width: 100%" @selection-change="handleSelectionChange">
                <el-table-column
                    prop="isChoose"
                    type="selection"
                    width="55">
                </el-table-column>
                <el-table-column prop="from" label="From" class="test">
                    <template #default="scope">
                        <div class="from_item">
                            <span>{{ scope.row.from }}</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="to" label="To">
                    <template #default="scope">
                        <div class="from_item">
                            <span>{{ scope.row.to }}</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="maxPrice" label="Limit">
                    <template #default="{ row, $index }">
                        <el-form-item :prop="`tableData[${$index}].maxPrice`" :rules="rules.maxPrice">
                            <div class="from_item clearfix">
                                <el-input-number v-model="row.maxPrice" :min="row.numberMinPrice" :disabled="row.status != 0"></el-input-number>
                                <!-- <el-input oninput="value = value.replace(/[^0-9.]/g,'')" class="fl" v-model="row.maxPrice" placeholder="0" :readonly="row.status != 0"/> -->
                                <span class="fl uint">ETH</span>
                            </div>
                        </el-form-item>
                    </template>
                </el-table-column>
                <el-table-column prop="gasFee" label="Withholding Fee">
                    <template #default="{ row, $index }">
                        <el-form-item :prop="`tableData[${$index}].gasFee`" :rules="rules.maxPrice">
                            <div class="from_item clearfix">
                                <el-input-number v-model="row.gasFee" :disabled="row.status != 0"></el-input-number>
                                <!-- <el-input oninput="value = value.replace(/[^0-9.]/g,'')" class="fl" v-model="row.gasFee" placeholder="0" :readonly="row.status != 0"/> -->
                                <span class="fl uint">ETH</span>
                            </div>
                        </el-form-item>
                    </template>
                </el-table-column>
                <el-table-column prop="tradingFee" label="Trading Fee">
                    <template #default="{ row, $index }">
                        <el-form-item :prop="`tableData[${$index}].tradingFee`" :rules="rules.maxPrice">
                            <div class="from_item clearfix">
                                <el-input-number v-model="row.tradingFee" :disabled="row.status != 0"></el-input-number>
                                <!-- <el-input oninput="value = value.replace(/[^0-9.?]/g,'')" class="fl" v-model="row.tradingFee" placeholder="0" :readonly="row.status != 0"/> -->
                                <span class="fl uint">%</span>
                            </div>
                        </el-form-item>
                    </template>
                </el-table-column>
                <el-table-column prop="status" width="100px" label="Status">
                    <template #default="{ row }">
                        <el-form-item>
                            <div class="status_btn">
                                <span v-if="row.status == 0" style="color: #d44839;">Stop</span>
                                <span v-if="row.status == 1" style="color: #4aa34a">Start</span>
                                <span v-if="row.status == 2" style="color: #dca551">Pause</span>
                            </div>
                        </el-form-item>
                    </template>
                </el-table-column>
                <el-table-column prop="status" width="100px" label="Operation">
                    <template #default="{ row }">
                        <el-form-item>
                            <div class="status_btn">
                                <span class="status_stop" v-if="row.isStop && row.status == 2" @click="stopLp(row)">Stop</span>
                                <span class="status_stop_not" v-if="!row.isStop && row.status == 2" @click="notStop(row)">Stop</span>
                                <span class="status_pause" v-if="row.isPause && row.status == 1"  @click="pauseLp(row)">Pause</span>
                                <span class="status_pause_not" v-if="!row.isPause && row.status == 1">Pause</span>
                            </div>
                        </el-form-item>
                    </template>
                </el-table-column>
            </el-table>
        </el-form>
    </div>
</template>

<script lang="ts" setup>
import { contract_obj } from '@/contracts';
import util from '@/utils/util';
import { ElLoading, ElNotification } from 'element-plus';
import { toRefs, defineProps, defineEmits, watch, ref, defineExpose, reactive, nextTick } from 'vue'
// import { makerToken } from '../../utils/chain2id'

const multipleSelection = reactive([])

const emits = defineEmits(["setMultipleSelection", "setTabList", "setIsValidate", 'stopLp', 'pauseLp'])
const formTableRef = ref()
const multipleTableRef = ref()
// const verifyLimit = (rule: any, value: any, callback: any) => {
//     let tokenType = makerToken.filter(v => v.chainid == this.tokenItem)
// } 
const verifyNumber = (rule: any, value: any, callback: any) => {
    console.log("rule ==>", rule)
    if (!value) {
        return callback(new Error('value null'))
    } else if (value == 0) {
        return callback(new Error('value 0'))
    } else {
        callback()
    }
}
const rules = {
    maxPrice: [{ required: true, validator: verifyNumber, type: 'number', trigger: 'blur' }]
}
const props = defineProps({
    tableList: Array,
})
const {tableList} = toRefs(props)

const tableData = tableList?.value
const formTable = ref({tableData})

const handleSubmit = () => {
    formTableRef.value.validate((valid) => {
        emits("setIsValidate", valid)
    })
}

const handleSelectionChange = (val) => {
    multipleSelection.values = val
    toggleSelection(val)
    emits("setMultipleSelection", val)
    // console.log("multipleSelection ==>", multipleSelection.values)
}
const toggleSelection = (rows) => {
    if (rows) {
        rows.forEach(row => {
            nextTick(() => {
                multipleTableRef.value.toggleRowSelection(row, true);
            })
        });
    }
}

const stopLp = (item) => {
    emits("stopLp", item)
}
const notStop = async (item) => {
    console.log("notStop item ==>", item)
    const loading = ElLoading.service({
        lock: true,
        text: 'Loading',
    })
    const contract_manager = await contract_obj('ORManager')
    let ebcAddr = await contract_manager.methods.getEBC(item.ebcid).call()
    const contract_ORProtocalV1 = await contract_obj('ORProtocalV1', ebcAddr)
    const stopDealyTime = await contract_ORProtocalV1.methods.getStopDealyTime(item.sourceChain).call()
    const stopTime = (Number(stopDealyTime) + Number(item.stopTime))
    const time = util.transferTimeStampToTime(stopTime)
    loading.close()
    ElNotification({
        title: 'Error',
        message: `Time not up: ${time}`,
        type: 'error',
    })
}

const pauseLp = (item) => {
    emits("pauseLp", item)
}

defineExpose({
    handleSubmit,
    toggleSelection
})

watch(() => tableData, (newVal) => {
    if (newVal?.length != 0) {
        emits("setTabList", newVal)
    }
}, { deep: true, immediate: true})

</script>

<style lang="scss" scoped>
.table_box {
    .from_item {
        height: 20px;
        display: flex;
        justify-content: left;

        span {
            font-weight: bold;
        }

        .uint {
            margin-left: 10px;
        }

        input {
            color: #5EC2B7;
        }
    }
    // .status_btn {
    //     width: 100%;
    // }
    .status_stop, .status_pause, .status_stop_not, .status_pause_not {
        display: inline-block;
        width: 70px;
        height: 30px;
        box-sizing: border-box;
        border-radius: 40px;
        background: linear-gradient(90.46deg, #EB382D 4.07%, #BC3035 98.55%);
        box-shadow: inset 0px -8px 0px rgba(0, 0, 0, 0.16);
        text-align: center;
        line-height: 30px;
        font-weight: bold;
        // padding: 3px 10px;
        color: #ffffff;
        cursor: pointer;
        &:hover {
            background: #BC3035;
            box-shadow: inset 0px -6px 0px rgba(0, 0, 0, 0.16);
        }
    }
    .status_stop_not, .status_pause_not {
        background: linear-gradient(90.46deg, #d4d3d3 4.07%, #b6b6b5 98.55%);
        box-shadow: inset 0px -8px 0px rgba(0, 0, 0, 0.16);
        &:hover {
            background: #b6b6b5;
            box-shadow: inset 0px -6px 0px rgba(0, 0, 0, 0.16);
        }
    }
    .status_pause {
        background: linear-gradient(90.46deg, #e4ad5a 4.07%, #dca551 98.55%);
        box-shadow: inset 0px -8px 0px rgba(0, 0, 0, 0.16);
        &:hover {
            background: #dca551;
            box-shadow: inset 0px -6px 0px rgba(0, 0, 0, 0.16);
        }
    }
    // /deep/ .el-table {

    // }
    :deep(.el-table thead) {
        color: #333;
    }

    :deep(.el-table th.el-table__cell>.cell) {
        text-align: left;
    }

    :deep(.el-table) {
        background-color: transparent;
    }

    :deep(.el-table tr) {
        background-color: transparent;
    }

    :deep(.el-table th.el-table__cell) {
        background-color: transparent;
    }

    :deep(.el-input) {
        // display: inline-block;
        width: 80px;
        --el-input-focus-border: none;
        --el-input-hover-border: none;
    }

    :deep(.el-input__inner) {
        background-color: transparent;
        border: none;
        border-bottom: 1px solid #333;
        border-radius: 0;
        height: 20px;
        color: #5EC2B7;
        width: 100%;
        text-align: center;
    }
    :deep(.el-input__inner::placeholder) {
        color: #5EC2B7;
    }
    :deep(.el-form-item) {
        margin-bottom: 0;
    }
    :deep(.el-form-item.is-error .el-input__inner, .el-form-item.is-error .el-input__inner) {
        border-color: var(--el-color-danger);
    }
    :deep(.el-form-item__content) {
        line-height: 20px;
    }
    :deep(.el-table td.el-table__cell) {
        border-bottom: none;
    }

    :deep(.el-table::before) {
        display: none;
    }
    :deep(.el-input-number__decrease) {
        display: none;
    }
    :deep(.el-input-number__increase) {
        display: none;
    }
    :deep(.el-input-number) {
        width: auto;
        line-height: 0;
        .el-input {
            display: inline-block;
            height: 100%;
        }
        .el-input__inner {
            padding: 0;
            height: 20px;
            position: absolute;
            top: 0;
        }
    }
}
</style>

