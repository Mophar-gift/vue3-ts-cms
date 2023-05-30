import type { IContentConfig } from '@/components/page-content/type'

const contentConfig: IContentConfig = {
  pageName: 'menu',
  header: {
    title: '菜单列表',
    btnTitle: '新增菜单'
  },
  hasPagination: false,
  tableItems: [
    {
      label: '菜单名称',
      prop: 'name'
    },
    {
      label: '级别',
      prop: 'type',
      width: '100'
    },
    {
      label: '排序',
      prop: 'sort',
      width: '100'
    },
    {
      label: '菜单地址',
      prop: 'url'
    },
    {
      label: '菜单图标',
      prop: 'icon'
    },
    {
      label: '权限',
      prop: 'permission'
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
  ],
  childrenTree: {
    rowKey: 'id',
    treeProps: {
      children: 'children'
    }
  }
}

export default contentConfig
