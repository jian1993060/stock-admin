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
          <a-col :md="!advanced && 8 || 24" :sm="24">
            <span class="table-page-search-submitButtons" :style="advanced && { float: 'right', overflow: 'hidden' } || {} ">
              <a-button type="primary" @click="$refs.table.refresh(true)">查询</a-button>
              <a-button style="margin-left: 8px" @click="() => this.queryParam = {}">重置</a-button>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <!-- <div class="table-operator">
      <a-button @click="showModal" type="primary">导出</a-button>
    </div> -->
    <s-table
      ref="table"
      size="default"
      rowKey="key"
      :columns="columns"
      :data="loadData"
      showPagination="auto"
      :scroll="{ x: 'max-content' }"
      bordered
    >
    <span slot="img" slot-scope="text, record">
          <img :src="record.img" style="width: 64px; height: 64px" />
    </span>
      <span slot="czImg" slot-scope="text, record">
        <a @click="showCzImgModel(record)">查看充值截图</a>
      </span>
      <span slot="action" slot-scope="text, record">
        <!-- status == 1 -->
        <a v-if="record.status != '1'" @click="showReviewModal(record)">{{ record.status == '3'?'审核':'重新审核' }}</a>
        <a-divider v-if="record.status == '3'" type="vertical" />
        <a @click="showCzImgModel(record)">查看充值截图</a>
      </span>
    </s-table>

    <a-modal title="充值截图" :visible="visibleQrcode" @ok="visibleQrcode = false" @cancel="visibleQrcode = false">
      <img :src="selectQrcode" style="width: 100%" />
    </a-modal>

    <a-modal
      title="充值审核"
      :visible="reviewVisible"
      @ok="submitReviewHandler"
      @cancel="reviewVisible = false"
      :confirmLoading="confirmLoading"
    >
      <a-form-model :model="reviewParams" :label-col="{ span: 4 }" :wrapper-col="{ span: 14 }">
        <a-form-model-item label="审核状态" prop="status" :rules="{ required: true }">
          <a-radio-group v-model="reviewParams.status">
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
// import moment from 'moment'
import { STable } from '@/components'
import { rechargeList, rechargeReview, typeInfo } from '@/api/manage'
import moment from 'moment'
const columns = [
  {
    title: 'UID',
    dataIndex: 'userId'
  },
  {
    title: '类型',
    dataIndex: 'type'

  },
  {
      title: '充值截图',
      dataIndex: 'img',
      scopedSlots: { customRender: 'img' }
    },
  {
    title: '充值金额',
    dataIndex: 'amount'
  },
  {
    title: '充值时间',
    dataIndex: 'createTime'
  },
  {
    title: '审核状态',
    dataIndex: 'status',
    customRender: (text) => (text === '1' ? '审核通过' : text === '3' ? '待审核' : '审核驳回')
  },
  {
    title: '操作',
    dataIndex: 'action',
    width: '200px',
    scopedSlots: { customRender: 'action' }
  }
]

export default {
  components: {
    STable
  },
  data () {
    this.columns = columns
    return {
      exports: {},
      visible: false,
      // 高级搜索 展开/关闭
      advanced: false,
      visibleQrcode: false,
      selectQrcode: '',
      // 查询参数
      queryParam: {},
      // 加载数据方法 必须为 Promise 对象
      loadData: (parameter) => {
        const requestParameters = Object.assign({}, parameter, this.queryParam)
        console.log('loadData request parameters:', requestParameters)
        return rechargeList(requestParameters).then((res) => {
          return res.data
        })
      },
      reviewVisible: false,
      reviewParams: {
        status: ''
      },
      confirmLoading: false,
      reason: ''
    }
  },
  created () {
    typeInfo().then((res) => {
        console.log(res, 'typeInfo')
    })
  },
  methods: {
      // 导出
    handleOk () {
      // rechargeReview(this.exports).then(() => {
      //   this.visible = false
      // })
      // .catch(() => {
      // })
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
    handleAdd () {
      this.$refs.createModal.open({})
    },
    handleEdit (record) {
      this.$refs.createModal.open(record)
    },
    toggleAdvanced () {
      this.advanced = !this.advanced
    },
    showCzImgModel (item) {
    //   this.selectQrcode = item.czImg
    //   this.visibleQrcode = true
        this.$viewerApi({
            images: [item.img]
        })
    },
    showReviewModal (record) {
      this.reviewParams.id = record.id
      this.reviewParams.status = '1'
      this.reviewVisible = true
    },
    submitReviewHandler () {
      this.confirmLoading = true
      rechargeReview(this.reviewParams).then(() => {
        this.$notification.success({
          message: '成功提示',
          description: `操作成功`
        })
        this.reviewVisible = false
        this.confirmLoading = false
        this.$refs.table.refresh(true)
      })
      .catch(() => {
        this.confirmLoading = false
      })
    }
  }
}
</script>
