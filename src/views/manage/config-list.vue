<template>
  <a-card class="config-content">
    <a-spin :spinning="spinning">
      <a-descriptions
        title="配置信息"
        bordered
        layout="vertical"
        :column="{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }"
      >
        <a-descriptions-item label="业绩比例">
          <a-input v-model="info.jtbl" @blur="inputBlur('jtbl')" placeholder="请输入波比" />
        </a-descriptions-item>
        <a-descriptions-item label="直推奖励">
          <a-input v-model="info.ztjl" @blur="inputBlur('ztjl')" placeholder="请输入直推奖励" />
        </a-descriptions-item>
        <a-descriptions-item label="直推分红">
          <a-input v-model="info.ztyd" @blur="inputBlur('ztyd')" placeholder="请输入直推一代" />
        </a-descriptions-item>
        <a-descriptions-item label="间推分红">
          <a-input v-model="info.zted" @blur="inputBlur('zted')" placeholder="请输入直推二代" />
        </a-descriptions-item>
        <a-descriptions-item label="提现手续费">
          <a-input v-model="info.rate" @blur="inputBlur('rate')" placeholder="请输入提现手续费" />
        </a-descriptions-item>
        <a-descriptions-item label="最小提现金额">
          <a-input v-model="info.minTx" @blur="inputBlur('minTx')" placeholder="请输入最小提现金额" />
        </a-descriptions-item>
      </a-descriptions>
    </a-spin>
  </a-card>
</template>

<script>
// import moment from 'moment'
import { configList, configUpdate } from '@/api/manage'

export default {
  name: 'TableList',
  //   components: {
  //     STable,
  //     Ellipsis,
  //   },
  data () {
    return {
      // 高级搜索 展开/关闭
      advanced: false,
      // 查询参数
      dataParam: {},
      info: {},
      spinning: false
    }
  },
  created () {
    this.loadData()
  },
  methods: {
    loadData () {
      configList().then((resp) => {
        this.info = resp.data
      })
    },
    inputBlur (key) {
      this.spinning = true
      configUpdate({ [key]: this.info[key], id: this.info.id }).then(() => {
        this.spinning = false
        this.$notification.success({
          message: '成功提示',
          description: '操作成功'
        })
        this.loadData()
      })
      .catch(() => {
        this.spinning = false
      })
    },
    handleAdd () {
      this.$refs.createModal.open({})
    },
    handleEdit (record) {
      this.$refs.createModal.open(record)
    },
    toggleAdvanced () {
      this.advanced = !this.advanced
    }
  }
}
</script>
<style lang="less" scoped>
.config-content {
  /deep/ input {
    padding: 0;
    border: none;
    box-shadow: none;
  }
}
</style>
