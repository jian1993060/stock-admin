import Mock from 'mockjs2'
import { builder, getQueryParameters } from '../util'

const totalCount = 5701

const serverList = (options) => {
  const parameters = getQueryParameters(options)
  const result = []
  const pageNo = parseInt(parameters.pageNo)
  const pageSize = parseInt(parameters.pageSize)
  const totalPage = Math.ceil(totalCount / pageSize)
  const key = (pageNo - 1) * pageSize
  const next = (pageNo >= totalPage ? totalCount % pageSize : pageSize) + 1

  for (let i = 1; i < next; i++) {
    const tmpKey = key + i
    result.push({
      key: tmpKey,
      id: tmpKey,
      no: 'No ' + tmpKey,
      description: '这是一段描述',
      callNo: Mock.mock('@integer(1, 999)'),
      status: Mock.mock('@integer(0, 3)'),
      updatedAt: Mock.mock('@datetime'),
      editable: false
    })
  }

  return builder({
    pageSize: pageSize,
    pageNo: pageNo,
    totalCount: totalCount,
    totalPage: totalPage,
    data: result
  })
}

const projects = () => {
  return builder({
    data: [
      {
        id: 1,
        cover: 'https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png',
        title: 'Alipay',
        description: '那是一种内在的东西， 他们到达不了，也无法触及的',
        status: 1,
        updatedAt: '2018-07-26 00:00:00'
      },
      {
        id: 2,
        cover: 'https://gw.alipayobjects.com/zos/rmsportal/zOsKZmFRdUtvpqCImOVY.png',
        title: 'Angular',
        description: '希望是一个好东西，也许是最好的，好东西是不会消亡的',
        status: 1,
        updatedAt: '2018-07-26 00:00:00'
      },
      {
        id: 3,
        cover: 'https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png',
        title: 'Ant Design',
        description: '城镇中有那么多的酒馆，她却偏偏走进了我的酒馆',
        status: 1,
        updatedAt: '2018-07-26 00:00:00'
      },
      {
        id: 4,
        cover: 'https://gw.alipayobjects.com/zos/rmsportal/sfjbOqnsXXJgNCjCzDBL.png',
        title: 'Ant Design Pro',
        description: '那时候我只会想自己想要什么，从不想自己拥有什么',
        status: 1,
        updatedAt: '2018-07-26 00:00:00'
      },
      {
        id: 5,
        cover: 'https://gw.alipayobjects.com/zos/rmsportal/siCrBXXhmvTQGWPNLBow.png',
        title: 'Bootstrap',
        description: '凛冬将至',
        status: 1,
        updatedAt: '2018-07-26 00:00:00'
      },
      {
        id: 6,
        cover: 'https://gw.alipayobjects.com/zos/rmsportal/ComBAopevLwENQdKWiIn.png',
        title: 'Vue',
        description: '生命就像一盒巧克力，结果往往出人意料',
        status: 1,
        updatedAt: '2018-07-26 00:00:00'
      }
    ],
    pageSize: 10,
    pageNo: 0,
    totalPage: 6,
    totalCount: 57
  })
}

const activity = () => {
  return builder([
    {
      id: 1,
      user: {
        nickname: '@name',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png'
      },
      project: {
        name: '白鹭酱油开发组',
        action: '更新',
        event: '番组计划'
      },
      time: '2018-08-23 14:47:00'
    },
    {
      id: 1,
      user: {
        nickname: '蓝莓酱',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/jZUIxmJycoymBprLOUbT.png'
      },
      project: {
        name: '白鹭酱油开发组',
        action: '更新',
        event: '番组计划'
      },
      time: '2018-08-23 09:35:37'
    },
    {
      id: 1,
      user: {
        nickname: '@name',
        avatar: '@image(64x64)'
      },
      project: {
        name: '白鹭酱油开发组',
        action: '创建',
        event: '番组计划'
      },
      time: '2017-05-27 00:00:00'
    },
    {
      id: 1,
      user: {
        nickname: '曲丽丽',
        avatar: '@image(64x64)'
      },
      project: {
        name: '高逼格设计天团',
        action: '更新',
        event: '六月迭代'
      },
      time: '2018-08-23 14:47:00'
    },
    {
      id: 1,
      user: {
        nickname: '@name',
        avatar: '@image(64x64)'
      },
      project: {
        name: '高逼格设计天团',
        action: 'created',
        event: '六月迭代'
      },
      time: '2018-08-23 14:47:00'
    },
    {
      id: 1,
      user: {
        nickname: '曲丽丽',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png'
      },
      project: {
        name: '高逼格设计天团',
        action: 'created',
        event: '六月迭代'
      },
      time: '2018-08-23 14:47:00'
    }
  ])
}

