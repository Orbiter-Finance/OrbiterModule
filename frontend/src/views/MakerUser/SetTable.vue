<template>
    <div class="table_box">
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
                <template #default="scope">
                    <div class="from_item clearfix">
                        <el-input class="fl" v-model="scope.row.limit" placeholder="" />
                        <span class="fl uint">ETH</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="withholdingFee" label="Withholding Fee">
                <template #default="scope">
                    <div class="from_item clearfix">
                        <el-input class="fl" v-model="scope.row.withholdingFee" placeholder="" />
                        <span class="fl uint">ETH</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="tradingFee" label="Trading Fee">
                <template #default="scope">
                    <div class="from_item clearfix">
                        <el-input class="fl" v-model="scope.row.tradingFee" placeholder="" />
                        <span class="fl uint">%</span>
                    </div>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script lang="ts" setup>

interface User {
    from: string
    to: string
    limit: number
    withholdingFee: number
    tradingFee: number
}

// const handleEdit = (index: number, row: User) => {
//     console.log(index, row)
// }
// const handleDelete = (index: number, row: User) => {
//     console.log(index, row)
// }

const tableData: User[] = [
    {
        from: 'zkSync',
        to: 'Ethereum Mainnet',
        limit: 0,
        withholdingFee: 0,
        tradingFee: 0
    },
    {
        from: 'zkSync',
        to: 'Ethereum Mainnet',
        limit: 0,
        withholdingFee: 0,
        tradingFee: 0
    },
    {
        from: 'zkSync',
        to: 'Ethereum Mainnet',
        limit: 0,
        withholdingFee: 0,
        tradingFee: 0
    },
    {
        from: 'zkSync',
        to: 'Ethereum Mainnet',
        limit: 0,
        withholdingFee: 0,
        tradingFee: 0
    },
]
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

    :deep(.el-table td.el-table__cell) {
        border-bottom: none;
    }

    :deep(.el-table::before) {
        display: none;
    }

}
</style>

