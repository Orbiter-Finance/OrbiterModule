<template>
    <vxe-toolbar>
        <template #buttons>
            <div style="display: flex;justify-content: space-between;align-items: center">
                <vxe-button style="margin-left: 10px;" @click="insertEvent()">add</vxe-button>
                <vxe-button style="margin-right: 10px;" @click="authInfo.showAuth = true">{{ githubAccessToken ? "authed" : "auth" }}</vxe-button>
            </div>
        </template>
    </vxe-toolbar>

    <vxe-table :loading="delLoading" border show-overflow show-header :scroll-x="{ gt: 10 }" :column-config="{ resizable: true }" :data="tradeInfo.tableData" @cell-dblclick="cellDBLClickEvent">
        <vxe-column field="makerAddress" title="makerAddress" width="350"></vxe-column>
        <vxe-column field="c1ID" title="c1ID" width="60"></vxe-column>
        <vxe-column field="c2ID" title="c2ID" width="60"></vxe-column>
        <vxe-column field="c1Name" title="c1Name" width="100"></vxe-column>
        <vxe-column field="c2Name" title="c2Name" width="100"></vxe-column>
        <vxe-column field="t1Address" title="t1Address" width="350"></vxe-column>
        <vxe-column field="t2Address" title="t2Address" width="350"></vxe-column>
        <vxe-column field="tName" title="tName" width="70"></vxe-column>
        <vxe-column field="c1MinPrice" title="c1MinPrice" width="120"></vxe-column>
        <vxe-column field="c1MaxPrice" title="c1MaxPrice" width="120"></vxe-column>
        <vxe-column field="c2MinPrice" title="c2MinPrice" width="120"></vxe-column>
        <vxe-column field="c2MaxPrice" title="c2MaxPrice" width="120"></vxe-column>
        <vxe-column field="precision" title="precision" width="100"></vxe-column>
        <vxe-column field="c1AvalibleDeposit" title="c1AvalibleDeposit" width="150"></vxe-column>
        <vxe-column field="c2AvalibleDeposit" title="c2AvalibleDeposit" width="150"></vxe-column>
        <vxe-column field="c1TradingFee" title="c1TradingFee" width="150"></vxe-column>
        <vxe-column field="c2TradingFee" title="c2TradingFee" width="150"></vxe-column>
        <vxe-column field="c1GasFee" title="c1GasFee" width="100"></vxe-column>
        <vxe-column field="c2GasFee" title="c2GasFee" width="100"></vxe-column>
        <vxe-colgroup title="c1AvalibleTimes">
            <vxe-column field="c1AvalibleTimes[0].startTime" title="startTime" :formatter="formatterDate" width="150"></vxe-column>
            <vxe-column field="c1AvalibleTimes[0].endTime" title="endTime" :formatter="formatterDate" width="80"></vxe-column>
        </vxe-colgroup>

        <vxe-colgroup field="c2AvalibleTimes" title="c2AvalibleTimes">
            <vxe-column field="c2AvalibleTimes[0].startTime" :formatter="formatterDate" title="startTime" width="150"></vxe-column>

            <vxe-column field="c2AvalibleTimes[0].endTime" title="endTime" :formatter="formatterDate" width="80"></vxe-column>
        </vxe-colgroup>

        <vxe-column title="operation" width="100" show-overflow>
            <template #default="{ row }">
                <vxe-button type="text" icon="vxe-icon--edit-outline" @click="editEvent(row)"></vxe-button>
                <vxe-button type="text" icon="vxe-icon--error" @click="removeEvent(row)"></vxe-button>
            </template>
        </vxe-column>
    </vxe-table>

    <!-- 历史记录 -->
    <div style="margin:15px 0 5px 0">
        <vxe-toolbar>
            <template #buttons>
                <div style="margin-left: 10px;font-size: 20px;">history</div>
            </template>
        </vxe-toolbar>
        <vxe-table :loading="delLoading" border show-overflow show-header :scroll-x="{ gt: 10 }" :column-config="{ resizable: true }" :data="tradeInfo.historyTableData">
            <vxe-column field="makerAddress" title="makerAddress" width="350"></vxe-column>
            <vxe-column field="c1ID" title="c1ID" width="60"></vxe-column>
            <vxe-column field="c2ID" title="c2ID" width="60"></vxe-column>
            <vxe-column field="c1Name" title="c1Name" width="100"></vxe-column>
            <vxe-column field="c2Name" title="c2Name" width="100"></vxe-column>
            <vxe-column field="t1Address" title="t1Address" width="350"></vxe-column>
            <vxe-column field="t2Address" title="t2Address" width="350"></vxe-column>
            <vxe-column field="tName" title="tName" width="70"></vxe-column>
            <vxe-column field="c1MinPrice" title="c1MinPrice" width="120"></vxe-column>
            <vxe-column field="c1MaxPrice" title="c1MaxPrice" width="120"></vxe-column>
            <vxe-column field="c2MinPrice" title="c2MinPrice" width="120"></vxe-column>
            <vxe-column field="c2MaxPrice" title="c2MaxPrice" width="120"></vxe-column>
            <vxe-column field="precision" title="precision" width="100"></vxe-column>
            <vxe-column field="c1AvalibleDeposit" title="c1AvalibleDeposit" width="150"></vxe-column>
            <vxe-column field="c2AvalibleDeposit" title="c2AvalibleDeposit" width="150"></vxe-column>
            <vxe-column field="c1TradingFee" title="c1TradingFee" width="150"></vxe-column>
            <vxe-column field="c2TradingFee" title="c2TradingFee" width="150"></vxe-column>
            <vxe-column field="c1GasFee" title="c1GasFee" width="100"></vxe-column>
            <vxe-column field="c2GasFee" title="c2GasFee" width="100"></vxe-column>
            <vxe-colgroup title="c1AvalibleTimes">
                <vxe-column field="c1AvalibleTimes[0].startTime" title="startTime" :formatter="formatterDate" width="150"></vxe-column>
                <vxe-column field="c1AvalibleTimes[0].endTime" title="endTime" :formatter="formatterDate" width="150"></vxe-column>
            </vxe-colgroup>

            <vxe-colgroup field="c2AvalibleTimes" title="c2AvalibleTimes">
                <vxe-column field="c2AvalibleTimes[0].startTime" :formatter="formatterDate" title="startTime" width="150"></vxe-column>

                <vxe-column field="c2AvalibleTimes[0].endTime" title="endTime" :formatter="formatterDate" width="150"></vxe-column>
            </vxe-colgroup>
        </vxe-table>
    </div>

    <!-- 弹窗编辑 -->
    <vxe-modal
        v-model="tradeInfo.showEdit"
        :title="tradeInfo.selectRow ? 'edit&save' : 'add&save'"
        width="1100"
        min-width="1100"
        min-height="300"
        :loading="tradeInfo.submitLoading"
        resize
        destroy-on-close
    >
        <template #default>
            <vxe-form :data="tradeInfo.formData" :rules="tradeInfo.formRules" title-align="left" title-width="100" @submit="submitEvent">
                <vxe-form-item field="makerAddress" title="makerAddress" :span="12" :item-render="{}">
                    <template #default="{ data }">
                        <vxe-input v-model="data.makerAddress" placeholder="input makerAddress"></vxe-input>
                    </template>
                </vxe-form-item>

                <vxe-form-item field="c1ID" title="c1ID" :span="12">
                    <template #default="{ data }">
                        <vxe-input :disabled="tradeInfo.selectRow ? true : false" type="integer" v-model="data.c1ID" placeholder="input c1ID"></vxe-input>
                    </template>
                </vxe-form-item>

                <vxe-form-item field="c2ID" title="c2ID" :span="12">
                    <template #default="{ data }">
                        <vxe-input :disabled="tradeInfo.selectRow ? true : false" type="integer" v-model="data.c2ID" placeholder="input c2ID"></vxe-input>
                    </template>
                </vxe-form-item>

                <vxe-form-item field="c1Name" title="c1Name" :span="12" :item-render="{}">
                    <template #default="{ data }">
                        <vxe-input :disabled="tradeInfo.selectRow ? true : false" v-model="data.c1Name" placeholder="input c1Name"></vxe-input>
                    </template>
                </vxe-form-item>

                <vxe-form-item field="c2Name" title="c2Name" :span="12" :item-render="{}">
                    <template #default="{ data }">
                        <vxe-input :disabled="tradeInfo.selectRow ? true : false" v-model="data.c2Name" placeholder="input c2Name"></vxe-input>
                    </template>
                </vxe-form-item>
                <vxe-form-item field="t1Address" title="t1Address" :span="12" :item-render="{}">
                    <template #default="{ data }">
                        <vxe-input :disabled="tradeInfo.selectRow ? true : false" v-model="data.t1Address" placeholder="input t1Address"></vxe-input>
                    </template>
                </vxe-form-item>
                <vxe-form-item field="t2Address" title="t2Address" :span="12" :item-render="{}">
                    <template #default="{ data }">
                        <vxe-input v-model="data.t2Address" placeholder="input t2Address"></vxe-input>
                    </template>
                </vxe-form-item>
                <vxe-form-item field="tName" title="tName" :span="12">
                    <template #default="{ data }">
                        <vxe-input :disabled="tradeInfo.selectRow ? true : false" v-model="data.tName" placeholder="input tName"></vxe-input>
                    </template>
                </vxe-form-item>
                <vxe-form-item field="c1MinPrice" title="c1MinPrice" :span="12" :item-render="{}">
                    <template #default="{ data }">
                        <vxe-input :disabled="tradeInfo.selectRow ? true : false" type="number" v-model="data.c1MinPrice" placeholder="input c1MinPrice"></vxe-input>
                    </template>
                </vxe-form-item>
                <vxe-form-item field="c1MaxPrice" title="c1MaxPrice" :span="12" :item-render="{}">
                    <template #default="{ data }">
                        <vxe-input :disabled="tradeInfo.selectRow ? true : false" type="number" v-model="data.c1MaxPrice" placeholder="input c1MaxPrice"></vxe-input>
                    </template>
                </vxe-form-item>
                <vxe-form-item field="c2MinPrice" title="c2MinPrice" :span="12" :item-render="{}">
                    <template #default="{ data }">
                        <vxe-input :disabled="tradeInfo.selectRow ? true : false" type="number" v-model="data.c2MinPrice" placeholder="input c2MinPrice"></vxe-input>
                    </template>
                </vxe-form-item>
                <vxe-form-item field="c2MaxPrice" title="c2MaxPrice" :span="12" :item-render="{}">
                    <template #default="{ data }">
                        <vxe-input :disabled="tradeInfo.selectRow ? true : false" type="number" v-model="data.c2MaxPrice" placeholder="input c2MaxPrice"></vxe-input>
                    </template>
                </vxe-form-item>
                <vxe-form-item field="precision" title="precision" :span="12" :item-render="{}">
                    <template #default="{ data }">
                        <vxe-input :disabled="tradeInfo.selectRow ? true : false" type="integer" v-model="data.precision" placeholder="input precision"></vxe-input>
                    </template>
                </vxe-form-item>
                <vxe-form-item field="c1AvalibleDeposit" title="c1AvalibleDeposit" :span="12" :item-render="{}">
                    <template #default="{ data }">
                        <vxe-input :disabled="tradeInfo.selectRow ? true : false" type="number" v-model="data.c1AvalibleDeposit" placeholder="input c1AvalibleDeposit"></vxe-input>
                    </template>
                </vxe-form-item>
                <vxe-form-item field="c2AvalibleDeposit" title="c2AvalibleDeposit" :span="12" :item-render="{}">
                    <template #default="{ data }">
                        <vxe-input :disabled="tradeInfo.selectRow ? true : false" type="number" v-model="data.c2AvalibleDeposit" placeholder="input c2AvalibleDeposit"></vxe-input>
                    </template>
                </vxe-form-item>
                <vxe-form-item field="c1TradingFee" title="c1TradingFee" :span="12" :item-render="{}">
                    <template #default="{ data }">
                        <vxe-input type="number" v-model="data.c1TradingFee" placeholder="input c1TradingFee"></vxe-input>
                    </template>
                </vxe-form-item>
                <vxe-form-item field="c2TradingFee" title="c2TradingFee" :span="12" :item-render="{}">
                    <template #default="{ data }">
                        <vxe-input type="number" v-model="data.c2TradingFee" placeholder="input c2TradingFee"></vxe-input>
                    </template>
                </vxe-form-item>

                <vxe-form-item field="c1GasFee" title="c1GasFee" :span="12" :item-render="{}">
                    <template #default="{ data }">
                        <vxe-input type="number" v-model="data.c1GasFee" placeholder="input c1GasFee"></vxe-input>
                    </template>
                </vxe-form-item>
                <vxe-form-item field="c2GasFee" title="c2GasFee" :span="12" :item-render="{}">
                    <template #default="{ data }">
                        <vxe-input type="number" v-model="data.c2GasFee" placeholder="input c2GasFee"></vxe-input>
                    </template>
                </vxe-form-item>

                <vxe-form-item field="c1StartTime" title="c1StartTime" :span="12" :item-render="{}">
                    <template #default="{ data }">
                        <vxe-input :disabled="tradeInfo.selectRow ? true : false" v-model="data.c1StartTime" type="datetime" placeholder="select dateTime" transfer></vxe-input>
                    </template>
                </vxe-form-item>
                <vxe-form-item field="c2StartTime" title="c2StartTime" :span="12" :item-render="{}">
                    <template #default="{ data }">
                        <vxe-input :disabled="tradeInfo.selectRow ? true : false" v-model="data.c2StartTime" type="datetime" placeholder="select dateTime" transfer></vxe-input>
                    </template>
                </vxe-form-item>
                <vxe-form-item align="center" title-align="left" :span="24">
                    <template #default>
                        <vxe-button type="submit">submit</vxe-button>
                        <vxe-button @click="tradeInfo.showEdit = false">cancel</vxe-button>
                    </template>
                </vxe-form-item>
            </vxe-form>
        </template>
    </vxe-modal>

    <vxe-modal title="auth" v-model="authInfo.showAuth" width="500" min-width="400" min-height="300" destroy-on-close>
        <template #default>
            <vxe-form :data="authInfo.auth" title-align="left" title-width="100" @submit="toAuth">
                <vxe-form-item field="githubAccessToken" title="token" :span="24" :item-render="{}">
                    <template #default="{ data }">
                        <vxe-input v-model="data.githubAccessToken" placeholder="input AccessToken"></vxe-input>
                    </template>
                </vxe-form-item>
                <vxe-form-item align="center" title-align="left" :span="24">
                    <template #default>
                        <vxe-button type="submit">auth</vxe-button>
                    </template>
                </vxe-form-item>
            </vxe-form>
        </template>
    </vxe-modal>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted, computed, ref } from 'vue'