const teams = () => {
  return builder([
    {
      id: 1,
      name: '科学搬砖组',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png'
    },
    {
      id: 2,
      name: '程序员日常',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/cnrhVkzwxjPwAaCfPbdc.png'
    },
    {
      id: 1,
      name: '设计天团',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/gaOngJwsRYRaVAuXXcmB.png'
    },
    {
      id: 1,
      name: '中二少女团',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ubnKSIfAJTxIgXOKlciN.png'
    },
    {
      id: 1,
      name: '骗你学计算机',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/WhxKECPNujWoWEFNdnJE.png'
    }
  ])
}

const radar = () => {
  return builder([
    {
      item: '引用',
      个人: 70,
      团队: 30,
      部门: 40
    },
    {
      item: '口碑',
      个人: 60,
      团队: 70,
      部门: 40
    },
    {
      item: '产量',
      个人: 50,
      团队: 60,
      部门: 40
    },
    {
      item: '贡献',
      个人: 40,
      团队: 50,
      部门: 40
    },
    {
      item: '热度',
      个人: 60,
      团队: 70,
      部门: 40
    },
    {
      item: '引用',
      个人: 70,
      团队: 50,
      部门: 40
    }
  ])
}

const addMember = () => {
  return builder({
    data: true
  })
}

const memberList = (options) => {
  const parameters = getQueryParameters(options)
  const result = []
  const pageNo = parseInt(parameters.pageNo)
  const pageSize = parseInt(parameters.pageSize)
  const totalPage = Math.ceil(totalCount / pageSize)
  const key = (pageNo - 1) * pageSize
  const next = (pageNo >= totalPage ? totalCount % pageSize : pageSize) + 1

  for (let i = 1; i < next; i++) {
    const tmpKey = key + i
    result.push({
      key: tmpKey,
      id: tmpKey,
      no: 'No ' + tmpKey,
      description: '这是一段描述',
      callNo: Mock.mock('@integer(1, 999)'),
      status: Mock.mock('@integer(0, 3)'),
      updatedAt: Mock.mock('@datetime'),
      editable: false,
      phone: '18175823689',
      name: '李四',
      gxz: 1,
      userLevel: '1',
      userLevelDesc: '个人代理',
      yyzx: '2',
      fgs: '1',
      tjr: '推荐人'
    })
  }

  return builder({
    size: pageSize,
    pageNo: pageNo,
    total: totalCount,
    pages: totalPage,
    records: result
  })
}

const withdrawList = (options) => {
  const parameters = getQueryParameters(options)
  const result = []
  const pageNo = parseInt(parameters.pageNo)
  const pageSize = parseInt(parameters.pageSize)
  const totalPage = Math.ceil(totalCount / pageSize)
  const key = (pageNo - 1) * pageSize
  const next = (pageNo >= totalPage ? totalCount % pageSize : pageSize) + 1

  for (let i = 1; i < next; i++) {
    const tmpKey = key + i
    result.push({
      key: tmpKey,
      id: tmpKey,
      no: 'No ' + tmpKey,
      description: '这是一段描述',
      callNo: Mock.mock('@integer(1, 999)'),
      status: Mock.mock('@integer(0, 3)'),
      createTime: Mock.mock('@datetime'),
      amount: 1,
      url: 'https://jsd',
      type: '提现方式',
      bankNo: '提现账号',
      bankName: '银行',
      name: 'name'
    })
  }

  return builder({
    size: pageSize,
    pageNo: pageNo,
    total: totalCount,
    pages: totalPage,
    records: result
  })
}

