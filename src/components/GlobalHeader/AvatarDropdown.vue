<template>
  <div>
    <a-modal :visible="visible" title="修改密码" @ok="handleOk" @cancel="handleCancel">
      <div>
        <a-input v-model:value="psw.password" placeholder="原密码" />
      </div>

      <div style='margin-top:10px'>
        <a-input v-model:value="psw.newPwd" placeholder="新密码" />
      </div>
    </a-modal>
    <a-dropdown v-if="currentUser && currentUser.name" placement="bottomRight">
      <span class="ant-pro-account-avatar">
        <a-avatar size="small" src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png"
          class="antd-pro-global-header-index-avatar" />
        <span>{{ currentUser.name }}</span>
      </span>

      <template v-slot:overlay>
        <a-menu class="ant-pro-drop-down menu" :selected-keys="[]">
          <a-menu-item v-if="menu" key="center" @click="handleToCenter">
            <a-icon type="user" />
            修改密码
          </a-menu-item>
          <!-- <a-menu-item v-if="menu" key="settings" @click="handleToSettings">
          <a-icon type="setting" />
          {{ $t('menu.account.settings') }}
        </a-menu-item>
        <a-menu-divider v-if="menu" /> -->
          <a-menu-item key="logout" @click="handleLogout">
            <a-icon type="logout" />
            {{ $t('menu.account.logout') }}
          </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
    <span v-else>
      <a-spin size="small" :style="{ marginLeft: 8, marginRight: 8 }" />
    </span>


  </div>
</template>

<script>
import { message } from 'ant-design-vue';
import { Modal } from 'ant-design-vue'
import { updatePwd } from '@/api/manage'
export default {
  name: 'AvatarDropdown',
  props: {
    currentUser: {
      type: Object,
      default: () => null
    },
    menu: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      psw: {
        password: '',
        newPwd: ''
      },
      visible: false,
    }
  },
  methods: {
    handleOk() {
      if (this.psw.password == '') {
        message.warning('原密码为空');
      } else if (this.psw.newPwd == '') {
        message.warning('新密码为空');
      } else if (this.psw.password == this.psw.newPwd) {
        message.warning('原密码和新密码不能一致');
      } else {
        updatePwd(this.psw).then((res) => {
          this.psw.password = ''
          this.psw.newPwd = ''
          this.visible = false
          message.success('修改成功');
          return this.$store.dispatch('Logout').then(() => {
            this.$router.push({ name: 'login' })
          })
        })
      }
    },
    handleCancel() {
      this.psw.password = ''
      this.psw.newPwd = ''
      this.visible = false
    },
    handleToCenter() {
      this.visible = true
    },
    handleToSettings() {
      this.$router.push({ path: '/account/settings' })
    },
    handleLogout(e) {
      Modal.confirm({
        title: this.$t('layouts.usermenu.dialog.title'),
        content: this.$t('layouts.usermenu.dialog.content'),
        onOk: () => {
          // return new Promise((resolve, reject) => {
          //   setTimeout(Math.random() > 0.5 ? resolve : reject, 1500)
          // }).catch(() => console.log('Oops errors!'))
          return this.$store.dispatch('Logout').then(() => {
            this.$router.push({ name: 'login' })
          })
        },
        onCancel() { }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.ant-pro-drop-down {
  :deep(.action) {
    margin-right: 8px;
  }

  :deep(.ant-dropdown-menu-item) {
    min-width: 160px;
  }
}
</style>
