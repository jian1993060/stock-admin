<template>
    <a-card :bordered="false">
  
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="8" :sm="10 ">
              <a-form-item label="股票代码">
                <a-input v-model="queryParam.id" allow-clear />
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="10">
              <a-form-item label="股票名称">
                <a-input v-model="queryParam.name" allow-clear />
              </a-form-item>
            </a-col>
            
            <a-col :md="!advanced && 8 || 24" :sm="40">
              <span class="table-page-search-submitButtons"
                :style="advanced && { float: 'right', overflow: 'hidden' } || {}">
                <a-button type="primary" @click="$refs.table.refresh(true)">查询</a-button>
                <a-button style="margin-left: 8px" @click="() => this.queryParam = {}">重置</a-button>
                <a-button style="margin-left: 8px" @click=addStock()>添加股票</a-button>
              </span>
            </a-col>
          </a-row>
        </a-form>
      </div>
  
      <s-table ref="table" size="default" rowKey="id" :columns="columns" :data="loadData" showPagination="auto"
        :scroll="{ x: 'max-content' }" bordered>
        <span slot="fgs" slot-scope="text">
          {{ text == '1' ? '是' : '否' }}
        </span>
        <span slot="yyzx" slot-scope="text">
          {{ text == '1' ? '是' : '否' }}
        </span>
        <span slot="action" slot-scope="text, record">
        
        
          <a-popconfirm title="是否改变股票上架状态" ok-text="Yes" cancel-text="No" @confirm="updateStatus(record)">
            <a>{{ record.status == '2' ? '上架' : '下架' }}</a>
          </a-popconfirm>
          
          <a-divider type="vertical" />
          <a-popconfirm title="是否改变股票热门状态" ok-text="Yes" cancel-text="No" @confirm="updateHot(record)">
            <a>{{ record.hot == '2' ? '热门展示' : '取消热门' }}</a>
          </a-popconfirm>
          <a-divider type="vertical" />
        </span>
      </s-table>

      <a-modal :visible="upVisible" title="增加股票" @ok="handleOk()" @cancel="handleCancel">
      <a-form :model="formState">
        <a-form-item label="代码">
          <a-input v-model="formState.code" />
        </a-form-item>
        <a-form-item label="名称">
          <a-input v-model="formState.name" />
        </a-form-item>
      </a-form>
    </a-modal>
  
    </a-card>
  </template>
  
  <script>
  // import moment from 'moment'
  import { STable, Ellipsis } from '@/components'
  import { stockList,updateStockStatus,updateStockHot,addStockApi} from '@/api/manage'
  import moment from 'moment'
  import CreateMemberForm from './modules/CreateMemberForm'
  
  const columns = [
  {
      title: '股票代码',
      dataIndex: 'id'
    }, 
    {
      title: '股票名称',
      dataIndex: 'name'
    }, 
    {
      title: '股票类型',
      dataIndex: 'type',
      customRender: (text) => (text === 'us' ? '美股' : 'A股')
    },
    {
      title: '上架',
      dataIndex: 'status',
      customRender: (text) => (text === '1' ? '是' : '否')
    },
    {
      title: '热门',
      dataIndex: 'hot',
      customRender: (text) => (text === '1' ? '是' : '否')
    },
    {
      title: '操作',
      dataIndex: 'action',
      width: '200px',
      scopedSlots: { customRender: 'action' }
    }
  
  ]
  
  export default {
    name: 'TableList',
    components: {
      STable,
      Ellipsis,
      CreateMemberForm
    },
    data() {
      this.columns = columns
      return {   
         // 高级搜索 展开/关闭
        advanced: false,
        // 查询参数
        queryParam: {},
        upVisible: false, 
        formState: {
          id: '',
          name: ''
        },
        // 加载数据方法 必须为 Promise 对象
        loadData: parameter => {
          const requestParameters = Object.assign({}, parameter, this.queryParam)
          console.log('loadData request parameters:', requestParameters)
          return stockList(requestParameters)
            .then(res => {
              return res.data
            })
        }
      }
    },
    methods: {    
      disabledDate(current) {
        if (this.queryParam.startDate) {
          return current < moment(this.queryParam.startDate)
        }
      },
      updateStatus(record) {   
        updateStockStatus(record.id).then(() => {
          this.$message.success('操作成功')
          this.$refs.table.refresh(true)
        })
      },
      updateHot(record) {
         updateStockHot(record.id).then(() => {
          this.$message.success('操作成功')
          this.$refs.table.refresh(true)
        })
      },
      addStock(){
        this.upVisible = true
      },
      handleOk(){
        addStockApi(this.formState).then(() => {
          this.upVisible = false
          this.formState = {}
          this.$message.success('操作成功')
          this.$refs.table.refresh(true)
        })
      },
      handleCancel(){
        this.upVisible = false
        this.formState = {}
      }
       
    }
  }
  </script>
  