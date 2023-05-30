import type { IContentConfig } from '@/components/page-content/type'

const contentConfig: IContentConfig = {
  pageName: 'users',
  header: {
    title: '用户列表',
    btnTitle: '新增用户'
  },
  hasTableSelection: true,
  hasTableIndex: true,
  tableItems: [
    {
      label: '用户名',
      prop: 'name'
    },
    {
      label: '真实姓名',
      prop: 'realname'
    },
    {
      label: '手机号码',
      prop: 'cellphone'
    },
    {
      label: '状态',
      prop: 'enable',
      width: '120',
      slotName: 'enable'
    },
    {
      label: '创建时间',
      prop: 'createAt',
      slotName: 'createAt'
    },
    {
      label: '更新时间',
      prop: 'updateAt',
      slotName: 'updateAt'
    },
    {
      label: '操作',
      prop: 'action',
      slotName: 'action'
    }
  ]
}

export default contentConfig
