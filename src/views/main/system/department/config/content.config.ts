import type { IContentConfig } from '@/components/page-content/type'

const contentConfig: IContentConfig = {
  pageName: 'department',
  header: {
    title: '部门列表',
    btnTitle: '新增部门'
  },
  hasTableSelection: true,
  hasTableIndex: true,
  tableItems: [
    {
      label: '部门名称',
      prop: 'name'
    },
    {
      label: '部门主管',
      prop: 'leader'
    },
    {
      label: '上级部门',
      prop: 'parentId'
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
