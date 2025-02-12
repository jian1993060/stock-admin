<template>
  <div>
    <a-card style="margin-bottom: 10px">
      <div class="right_title" slot="title">
        <div class="right_title_title">数据仪表盘</div>
      </div>
    </a-card>
    <a-row :gutter="20" style="margin: 0">
      <a-col :sm="24" :md="24" :xl="24" :style="{ marginBottom: '12px', paddingRight: 0, paddingLeft: 0 }">
        <a-card style="margin-bottom: 10px">
          <div class="right_title">
            <div class="right_title_icon"></div>
            <div class="right_title_title">数据概览</div>
          </div>
          <div class="dataField"></div>
          <a-row :gutter="24">
            <a-col v-for="(item, index) in girds || []" :key="index" :sm="24" :md="12" :xl="6">
              <div class="marketing_data">
                <div class="marketing_data_title">{{ item.label }}</div>
                <div class="marketing_data_price">
                  {{ item.num | digit }}
                  <!-- <span v-if="item.count">（{{ item.count }}笔）</span> -->
                </div>
              </div>
            </a-col>
          </a-row>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { getStatistics } from '@/api/sys'
export default {
  name: '',

  data () {
    return {
      girds: []
    }
  },
  filters: {
    // 千位符格式化
    digit: function (value) {
      return value ? ('' + value).replace(/\B(?=(\d{3})+(?!\d))/g, ',') : value
    }
  },
  mounted () {
    this.loadData()
  },
  methods: {
    loadData () {
      getStatistics().then(res => {
        // this.girds = res.data
        this.girds = [
          { label: '充值金额', num: res.data.rechargeAmount || 0 },
          { label: '提现金额', num: res.data.withdrawAmount || 0 },
          { label: '充值笔数', num: res.data.rechargeNum || 0 },
          { label: '提现笔数', num: res.data.withdrawNum || 0 },
          { label: '交易金额', num: res.data.orderAmount || 0 },
          { label: '买入金额', num: res.data.buyAmount || 0 },
          { label: '卖出金额', num: res.data.saleAmount || 0 } ,
          { label: '交易笔数', num: res.data.orderNum || 0 }       
        ]
      })
    }
  },
  components: {}
}
</script>

<style scoped>
.right_title_title {
  font-size: 16px;
  margin-right: 20px;

  color: #1f2026;
  font-weight: bold;
  font-family: PingFangSC-Medium, PingFang SC;
}
.right_title_icon {
  width: 4px;
  height: 17px;
  background: #4393f2;
  border-radius: 2px;
  margin-right: 10px;
}
.right_title {
  display: flex;
  align-items: center;
}
.dataField {
  font-size: 14px;

  color: #999999;
  margin: 10px 0;
}
.marketing_data_rank {
  font-size: 12px;
  color: #999999;
  font-weight: 400;

  font-family: PingFangSC-Regular, PingFang SC;
}

.marketing_data_price {
  font-size: 22px;
  color: #333333;
  margin: 5px 0;
  font-weight: 500;
  font-family: DIN-Medium, DIN;
}
.marketing_data_title {
  font-size: 14px;

  color: #666666;
  font-weight: 400;

  font-family: PingFangSC-Regular, PingFang SC;
}
.marketing_data {
  width: 100%;
  min-height: 100px;
  margin-bottom: 20px;
  padding: 10px 10px 10px 20px;
  background: #f7f8fa;
  border-radius: 2px;
}
</style>
