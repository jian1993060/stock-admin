<template>
  <div>
    <a-button type="primary" @click="showModal">导入</a-button>
    <a-modal title="订单导入" :visible="visible" @cancel="handleCancel" :footer="null">
      <a-upload-dragger
        name="file"
        :action="uploadUrl"
        :headers="headers"
        @change="handleChange"
        style="height: 250px; display: block"
        :showUploadList="false"
      >
        <p class="ant-upload-drag-icon">
          <a-icon :type="uploadLoading ? 'loading' : 'inbox'" />
        </p>
        <p class="ant-upload-text">点击或拖拽文件至此区域即可上传</p>
      </a-upload-dragger>
    </a-modal>
  </div>
</template>
<script>
import storage from 'store'
import { ACCESS_TOKEN } from '@/store/mutation-types'
export default {
  data () {
    return {
      visible: false,
      uploadUrl: process.env.VUE_APP_API_BASE_URL + '/back/order/import',
      headers: { token: storage.get(ACCESS_TOKEN) },
      uploadLoading: false
    }
  },
  methods: {
    showModal () {
      this.visible = true
    },
    handleCancel (e) {
      this.visible = false
    },
    handleChange (info) {
      const status = info.file.status
      if (status !== 'uploading') {
        this.uploadLoading = true
      }
      if (status === 'done') {
        this.uploadLoading = false
        if (info.file.response && info.file.response.code === '0000') {
          this.$notification.success({
            message: '成功提示',
            description: '导入成功'
          })
          this.handleCancel()
          this.$emit('ok')
        } else {
          this.$notification.error({
            message: '错误提示',
            description: info.file.response && info.file.response.msg ? info.file.response.msg : '导入失败'
          })
        }
      } else if (status === 'error') {
        this.$message.error('文件上传失败')
      }
    }
  }
}
</script>
