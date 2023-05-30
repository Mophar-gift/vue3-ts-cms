import type { IContentConfig } from '@/components/page-content/type'

const contentConfig: IContentConfig = {
  pageName: 'role',
  header: {
    title: '角色列表',
    btnTitle: '新增角色'
  },
  hasTableSelection: true,
  hasTableIndex: true,
  tableItems: [
    {
      label: '角色名称',
      prop: 'name'
    },
    {
      label: '角色介绍',
      prop: 'intro'
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
