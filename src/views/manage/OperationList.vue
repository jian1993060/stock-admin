<template>
    <a-card :bordered="false">
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="4" :sm="24">
              <a-form-item label="开始日期">
                <a-date-picker
                  v-model.trim="queryParam.startDate"
                  placeholder="开始日期"
                  format="YYYY-MM-DD"
                  value-format="YYYY-MM-DD"
                  allowClear
                >
                </a-date-picker>
              </a-form-item>
            </a-col>
            <a-col :md="4" :sm="24">
              <a-form-item label="结束日期">
                <a-date-picker
                  v-model.trim="queryParam.endDate"
                  placeholder="结束日期"
                  format="YYYY-MM-DD"
                  value-format="YYYY-MM-DD"
                  :disabled-date="disabledDate"
                  allowClear
                >
                </a-date-picker>
              </a-form-item>
            </a-col>
            <a-col :md="(!advanced && 8) || 24" :sm="24">
              <span
                class="table-page-search-submitButtons"
                :style="(advanced && { float: 'right', overflow: 'hidden' }) || {}"
              >
                <a-button type="primary" @click="$refs.table.refresh(true)">查询</a-button>
                <a-button style="margin-left: 8px" @click="() => (this.queryParam = {})">重置</a-button>
              </span>
            </a-col>
          </a-row>
        </a-form>
      </div>
      <s-table
        ref="table"
        size="default"
        rowKey="key"
        :columns="columns"
        :data="loadData"
        showPagination="auto"
        bordered>
      </s-table>
    </a-card>
  </template>
  
  <script>
  // import moment from 'moment'
  import { STable, Ellipsis } from '@/components'
  import { OperationRecords } from '@/api/manage'
  import ExcelModule from './modules/excel.vue'
  import moment from 'moment'
  // import CreateForm from './modules/CreateForm'
  
  const columns = [
    {
      title: '操作人',
      dataIndex: 'name'
    },
    {
      title: '操作时间',
      dataIndex: 'createTime'
    },
    {
      title: '操作类型',
      dataIndex: 'type'
    },
    {
      title: '操作结果',
      dataIndex: 'result',
      customRender:function (text) {
            switch (text) {
              case '1':
                return '成功';
              case '2':
                return '失败';
            }
          }
    },
    {
      title: '金额',
      dataIndex: 'amount'
    },
    {
      title: '操作内容',
      dataIndex: 'info',
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
    data () {
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
          return OperationRecords(requestParameters).then((res) => {
            return res.data
          })
        }
      }
    },
    methods: {
      handleCancel () {
        this.visible = false
      },
      disabledDate (current) {
        if (this.queryParam.startDate) {
          return current < moment(this.queryParam.startDate)
        }
      },
      disabledDates (current) {
        if (this.exports.startDate) {
          return current < moment(this.exports.startDate)
        }
      },
      showModal () {
        this.visible = true
      },
      handleAdd () {
        this.$refs.createModal.open({})
      },
      handleEdit (record) {
        this.$refs.createModal.open(record)
      },
      toggleAdvanced () {
        this.advanced = !this.advanced
      }
    }
  }
  </script>
  