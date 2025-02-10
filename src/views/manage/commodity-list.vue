<template>
  <a-card :bordered="false">
    <div class="table-operator">
      <a-button type="primary" icon="plus" @click="$refs.createForm.open({})">创建</a-button>
    </div>

    <s-table
      ref="table"
      size="default"
      rowKey="id"
      :columns="columns"
      :data="loadData"
      showPagination="auto"
      :scroll="{ x: 'max-content' }"
      bordered
    >
      <span slot="action" slot-scope="text, record">
        <template>
          <a @click="handlerShowDetails(record)">编辑</a>
          <a @click="handlerDel(record)" style="margin-left: 20px">删除</a>
        </template>
      </span>

      <span slot="icon" slot-scope="text, record">
        <img :src="record.icon" style="width: 64px; height: 64px" />
      </span>
    </s-table>
    <SaveCommodity ref="createForm" @ok="$refs.table.refresh(true)" />
  </a-card>
</template>

<script>
import { STable } from '@/components'
import CreateForm from '@/views/manage/modules/noticeForm.vue'
import { listProduct, delProduct } from '@/api/manage'
import SaveCommodity from '@/views/manage/modules/SaveCommodity.vue'

const columns = [
  {
    title: '商品名称',
    dataIndex: 'name'
  },
  {
    title: '商品价格',
    dataIndex: 'price'
  },
  {
    title: '商品描述',
    dataIndex: 'productDesc'
  },
  {
    title: '商品图片',
    dataIndex: 'icon',
    scopedSlots: { customRender: 'icon' }
  },
  {
    title: '贡献值',
    dataIndex: 'gxz'
  },
  {
    title: '操作',
    dataIndex: 'action',
    scopedSlots: { customRender: 'action' }
  }
]

export default {
  name: 'CommodityList',
  components: { SaveCommodity, CreateForm, STable },
  data () {
    return {
      columns,
      tableData: [],
      showSaveModel: false,
      saveForm: {
        title: '',
        mainText: ''
      },
      showDetailModel: false,
      details: {
        title: '',
        mainText: ''
      },
      // 加载数据方法 必须为 Promise 对象
      loadData: (parameter) => {
        const requestParameters = Object.assign({}, parameter, this.queryParam)
        console.log('loadData request parameters:', requestParameters)
        return listProduct(requestParameters).then((res) => {
          return res.data
        })
      }
    }
  },
  methods: {
    handlerDel (item) {
      delProduct(item).then(res => {
        this.$refs.table.refresh(true)
      })
    },
    clientSave () {
      this.saveForm = {
        title: '',
        mainText: ''
      }
      this.showSaveModel = true
    },
    handlerShowDetails (e) {
      //   this.showDetailModel = true
      //   this.details = e
      this.$refs.createForm.open(e)
    }
  },
  mounted () {}
}
</script>

<style scoped>

</style>