const withdrawFinish = () => {
  return builder({
    data: true
  })
}
const rewardList = (options) => {
    const parameters = getQueryParameters(options)
    const result = []
    const pageNo = parseInt(parameters.pageNo)
    const pageSize = parseInt(parameters.pageSize)
    const totalPage = Math.ceil(totalCount / pageSize)
    const key = (pageNo - 1) * pageSize
    const next = (pageNo >= totalPage ? totalCount % pageSize : pageSize) + 1

    for (let i = 1; i < next; i++) {
      const tmpKey = key + i
      result.push({
        key: tmpKey,
        id: tmpKey,
        userName: '用户名称',
        userPhone: '用户手机号码',
        rewardType: Mock.mock('@integer(0, 3)'),
        amount: '收益金额',
        createTime: '收益时间'
      })
    }

    return builder({
      size: pageSize,
      pageNo: pageNo,
      total: totalCount,
      pages: totalPage,
      records: result
    })
  }

const configList = (options) => {
  const parameters = getQueryParameters(options)
  const result = []
  const pageNo = parseInt(parameters.pageNo)
  const pageSize = parseInt(parameters.pageSize)
  const totalPage = Math.ceil(totalCount / pageSize)
  const key = (pageNo - 1) * pageSize
  const next = (pageNo >= totalPage ? totalCount % pageSize : pageSize) + 1

  for (let i = 1; i < next; i++) {
    const tmpKey = key + i
    result.push({
      key: tmpKey,
      id: tmpKey,
      no: 'No ' + tmpKey,
      description: '这是一段描述',
      callNo: Mock.mock('@integer(1, 999)'),
      status: Mock.mock('@integer(0, 3)'),
      updatedAt: Mock.mock('@datetime'),
      editable: false,
      jtbl: '波比',
      gr: 'gr个人贡献值',
      qy: 'qy企业贡献值',
      xj: 'xj县级贡献值',
      cs: 'cs城市贡献值',
      sj: 'sj省级贡献值',
      ztjl: 'ztjl直推奖励',
      ztzd: 'ztyd直推一代',
      zted: 'zted直推二代'
    })
  }

  return builder({
    size: pageSize,
    pageNo: pageNo,
    total: totalCount,
    pages: totalPage,
    records: result
  })
}

const salesList = (options) => {
    const parameters = getQueryParameters(options)
    const result = []
    const pageNo = parseInt(parameters.pageNo)
    const pageSize = parseInt(parameters.pageSize)
    const totalPage = Math.ceil(totalCount / pageSize)
    const key = (pageNo - 1) * pageSize
    const next = (pageNo >= totalPage ? totalCount % pageSize : pageSize) + 1
    for (let i = 1; i < next; i++) {
        const tmpKey = key + i
        result.push({
          key: tmpKey,
          id: tmpKey,
          totalAmount: '收益金额'
        })
      }
      return builder({
        size: pageSize,
        pageNo: pageNo,
        total: totalCount,
        pages: totalPage,
        records: result
      })
}

Mock.mock(/\/service/, 'get', serverList)
Mock.mock(/\/list\/search\/projects/, 'get', projects)
Mock.mock(/\/workplace\/activity/, 'get', activity)
Mock.mock(/\/workplace\/teams/, 'get', teams)
Mock.mock(/\/workplace\/radar/, 'get', radar)
Mock.mock(/\/back\/user\/add/, 'post', addMember)
Mock.mock(/\/back\/user\/update/, 'post', addMember)
Mock.mock(/\/back\/user\/list/, 'get', memberList)
Mock.mock(/\/back\/withdraw\/list/, 'get', withdrawList)
Mock.mock(/\/back\/withdraw\/finish/, 'post', withdrawFinish)
Mock.mock(/\/back\/config\/list/, 'get', configList)
Mock.mock(/\/back\/config\/update/, 'post', addMember)
Mock.mock(/\/back\/reward\/list/, 'get', rewardList)

Mock.mock(/\/back\/sales\/list/, 'get', salesList)
Mock.mock(/\/back\/sales\/add/, 'post', addMember)
