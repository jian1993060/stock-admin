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
            <!-- <a-col :md="8" :sm="24">
              <a-form-item label="规则编号">
                <a-input v-model="queryParam.id" placeholder=""/>
              </a-form-item>
            </a-col> -->
            <a-col :md="4" :sm="24">
              <a-form-item label="审核状态">
                <a-select v-model="queryParam.status" placeholder="请选择" default-value="0">
                  <a-select-option value="3">待审核</a-select-option>
                  <a-select-option value="1">审核通过</a-select-option>
                  <a-select-option value="2">审核拒绝</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="(!advanced && 4) || 24" :sm="24">
              <span
                class="table-page-search-submitButtons"
                :style="(advanced && { float: 'right', overflow: 'hidden' }) || {}">
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
        <span slot="url" slot-scope="text, record, index">
          {{ index + 1 }}
        </span>
     
        <span slot="img" slot-scope="text, record">
          <img :src="record.img" style="width: 64px; height: 64px" />
        </span>
       
        <span slot="action" slot-scope="text, record">
          <a v-if="record.status == '3'" @click="showReviewModal(record)">审核</a>
          <a-divider v-if="record.status == '3'" type="vertical" />
          <a @click="showCzImgModel(record)">查看身份证</a>
        </span>
      </s-table>
      <a-modal
        title="提现审核"
        :visible="reviewVisible"
        @ok="withdrawHandler()"
        @cancel="reviewVisible = false"
        :confirmLoading="confirmLoading"
      >
      <a-form-model :model="reviewParams" :label-col="{ span: 4 }" :wrapper-col="{ span: 14 }">
          <a-form-model-item label="审核状态" prop="status" :rules="{ required: true }">
            <a-radio-group v-model="reviewParams.status">
              <!-- 1 2 3对应通过 未审核  驳回 -->
              <a-radio value="1"> 通过 </a-radio>
              <a-radio value="2"> 驳回 </a-radio>
            </a-radio-group>
          </a-form-model-item>
          <a-form-model-item v-if="reviewParams.status == 2" label="驳回理由" prop="info" :rules="{ required: true }">
            <a-input v-model="reviewParams.info" allow-clear />
          </a-form-model-item>
        </a-form-model>
      </a-modal>
    </a-card>
  </template>
  
  <script>
  import moment from 'moment'
  import { STable } from '@/components'
  import { realList, realFinish } from '@/api/manage'
  
  const columns = [
    {
      title: 'uid',
      dataIndex: 'userId'
    },
    {
      title: '姓名',
      dataIndex: 'name',
    },
    {
      title: '身份证号码',
      dataIndex: 'idNo'
    },
    {
      title: '银行卡',
      dataIndex: 'bankNo'
    },
    {
      title: '身份证图片',
      dataIndex: 'img',
      scopedSlots: { customRender: 'img' }
      // customRender: (text) => text + ' 次'
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      sorter: true
    },
    {
      title: '审核状态',
      dataIndex: 'status',
      customRender: (text) => (text === '1' ? '审核通过' : text === '3' ? '待审核' : '审核驳回')
    },
    {
      title: '操作',
      dataIndex: 'action',
      width: '120px',
      scopedSlots: { customRender: 'action' }
    }
  ]
  
  export default {
    name: 'RealList',
    components: {
      STable
    },
    data () {
      this.columns = columns
      return {
        exports: {},
        visible: false,
        visibleQrcode: false,
        selectQrcode: '',
        // 高级搜索 展开/关闭
        advanced: false,
        // 查询参数
        queryParam: {},
        // 加载数据方法 必须为 Promise 对象
        loadData: (parameter) => {
          const requestParameters = Object.assign({}, parameter, this.queryParam)
          console.log('loadData request parameters:', requestParameters)
          return realList(requestParameters).then((res) => {
            return res.data
          })
        },
        reviewParams: {
          status: ''
        },
        confirmLoading: false,
        reviewVisible: false,
        reason: '' // 驳回理由
      }
    },
    methods: {
        // 导出
      handleOk () {
        console.log(this.exports)
      },
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
      showReviewModal (record) {
        this.reviewParams.id = record.id
        this.reviewParams.status = '1'
        this.reviewVisible = true
      },
      showCzImgModel (item) {
        this.$viewerApi({
            images: [item.img]
        })
    },
      
      withdrawHandler () {
        realFinish(this.reviewParams).then(() => {
          this.$notification.success({
            message: '成功提示',
            description: `操作成功`
          })
          this.reviewVisible = false
          this.confirmLoading = false
          this.$refs.table.refresh(true)
        })
      },
      toggleAdvanced () {
        this.advanced = !this.advanced
      },
      resetSearchForm () {
        this.queryParam = {
          date: moment(new Date())
        }
      }
    }
  }
  </script>
  