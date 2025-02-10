import storage from 'store'
import expirePlugin from 'store/plugins/expire'
import { login } from '@/api/login'
import { ACCESS_TOKEN, ACCESS_USER_INFO } from '@/store/mutation-types'
import { welcome } from '@/utils/util'

storage.addPlugin(expirePlugin)
const user = {
  state: {
    token: '',
    name: '',
    welcome: '',
    avatar: '',
    roles: [],
    info: {}
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, { name, welcome }) => {
      state.name = name
      state.welcome = welcome
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_INFO: (state, info) => {
      state.info = info
    }
  },

  actions: {
    // 登录
    Login ({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        userInfo.type = 'back'
        login(userInfo)
          .then((response) => {
            const result = response.data
            result.username = result.username || userInfo.name
            commit('SET_INFO', result)
            storage.set(ACCESS_TOKEN, result.token)
            storage.set(ACCESS_USER_INFO, result)
            commit('SET_TOKEN', result.token)
            resolve()
          })
          .catch((error) => {
            reject(error)
          })
      })
    },

    // 获取用户信息
    GetInfo ({ commit }) {
      return new Promise((resolve, reject) => {
        // 请求后端获取用户信息 /api/user/info
        const result = {
          id: '4291d7da9005377ec9aec4a71ea837f',
          name: '天野远子',
          username: 'admin',
          password: '',
          avatar: '/avatar2.jpg',
          status: 1,
          telephone: '',
          lastLoginIp: '27.154.74.117',
          lastLoginTime: 1534837621348,
          creatorId: 'admin',
          createTime: 1497160610259,
          merchantCode: 'TLif2btpzg079h15bk',
          deleted: 0,
          roleId: 'admin',
          role: {
            permissions: [
              {
                roleId: 'admin',
                permissionId: 'support',
                permissionName: '超级模块',
                actions:
                  '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"import","defaultCheck":false,"describe":"导入"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"},{"action":"export","defaultCheck":false,"describe":"导出"}]',
                actionEntitySet: [ ],
                actionList: null,
                dataAccess: null
              }
            ]
          }
        }
        if (result.role && result.role.permissions.length > 0) {
          const role = { ...result.role }
          role.permissions = result.role.permissions.map((permission) => {
            const per = {
              ...permission,
              actionList: (permission.actionEntitySet || {}).map((item) => item.action)
            }
            return per
          })
          role.permissionList = role.permissions.map((permission) => {
            return permission.permissionId
          })
          // 覆盖响应体的 role, 供下游使用
          result.role = role

          commit('SET_ROLES', role)
          commit('SET_INFO', result)
          commit('SET_NAME', { name: result.name, welcome: welcome() })
          commit('SET_AVATAR', result.avatar)
          // 下游
          resolve(result)
        } else {
          reject(new Error('getInfo: roles must be a non-null array !'))
        }
      })
    },

    // 登出
    Logout ({ commit, state }) {
      return new Promise((resolve) => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        storage.remove(ACCESS_TOKEN)
        storage.remove(ACCESS_USER_INFO)
        resolve()
      })
    }
  }
}

export default user
