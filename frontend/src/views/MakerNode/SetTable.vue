<template>
    <div class="table_box">
        <el-form ref="formTableRef" :model="formTable" :rules="rules">
            <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="from" label="From">
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
                <el-table-column prop="limit" label="Limit">
                    <template #default="{ row, $index }">
                        <el-form-item :prop="`tableData[${$index}].limit`" :rules="rules.limit">
                            <div class="from_item clearfix">
                                <el-input oninput="value = value.replace(/[^0-9.]/g,'')" class="fl" v-model="row.limit" placeholder="0"/>
                                <span class="fl uint">ETH</span>
                            </div>
                        </el-form-item>
                    </template>
                </el-table-column>
                <el-table-column prop="withholdingFee" label="Withholding Fee">
                    <template #default="{ row, $index }">
                        <el-form-item :prop="`tableData[${$index}].withholdingFee`" :rules="rules.limit">
                            <div class="from_item clearfix">
                                <el-input oninput="value = value.replace(/[^0-9.]/g,'')" class="fl" v-model="row.withholdingFee" placeholder="0"/>
                                <span class="fl uint">ETH</span>
                            </div>
                        </el-form-item>
                    </template>
                </el-table-column>
                <el-table-column prop="tradingFee" label="Trading Fee">
                    <template #default="{ row, $index }">
                        <el-form-item :prop="`tableData[${$index}].tradingFee`" :rules="rules.limit">
                            <div class="from_item clearfix">
                                <el-input oninput="value = value.replace(/[^0-9.]/g,'')" class="fl" v-model="row.tradingFee" placeholder="0"/>
                                <span class="fl uint">%</span>
                            </div>
                        </el-form-item>
                    </template>
                </el-table-column>
            </el-table>
        </el-form>
    </div>
</template>

<script lang="ts" setup>
import { toRefs, defineProps, defineEmits, watch, ref, defineExpose } from 'vue'

const emits = defineEmits(["setTabList", "setIsValidate"])
const formTableRef = ref()

const verifyNumber = (rule: any, value: any, callback: any) => {
    if (!value) {
        return callback(new Error('value null'))
    } else if (value == 0) {
        return callback(new Error('value 0'))
    } else {
        callback()
    }
}
const rules = {
    limit: [{ required: true, validator: verifyNumber, type: 'number', trigger: 'blur' }]
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
defineExpose({
    handleSubmit
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

}
</style>

