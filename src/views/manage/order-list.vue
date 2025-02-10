<template>
  <a-card :bordered="false">
    
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
         
          <a-col :md="4" :sm="24">
            <a-form-item label="uid">
              <a-input v-model="queryParam.userId" allow-clear />
            </a-form-item>
          </a-col>
          <a-col :md="4" :sm="24">
            <a-form-item label="开始日期">
              <a-date-picker v-model.trim="queryParam.startDate" placeholder="开始日期" format="YYYY-MM-DD"
                value-format="YYYY-MM-DD" allowClear>
              </a-date-picker>
            </a-form-item>
          </a-col>
          <a-col :md="4" :sm="24">
            <a-form-item label="结束日期">
              <a-date-picker v-model.trim="queryParam.endDate" placeholder="结束日期" format="YYYY-MM-DD"
                value-format="YYYY-MM-DD" :disabled-date="disabledDate" allowClear>
              </a-date-picker>
            </a-form-item>
          </a-col>
          <a-col :md="(!advanced && 8) || 24" :sm="24">
            <span class="table-page-search-submitButtons"
              :style="(advanced && { float: 'right', overflow: 'hidden' }) || {}">
              <a-button type="primary" @click="$refs.table.refresh(true)">查询</a-button>
              <a-button style="margin-left: 8px" @click="() => (this.queryParam = {})">重置</a-button>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>
    
    <a-modal :visible="visible" title="选择导出日期" @cancel="handleCancel" @ok="handleOk">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col :md="12" :sm="24">
            <a-form-item label="开始日期">
              <a-date-picker v-model.trim="exports.startDate" placeholder="开始日期" format="YYYY-MM-DD"
                value-format="YYYY-MM-DD" allowClear>
              </a-date-picker>
            </a-form-item>
          </a-col>
          <a-col :md="12" :sm="24">
            <a-form-item label="结束日期">
              <a-date-picker v-model.trim="exports.endDate" placeholder="结束日期" format="YYYY-MM-DD"
                value-format="YYYY-MM-DD" :disabled-date="disabledDates" allowClear>
              </a-date-picker>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-modal>
    <s-table ref="table" size="default" rowKey="key" :columns="columns" :data="loadData" showPagination="auto" bordered>
      <span slot="contractImg" slot-scope="text">
        <a target="_blank" :href="text">查看合同</a>
        <a-divider type="vertical" />
        <a target="_blank" @click="preview(text)">预览合同</a>
      </span>
    </s-table>
    <!-- <iframe src="https://66manage.org/file/17016e10-d215-4d18-b07f-629a94104520.docx"></iframe> -->

    <!-- <create-form ref="createModal" @ok="$refs.table.refresh()" /> -->
  </a-card>
</template>

<script>
// import moment from 'moment'
import { STable, Ellipsis } from '@/components'
import { orderList } from '@/api/manage'
import ExcelModule from './modules/excel.vue'
import moment from 'moment'
// import CreateForm from './modules/CreateForm'

const columns = [
  {
    title: 'uid',
    dataIndex: 'userId'
  },
  {
    title: '买入/卖出',
    dataIndex: 'type'
  },
  {
    title: '数量',
    dataIndex: 'num'
  },
  {
    title: '金额',
    dataIndex: 'amount'
  },
  {
    title: '股票代码',
    dataIndex: 'code'
  },
  {
    title: '日期',
    dataIndex: 'createTime'
  }
]

export default {
  name: 'TableList',
  components: {
    STable,
    Ellipsis,
    ExcelModule
    // CreateForm
  },
  data() {
    this.columns = columns
    return {
      visible: false,
      // 高级搜索 展开/关闭
      advanced: false,
      // 查询参数
      queryParam: {},
      exports: {},
      // 加载数据方法 必须为 Promise 对象
      loadData: (parameter) => {
        const requestParameters = Object.assign({}, parameter, this.queryParam)
        console.log('loadData request parameters:', requestParameters)
        return orderList(requestParameters).then((res) => {
          return res.data
        })
      }
    }
  },
  methods: {
    // 导出
    handleOk() {
      // rechargeReview(this.exports).then(() => {
      //   this.visible = false
      // })
      // .catch(() => {
      // })
      console.log(this.exports)
    },
    handleCancel() {
      this.visible = false
    },
    disabledDate(current) {
      if (this.queryParam.startDate) {
        return current < moment(this.queryParam.startDate)
      }
    },
    disabledDates(current) {
      if (this.exports.startDate) {
        return current < moment(this.exports.startDate)
      }
    },
    showModal() {
      this.visible = true
    },
    // 预览合同
    preview(text) {
      let url = encodeURIComponent(text)
      let officeUrl = 'http://view.officeapps.live.com/op/view.aspx?src=' + url
      // 在新窗口打开编码后 的链接
      window.open(officeUrl, '_target')

      // window.open(`https://view.xdocin.com/view?src=${text}`)
    },
    handleAdd() {
      this.$refs.createModal.open({})
    },
    handleEdit(record) {
      this.$refs.createModal.open(record)
    },
    toggleAdvanced() {
      this.advanced = !this.advanced
    }
  }
}
</script>
