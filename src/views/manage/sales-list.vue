<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <!-- <a-col :md="8" :sm="24">
            <a-form-item label="会员手机号码">
              <a-input v-model="queryParam.phone" placeholder=""/>
            </a-form-item>
          </a-col> -->
          <!-- <a-col :md="8" :sm="24">
            <a-form-item label="使用状态">
              <a-select v-model="queryParam.status" placeholder="请选择" default-value="0">
                <a-select-option value="0">全部</a-select-option>
                <a-select-option value="1">关闭</a-select-option>
                <a-select-option value="2">运行中</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <template v-if="advanced">
            <a-col :md="8" :sm="24">
              <a-form-item label="调用次数">
                <a-input-number v-model="queryParam.callNo" style="width: 100%"/>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="更新日期">
                <a-date-picker v-model="queryParam.date" style="width: 100%" placeholder="请输入更新日期"/>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="使用状态">
                <a-select v-model="queryParam.useStatus" placeholder="请选择" default-value="0">
                  <a-select-option value="0">全部</a-select-option>
                  <a-select-option value="1">关闭</a-select-option>
                  <a-select-option value="2">运行中</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="使用状态">
                <a-select placeholder="请选择" default-value="0">
                  <a-select-option value="0">全部</a-select-option>
                  <a-select-option value="1">关闭</a-select-option>
                  <a-select-option value="2">运行中</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </template> -->
          <!-- <a-col :md="!advanced && 8 || 24" :sm="24">
            <span class="table-page-search-submitButtons" :style="advanced && { float: 'right', overflow: 'hidden' } || {} ">
              <a-button type="primary" @click="$refs.table.refresh(true)">查询</a-button>
              <a-button style="margin-left: 8px" @click="() => this.queryParam = {}">重置</a-button>
              <a @click="toggleAdvanced" style="margin-left: 8px">
                {{ advanced ? '收起' : '展开' }}
                <a-icon :type="advanced ? 'up' : 'down'"/>
              </a>
            </span>
          </a-col> -->
        </a-row>
      </a-form>
    </div>

    <div class="table-operator">
      <a-button type="primary" icon="plus" @click="handleAdd">创建</a-button>
    </div>

    <s-table
      ref="table"
      size="default"
      rowKey="key"
      :columns="columns"
      :data="loadData"
      showPagination="auto"
      :scroll="{ x: 'max-content' }"
      bordered>
      <!-- <span slot="fgs" slot-scope="text">
        {{ text == '1' ? '是' : '否' }}
      </span>
      <span slot="yyzx" slot-scope="text">
        {{ text == '1' ? '是' : '否' }}
      </span> -->
      <!-- <span slot="action" slot-scope="text, record">
        <template>
          <a @click="handleEdit(record)">编辑</a>
          <a-popconfirm title="确认删除本条记录?" ok-text="确定" cancel-text="取消" @confirm="handleDel(record)">
            <a style="margin-left: 20px;">删除</a>
          </a-popconfirm>
        </template>
      </span> -->
    </s-table>

    <create-sales-form ref="createModal" @ok="$refs.table.refresh(true)" />
  </a-card>
</template>

<script>
// import moment from 'moment'
import { STable, Ellipsis } from '@/components'
import { salesList, delSales } from '@/api/manage'

import CreateSalesForm from './modules/CreateSalesForm'

const columns = [
  {
    title: '执行日期', // 是什么日期？
    dataIndex: 'id'
  },
  {
    title: '业绩金额',
    dataIndex: 'totalAmount'
  }
  // {
  //   title: '操作',
  //   dataIndex: 'action',
  //   scopedSlots: { customRender: 'action' }
  // }
]

export default {
  name: 'TableList',
  components: {
    STable,
    Ellipsis,
    CreateSalesForm
  },
  data () {
    this.columns = columns
    return {
      // 高级搜索 展开/关闭
      advanced: false,
      // 查询参数
      queryParam: {},
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        const requestParameters = Object.assign({}, parameter, this.queryParam)
        console.log('loadData request parameters:', requestParameters)
        return salesList(requestParameters)
          .then(res => {
            return res.data
          })
      }
    }
  },
  methods: {
    handleAdd () {
      this.$refs.createModal.open({})
    },
    handleEdit (record) {
      this.$refs.createModal.open(record)
    },
    handleDel (record) {
      delSales({ id: record.id }).then(res => {
        this.$refs.table.refresh(true)
      })
    },
    toggleAdvanced () {
      this.advanced = !this.advanced
    }
  }
}
</script>
