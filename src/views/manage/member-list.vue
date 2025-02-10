<template>
  <a-card :bordered="false">

    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col :md="4" :sm="24">
            <a-form-item label="会员邮箱">
              <a-input v-model="queryParam.email" allow-clear />
            </a-form-item>
          </a-col>
          <a-col :md="4" :sm="24">
              <a-form-item label="实名状态">
                <a-select v-model="queryParam.status" placeholder="请选择" default-value="0">
                  <a-select-option value="1">已实名</a-select-option>
                  <a-select-option value="2">未实名</a-select-option>
                </a-select>
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
          <a-col :md="!advanced && 8 || 24" :sm="24">
            <span class="table-page-search-submitButtons"
              :style="advanced && { float: 'right', overflow: 'hidden' } || {}">
              <a-button type="primary" @click="$refs.table.refresh(true)">查询</a-button>
              <a-button style="margin-left: 8px" @click="() => this.queryParam = {}">重置</a-button>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>

    <!-- <div class="table-operator">
      <a-button type="primary" icon="plus" @click="handleAdd">创建</a-button>
    </div> -->

    <s-table ref="table" size="default" rowKey="id" :columns="columns" :data="loadData" showPagination="auto"
      :scroll="{ x: 'max-content' }" bordered>
      <span slot="fgs" slot-scope="text">
        {{ text == '1' ? '是' : '否' }}
      </span>
      <span slot="yyzx" slot-scope="text">
        {{ text == '1' ? '是' : '否' }}
      </span>
      <span slot="action" slot-scope="text, record">
        <!-- <template>
          <a @click="handleEdit(record)">编辑</a>
        </template> -->
        <template>
          <a @click="modifyLevel(record)">修改等级</a>
        </template>
        <a-divider type="vertical" />
        <a-popconfirm title="是否改变该用户状态？" ok-text="Yes" cancel-text="No" @confirm="confirm(record)">
          <a>{{ record.status == '2' ? '解冻' : '冻结' }}</a>
        </a-popconfirm>
      </span>
    </s-table>
    <a-modal title="修改用户收益" :visible="upVisible" :confirm-loading="confirmLoading" @ok="handleOk" @cancel="handleCancel">
      <a-form-model :model="upUserModel">
        <a-form-model-item label="推荐收益">
          <a-select v-model="upUserModel.tjsy" placeholder="请选择推荐收益">
            <a-select-option value="1">
              是
            </a-select-option>
            <a-select-option value="2">
              否
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item label="分红收益">
          <a-select v-model="upUserModel.fhsy" placeholder="请选择分红收益">
            <a-select-option value="1">
              是
            </a-select-option>
            <a-select-option value="2">
              否
            </a-select-option>
          </a-select>
        </a-form-model-item>
      </a-form-model>
    </a-modal>
    <a-modal :visible="editLevel" title="修改等级" @ok="handleOks()" @cancel="handleCancels">
      <a-form :model="formState">
        <a-form-item label="选择等级">
          <a-select v-model="formState.level"  placeholder="please select your zone">
            <a-select-option  v-for="item in level" :key="item.value" :value=item.value>{{ item.label }}</a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-modal>
    <create-member-form ref="createModal" @ok="$refs.table.refresh(true)" />

  </a-card>
</template>

<script>
// import moment from 'moment'
import { STable, Ellipsis } from '@/components'
import { memberList, createOrUpdateMember, upUserStatus, userUpdate } from '@/api/manage'
import { message } from 'ant-design-vue';
import moment from 'moment'
import CreateMemberForm from './modules/CreateMemberForm'

const columns = [
{
    title: 'uid',
    dataIndex: 'id'
  }, 
  {
    title: '邮箱',
    dataIndex: 'email'
  }, 
  {
    title: '余额',
    dataIndex: 'amount'
  },
  {
    title: '状态',
    dataIndex: 'realStatus',
    customRender: (text) => (text === '1' ? '实名' : '未实名')
  },

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
      editLevel: false,
      formState: {
        level: "0",
        id:''
      },
      confirmLoading: false,
      upVisible: false,
      // 高级搜索 展开/关闭
      advanced: false,
      // 查询参数
      queryParam: {},
      upUserModel: {
        tjsy: '1',
        fhsy: '1',
        id: ''
      },
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        const requestParameters = Object.assign({}, parameter, this.queryParam)
        console.log('loadData request parameters:', requestParameters)
        return memberList(requestParameters)
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
    }  
     
  }
}
</script>
