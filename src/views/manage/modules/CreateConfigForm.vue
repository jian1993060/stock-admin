<template>
  <a-modal
    :title="ruleForm && ruleForm.id ? '编辑会员' : '新增会员'"
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
        <a-form-model-item label="会员名称" prop="name">
          <a-input v-model="ruleForm.name" placeholder="请输入会员名称" allowClear></a-input>
        </a-form-model-item>
        <a-form-model-item label="会员手机号码" prop="phone">
          <a-input v-model="ruleForm.phone" placeholder="请输入会员手机号码" allowClear></a-input>
        </a-form-model-item>
        <a-form-model-item label="最小提现金额" prop="minTx">
          <a-input-number v-model="ruleForm.minTx" :min="0" />
        </a-form-model-item>
        <a-form-model-item label="会员等级" prop="userLevel">
          <a-select v-model="ruleForm.userLevel" allowClear placeholder="请选择会员等级">
            <a-select-option v-for="item in userLevelArr" :value="item.value" :key="item.value">
              {{ item.label }}
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item label="推荐人" prop="tjr">
          <a-input v-model="ruleForm.tjr" placeholder="请输入推荐人" allowClear></a-input>
        </a-form-model-item>
        <a-form-model-item label="运营中心" prop="yyzx">
          <a-radio-group v-model="ruleForm.yyzx" default-value="2">
            <a-radio value="1"> 是 </a-radio>
            <a-radio value="2"> 否 </a-radio>
          </a-radio-group>
        </a-form-model-item>
        <a-form-model-item label="分公司" prop="fgs">
          <a-radio-group v-model="ruleForm.fgs" default-value="2">
            <a-radio value="1"> 是 </a-radio>
            <a-radio value="2"> 否 </a-radio>
          </a-radio-group>
        </a-form-model-item>
      </a-form-model>
    </a-spin>
  </a-modal>
</template>

<script>
import { createOrUpdateMember } from '@/api/manage'
import { userLevelArr } from '../const'

export default {
  data () {
    return {
      visible: false,
      loading: false,
      ruleForm: {},
      rules: {
        name: [{ required: true, message: '请输入会员名称', trigger: 'blur' }],
        phone: [
          { required: true, message: '请输入会员手机号码', trigger: 'blur' },
          { pattern: /^1[34578]\d{9}$/, message: '请输入正确的手机号码' }
        ],
        userLevel: [{ required: true, message: '请选择会员等级', trigger: 'change' }],
        yyzx: [{ required: true, message: '请选择运营中心' }],
        fgs: [{ required: true, message: '请选择分公司' }],
        tjr: [{ required: true, message: '请输入推荐人', trigger: 'blur' }],
        minTx: [{ required: true, message: '请输入最小提现金额' }]
      },
      userLevelArr
    }
  },
  methods: {
    open (record) {
      if (record.trj) record.trj = record.trj + ''
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
          this.loading = true
          createOrUpdateMember(this.ruleForm)
            .then(() => {
              this.loading = false
              this.$notification.success({
                message: '成功提示',
                description: `${this.ruleForm.id ? '编辑' : '创建'}会员成功`
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
