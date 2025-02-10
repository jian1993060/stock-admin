<template>
  <a-modal
    :title="ruleForm && ruleForm.id ? '编辑商品' : '新增商品'"
    :width="840"
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
        :label-col="{ span: 3 }"
        :wrapper-col="{ span: 18 }"
      >
        <a-form-model-item label="商品名称" prop="name">
          <a-input v-model="ruleForm.name" placeholder="请输入商品名称" allowClear></a-input>
        </a-form-model-item>
        <a-form-model-item label="商品价格" prop="name">
          <a-input v-model="ruleForm.price" type="number" placeholder="请输入商品价格" allowClear></a-input>
        </a-form-model-item>
        <a-form-model-item label="商品描述" prop="productDesc">
          <a-input v-model="ruleForm.productDesc" placeholder="请输入商品描述" allowClear></a-input>
        </a-form-model-item>
        <a-form-model-item label="贡献值" prop="gxz">
          <a-input v-model="ruleForm.gxz" placeholder="请输入贡献值" allowClear></a-input>
        </a-form-model-item>
        <a-form-model-item label="商品图片" prop="icon">
          <a-upload
            name="file"
            list-type="picture-card"
            class="avatar-uploader"
            :show-upload-list="false"
            :action="UploadUrl"
            @change="handleChange"
          >
            <img class="img" v-if="ruleForm.icon" :src="ruleForm.icon" alt="avatar" />
            <div v-else>
              <a-icon :type="loading ? 'loading' : 'plus'" />
              <div class="ant-upload-text">
                Upload
              </div>
            </div>
          </a-upload>
        </a-form-model-item>
      </a-form-model>
    </a-spin>
  </a-modal>
</template>

<script>
import { saveProduct } from '@/api/manage'
import { userLevelArr } from '../const'
const checkZsNum = (rule, value, callback) => {
  if (!/^[1-9]\d*$/.test(value)) {
    callback(new Error('请输入正整数'))
  } else {
    callback()
  }
}
export default {
  name: 'SaveCommodity',
  data () {
    return {
      visible: false,
      loading: false,
      ruleForm: {},
      rules: {
        name: [{ required: true, message: '请输入商品名称', trigger: 'blur' }],
        price: [
          { required: true, message: '请输入商品价格', trigger: 'blur' }
        ],
        productDesc: [
          { required: true, message: '请输入商品描述', trigger: 'blur' }
        ],
        gxz: [
          { required: true, message: '请输入贡献值', trigger: 'blur' },
          { validator: checkZsNum }
        ],
        icon: [
          { required: true, message: '请上传图片', trigger: 'blur' }
        ]
      },
      userLevelArr,
      UploadUrl: '/api/file/upload'
    }
  },
  methods: {
    open (record) {
      this.ruleForm = { ...record }
      this.visible = true
      if (!record.title) {
        setTimeout(() => {
          this.$refs.ruleForm.clearValidate()
        }, 100)
      }
    },
    handleChange (info) {
      if (info.file.status === 'uploading') {
        this.loading = true
        return
      }
      if (info.file.status === 'done') {
        // Get this url from response in real world.
        this.loading = false
        this.ruleForm.icon = info.file.response.data
      }
    },
    cancelHandler () {
      this.visible = false
    },
    confirmHandler () {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.loading = true
          saveProduct(this.ruleForm)
            .then(() => {
              this.loading = false
              this.$notification.success({
                message: '成功提示',
                description: `${this.ruleForm.id ? '编辑' : '创建'}商品成功`
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

<style scoped>
.avatar-uploader > .ant-upload {
  width: 128px;
  height: 128px;
}

.avatar-uploader .img {
  width: 128px;
  height: 128px;
}

.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>