import dayjs from 'dayjs'
import axios from "axios";
import { Base64 } from "js-base64";
import { useStore } from "vuex";
import { AES } from "crypto-js"
import {
    VXETable,
    VxeColumnPropTypes,
    VxeFormPropTypes,
    VxeTableEvents,
} from 'vxe-table'

export default defineComponent({
    setup() {
        const apiUrl = "https://api.github.com"
        const store = useStore();
        const delLoading = ref(false)
        const githubAccessToken = computed(() => {
            return store.state.githubAccessToken
        })
        const authInfo = reactive({
            auth: { githubAccessToken: '' },
            showAuth: false
        })
        const tradeInfo = reactive({
            submitLoading: false,
            tableData: [] as any[],
            historyTableData: [] as any[],
            selectRow: null,
            showEdit: false,
            formData: {
                makerAddress: '',
                c1ID: null,
                c2ID: null,
                c1Name: '',
                c2Name: '',
                t1Address: '',
                t2Address: '',
                tName: '',
                c1MinPrice: null,
                c1MaxPrice: null,
                c2MinPrice: null,
                c2MaxPrice: null,
                precision: null,
                c1AvalibleDeposit: null,
                c2AvalibleDeposit: null,
                c1TradingFee: null,
                c2TradingFee: null,
                c1GasFee: null,
                c2GasFee: null,
                c1StartTime: '',
                c2StartTime: ''
            },
            formRules: {
                makerAddress: [
                    { required: true, message: 'input makerAddress' },
                    { min: 1, message: 'length can not  be empty' },
                ],
                c1ID: [
                    { required: true, message: 'input c1ID' },
                    { min: 1 },
                ],
                c2ID: [
                    { required: true, message: 'input c2ID' },
                    { min: 1 },
                ],
                c1Name: [
                    { required: true, message: 'input c1Name' },
                    { min: 1, message: 'length can not  be empty' },
                ],
                c2Name: [
                    { required: true, message: 'input c2Name' },
                    { min: 1, message: 'length can not  be empty' },
                ],
                t1Address: [
                    { required: true, message: 'input t1Address' },
                    { min: 1, message: 'length can not  be empty' },
                ],
                t2Address: [
                    { required: true, message: 'input t2Address' },
                    { min: 1, message: 'length can not  be empty' },
                ],
                tName: [
                    { required: true, message: 'input tName' },
                    { min: 1, message: 'length can not  be empty' },
                ],
                c1MinPrice: [
                    { required: true, message: 'input c1MinPrice' },
                    { min: 0 },
                ],
                c1MaxPrice: [
                    { required: true, message: 'input c1MaxPrice' },
                    { min: 1 },
                ],
                c2MinPrice: [
                    { required: true, message: 'input c2MinPrice' },
                    { min: 0 },
                ],
                c2MaxPrice: [
                    { required: true, message: 'input c2MaxPrice' },
                    { min: 0 },
                ],
                precision: [
                    { required: true, message: 'input precision' },
                    { min: 1 },
                ],
                c1AvalibleDeposit: [
                    { required: true, message: 'input c1AvalibleDeposit' },
                    { min: 0 },
                ],
                c2AvalibleDeposit: [
                    { required: true, message: 'input c2AvalibleDeposit' },
                    { min: 0 },
                ],
                c1TradingFee: [
                    { required: true, message: 'input c1TradingFee' },
                    { min: 1 },
                ],
                c2TradingFee: [
                    { required: true, message: 'input c2TradingFee' },
                    { min: 1 },
                ],
                c1GasFee: [
                    { required: true, message: 'input c1GasFee' },
                    { min: 1 },
                ],
                c2GasFee: [
                    { required: true, message: 'input c2GasFee' },
                    { min: 1 },
                ],
                c1StartTime: [
                    { required: true, message: 'select c1StartTimes' },
                    { min: 1 }
                ],
                c2StartTime: [
                    { required: true, message: 'select c1StartTimes' },
                    { min: 1 }
                ]
            } as VxeFormPropTypes.Rules,
        })

        //transform timeStamp to normal 
        const formatterDate: VxeColumnPropTypes.Formatter = ({ cellValue }) => {
            if (cellValue > 99999999999) {
                return '∞'
            }
            return dayjs.unix(cellValue).format('YYYY-MM-DD HH:mm:ss')
        }
        //add form
        const insertEvent = () => {
            if (!store.state.githubAccessToken) {
                alert("please auth first")
                return
            }
            tradeInfo.formData = {
                makerAddress: '',
                c1ID: null,
                c2ID: null,
                c1Name: '',
                c2Name: '',
                t1Address: '',
                t2Address: '',
                tName: '',
                c1MinPrice: null,
                c1MaxPrice: null,
                c2MinPrice: null,
                c2MaxPrice: null,
                precision: null,
                c1AvalibleDeposit: null,
                c2AvalibleDeposit: null,
                c1TradingFee: null,
                c2TradingFee: null,
                c1GasFee: null,
                c2GasFee: null,
                c1StartTime: '',
                c2StartTime: '',
            }
            tradeInfo.selectRow = null
            tradeInfo.showEdit = true
        }
        //edit form
        const editEvent = (row: any) => {
            if (!store.state.githubAccessToken) {
                alert("please auth first")
                return
            }
            tradeInfo.formData = {
                makerAddress: row.makerAddress,
                c1ID: row.c1ID,
                c2ID: row.c2ID,
                c1Name: row.c1Name,
                c2Name: row.c2Name,
                t1Address: row.t1Address,
                t2Address: row.t2Address,
                tName: row.tName,
                c1MinPrice: row.c1MinPrice,
                c1MaxPrice: row.c1MaxPrice,
                c2MinPrice: row.c2MinPrice,
                c2MaxPrice: row.c2MaxPrice,
                precision: row.precision,
                c1AvalibleDeposit: row.c1AvalibleDeposit,
                c2AvalibleDeposit: row.c2AvalibleDeposit,
                c1TradingFee: row.c1TradingFee,
                c2TradingFee: row.c2TradingFee,
                c1GasFee: row.c1GasFee,
                c2GasFee: row.c2GasFee,
                c1StartTime: dayjs.unix(row.c1AvalibleTimes[0].startTime).format('YYYY-MM-DD HH:mm:ss'),
                c2StartTime: dayjs.unix(row.c2AvalibleTimes[0].startTime).format('YYYY-MM-DD HH:mm:ss')
            }
            tradeInfo.selectRow = row
            tradeInfo.showEdit = true
        }

        const cellDBLClickEvent: VxeTableEvents.CellDblclick = ({ row }) => {
            editEvent(row)
        }

        const removeEvent = async (row: any) => {
            if (!store.state.githubAccessToken) {
                alert("please auth first")
                return
            }
            const type = await VXETable.modal.confirm('delete this info?')
            if (type === 'confirm') {
                try {
                    let theOldMaker;
                    delLoading.value = true
                    const { sha, makerList, historyMakerList } = await getMakerListData();
                    for (let i = 0; i < makerList.length; i++) {
                        if (
                            makerList[i].c1ID === row.c1ID &&
                            makerList[i].c2ID === row.c2ID &&
                            makerList[i].tName === row.tName
                        ) {
                            theOldMaker = makerList.splice(i, 1)
                            break;
                        }
                    }
                    theOldMaker[0].c1AvalibleTimes[0].endTime = Date.parse(new Date().toString()) / 1000
                    theOldMaker[0].c2AvalibleTimes[0].endTime = Date.parse(new Date().toString()) / 1000
                    historyMakerList.unshift(theOldMaker[0])
                    const newData = {
                        makerList: makerList,
                        historyMakerList: historyMakerList
                    }
                    await updateData(newData, sha);
                    showData(newData)
                    delLoading.value = false
                    await VXETable.modal.message({ content: 'delete success', status: 'success' })
                } catch (error: any) {
                    console.log(error)
                    delLoading.value = false
                    if (error.message === "Request failed with status code 401") {
                        alert("token not right，input again");
                    } else {
                        alert("net error,try again");
                    }
                }

            }
        }
        const submitEvent = async () => {
            const formData = tradeInfo.formData
            if (!formData.makerAddress || !formData.c1ID || !formData.c2ID || !formData.c1Name || !formData.c2Name ||
                !formData.t1Address || !formData.t2Address || !formData.tName || !formData.c1MinPrice || !formData.c1MaxPrice ||
                !formData.c2MinPrice || !formData.c2MaxPrice || !formData.precision || !formData.c1AvalibleDeposit ||
                !formData.c2AvalibleDeposit || !formData.c1TradingFee || !formData.c2TradingFee || !formData.c1GasFee ||
                !formData.c2GasFee! || !formData.c1StartTime || !formData.c2StartTime) {
                return
            }
            try {
                tradeInfo.submitLoading = true
                const { sha, makerList, historyMakerList } = await getMakerListData();
                const filterFormData = realFormData(formData)
                if (tradeInfo.selectRow) {
                    let historyMaker;
                    for (let i = 0; i < makerList.length; i++) {
                        if (
                            makerList[i].c1ID === filterFormData.c1ID &&
                            makerList[i].c2ID === filterFormData.c2ID &&
                            makerList[i].tName === filterFormData.tName
                        ) {
                            let timeStamp = Date.parse(new Date().toString()) / 1000
                            historyMaker = JSON.parse(JSON.stringify(makerList[i], null, " "))

                            filterFormData.c1AvalibleTimes[0].startTime = timeStamp
                            filterFormData.c2AvalibleTimes[0].startTime = timeStamp
                            makerList[i] = filterFormData;

                            historyMaker.c1AvalibleTimes[0].endTime = timeStamp - 1
                            historyMaker.c2AvalibleTimes[0].endTime = timeStamp - 1
                            historyMakerList.unshift(historyMaker)
                            break;
                        }
                    }

                } else {
                    makerList.unshift(filterFormData)
                }
                const newData = {
                    makerList: makerList,
                    historyMakerList: historyMakerList
                }
                await updateData(newData, sha);
                showData(newData)
                tradeInfo.submitLoading = false
                tradeInfo.showEdit = false
                await VXETable.modal.message({ content: 'save success', status: 'success' })
            } catch (error: any) {
                console.log(error)
                tradeInfo.submitLoading = false
                if (error.message === "Request failed with status code 401") {
                    tradeInfo.showEdit = false
                    alert("auth not right，input again");
                } else {
                    alert("net error,try again");
                }
            }
        }
        onMounted(async () => {
            getMakerList()
        })
        async function getMakerList() {
            try {
                delLoading.value = true
                const { makerList, historyMakerList } = await getMakerListData()
                tradeInfo.tableData = makerList
                tradeInfo.historyTableData = historyMakerList
                delLoading.value = false
            } catch (error) {
                delLoading.value = false
                if (error.message === "Request failed with status code 401") {
                    alert("auth not right,input again")
                }
            }

        }
        //get tradeIfno
        async function getMakerListData() {
            const res: any = await axios({
                url: `${apiUrl}/repos/anengzend/block-chain-demo/contents/data-dev.json`,
                method: "get",
                headers: {
                    Accept: "*/*",
                    Authorization: store.state.githubAccessToken ? `token ${store.state.githubAccessToken}` : "",
                },
            });
            const base64Data = res.data.content;
            const dataString = Base64.decode(base64Data);
            const data = JSON.parse(dataString);
            const makerList = data.makerList
            const historyMakerList = data.historyMakerList
            const sha = res.data.sha;
            return { sha, makerList, historyMakerList };
        }
        //edit tradeIfno
        async function updateData(data, sha: string) {
            await axios({
                url: `${apiUrl}/repos/anengzend/block-chain-demo/contents/data-dev.json`,
                method: "put",
                headers: {
                    Accept: "*/*",
                    Authorization: `token ${store.state.githubAccessToken}`,
                },
                data: {
                    message: "update from vue",
                    content: Base64.encode(JSON.stringify(data, null, " ")),
                    sha: sha,
                },
            });
        }
        function realFormData(formData) {
            const theFormData = JSON.parse(JSON.stringify(formData, null, " "))
            const c1StartTime = theFormData.c1StartTime
            const c2StartTime = theFormData.c2StartTime
            delete theFormData.c1StartTime
            delete theFormData.c2StartTime
            const filterFormData = {
                makerAddress: theFormData.makerAddress,
                c1ID: Number(theFormData.c1ID),
                c2ID: Number(theFormData.c2ID),
                c1Name: theFormData.c1Name,
                c2Name: theFormData.c2Name,
                t1Address: theFormData.t1Address,
                t2Address: theFormData.t2Address,
                tName: theFormData.tName,
                c1MinPrice: Number(theFormData.c1MinPrice),
                c1MaxPrice: Number(theFormData.c1MaxPrice),
                c2MinPrice: Number(theFormData.c2MinPrice),
                c2MaxPrice: Number(theFormData.c2MaxPrice),
                precision: Number(theFormData.precision),
                c1AvalibleDeposit: Number(theFormData.c1AvalibleDeposit),
                c2AvalibleDeposit: Number(theFormData.c2AvalibleDeposit),
                c1TradingFee: Number(theFormData.c1TradingFee),
                c2TradingFee: Number(theFormData.c2TradingFee),
                c1GasFee: Number(theFormData.c1GasFee),
                c2GasFee: Number(theFormData.c2GasFee),
                c1AvalibleTimes: [{
                    startTime: Date.parse(new Date(c1StartTime).toString()) / 1000,
                    endTime: 99999999999999
                }],
                c2AvalibleTimes: [{
                    startTime: Date.parse(new Date(c2StartTime).toString()) / 1000,
                    endTime: 99999999999999
                }]
            }
            return filterFormData
        }
        function showData(data) {
            tradeInfo.tableData = [];
            tradeInfo.historyTableData = []
            data.makerList.map((item) => {
                tradeInfo.tableData.push(item);
            });
            data.historyMakerList.map((item) => {
                tradeInfo.historyTableData.push(item);
            });
        }
        async function toAuth() {
            if (!authInfo.auth.githubAccessToken) {
                alert("token can not be empty");
                return;
            }
            store.commit("setAccessToken", authInfo.auth.githubAccessToken)
            const accessToken = AES.encrypt(authInfo.auth.githubAccessToken, 'github').toString();
            localStorage.setItem("token", accessToken);
            authInfo.showAuth = false
            await getMakerList()
        }
        return {
            githubAccessToken,
            toAuth,
            tradeInfo,
            delLoading,
            formatterDate,
            cellDBLClickEvent,
            insertEvent,
            editEvent,
            removeEvent,
            submitEvent,
            authInfo
        }
    },
})
</script>

<style lang="scss"></style>
