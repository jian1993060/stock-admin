<template>
  <a-modal
    :title="ruleForm && ruleForm.id ? '编辑业绩' : '新增业绩'"
    :width="640"
    :visible="visible"
    :confirmLoading="loading"
    @ok="confirmHandler"
    @cancel="cancelHandler"
  >
    <a-spin :spinning="loading">
      <a-form-model
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
        :label-col="{ span: 5 }"
        :wrapper-col="{ span: 15 }"
      >
        <a-form-model-item label="执行日期" prop="id" v-if="!(ruleForm && ruleForm.id)">
          <a-date-picker @change="onChange" v-model="ruleForm.id" allow-clear style="width: 100%" />
        </a-form-model-item>
        <a-form-model-item label="业绩金额" prop="totalAmount">
          <a-input v-model="ruleForm.totalAmount" placeholder="请输入业绩金额" allowClear></a-input>
        </a-form-model-item>
      </a-form-model>
    </a-spin>
  </a-modal>
</template>

<script>
import { createSales } from '@/api/manage'
import moment from 'moment'

export default {
  data () {
    return {
      visible: false,
      loading: false,
      ruleForm: {},
      rules: {
        id: [{ required: true, message: '请选择执行日期', trigger: 'change' }],
        totalAmount: [{ required: true, message: '请输入业绩金额', trigger: 'blur' }]
      }
    }
  },
  methods: {
    onChange (val) {
      this.ruleForm.id = moment(val).format('YYYY-MM-DD')
    },
    open (record) {
      this.ruleForm = record
      this.visible = true
      setTimeout(() => {
        this.$refs.ruleForm.clearValidate()
      }, 100)
    },
    cancelHandler () {
      this.visible = false
    },
    confirmHandler () {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          const data = Object.assign({}, this.ruleForm)
          data.id = moment(this.ruleForm.id).format('YYYYMMDD')
          this.loading = true
          createSales(data)
            .then(() => {
              this.loading = false
              this.$notification.success({
                message: '成功提示',
                description: `创建业绩成功`
              })
              this.visible = false
              this.$emit('ok')
            })
            .catch(() => {
              this.loading = false
            })
        }
      })
    }
  }
}
</script>
