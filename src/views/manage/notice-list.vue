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
      <span slot="fgs" slot-scope="text">
        {{ text == '1' ? '是' : '否' }}
      </span>
      <span slot="yyzx" slot-scope="text">
        {{ text == '1' ? '是' : '否' }}
      </span>
      <span  slot="action" slot-scope="text, record">
          <a @click="handlerShowDetails(record)">详情</a>
        <a-divider type="vertical"/>
        <a-popconfirm
    title="确定删除此公告吗?"
    ok-text="Yes"
    cancel-text="No"
    @confirm="confirm(record)"
    @cancel="cancel"
  >
  <a>删除</a>
  </a-popconfirm>
          
      </span>
    </s-table>
    <CreateForm ref="createForm" @ok="$refs.table.refresh(true)" />

    <a-modal v-model="showDetailModel" title="公告" @ok="showDetailModel">
      <div v-html="details.mainText"></div>
    </a-modal>
  </a-card>
</template>

<script>
import { STable } from '@/components'
import { listNotice, createNotice,delNotice } from '@/api/manage'
import CreateForm from './modules/noticeForm.vue'
import { message } from 'ant-design-vue';
const columns = [
  {
    title: '标题',
    dataIndex: 'title'
  },
  {
    title: '创建时间',
    dataIndex: 'createTime'
  },
  {
    title: '操作',
    dataIndex: 'action',
    scopedSlots: { customRender: 'action' }
  }
]
export default {
  name: 'NoticeList',
  components: {
    STable,
    CreateForm
  },
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
        return listNotice(requestParameters).then((res) => {
          return res.data
        })
      }
    }
  },
  methods: {
    clientSave () {
      this.saveForm = {
        title: '',
        mainText: ''
      }
      this.showSaveModel = true
    },
    handleAdd () {
      createNotice(this.saveForm).then((res) => {
        this.showSaveModel = false
      })
    },
    handlerShowDetails (e) {
    //   this.showDetailModel = true
    //   this.details = e
    console.log(e)
        this.$refs.createForm.open(e)
    },
    confirm(e){
       delNotice(e.id).then((res) => {
        message.success('删除成功');
        this.$refs.table.refresh(true);
      })
    }
  },
  mounted () {}
}
</script>

<style></style>
