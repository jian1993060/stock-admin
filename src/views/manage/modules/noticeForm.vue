<template>
  <a-modal
    :title="ruleForm && ruleForm.id ? '公告详情' : '创建公告'"
    :width="840"
    :visible="visible"
    :confirmLoading="loading"
    @ok="confirmHandler"
    @cancel="cancelHandler"
    :ok-button-props="{ props: { disabled: !!(ruleForm && ruleForm.id) } }"
  >
    <a-spin :spinning="loading">
      <a-form-model
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
        :label-col="{ span: 3 }"
        :wrapper-col="{ span: 18 }"
      >
        <a-form-model-item label="公告标题" prop="title">
          <a-input v-model="ruleForm.title" placeholder="请输入公告标题" allowClear></a-input>
        </a-form-model-item>
        <!-- <a-form-model-item label="公告板块" prop="title">
          <a-select placeholder="请选择"  v-model="ruleForm.type" default-value="0">
                <a-select-option value="cn">中文版</a-select-option>
                <a-select-option value="en">国际版</a-select-option>
              </a-select>
        </a-form-model-item> -->
        <a-form-model-item label="公告说明" prop="mainText">
          <quill-editor v-model="ruleForm.mainText"></quill-editor>
        </a-form-model-item>
      </a-form-model>
    </a-spin>
  </a-modal>
</template>

<script>
import { createNotice } from '@/api/manage'
import { userLevelArr } from '../const'
import { QuillEditor } from '@/components'

export default {
    components: {
        QuillEditor
    },
  data () {
    return {
      visible: false,
      loading: false,
      ruleForm: {},
      rules: {
        title: [{ required: true, message: '请输入公告标题', trigger: 'blur' }],
        mainText: [
          { required: true, message: '请输入公告说明', trigger: 'blur' }
        ]
      },
      userLevelArr
    }
  },
  methods: {
    open (record) {
      this.ruleForm = { ...record }
      this.ruleForm.type='cn'
      this.visible = true
      if (!record.title) {
          setTimeout(() => {
            this.$refs.ruleForm.clearValidate()
          }, 100)
      }
    },
    cancelHandler () {
      this.visible = false
    },
    confirmHandler () {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.loading = true
          createNotice(this.ruleForm)
            .then(() => {
              this.loading = false
              this.$notification.success({
                message: '成功提示',
                description: `${this.ruleForm.id ? '编辑' : '创建'}公告成功`
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
