import type { ISearchConfig } from '@/components/page-search/type'

const searchConfig: ISearchConfig = {
  pageName: 'role',
  formItems: [
    {
      type: 'input',
      prop: 'name',
      label: '角色名称',
      placeholder: '请输入查询的角色名称'
    },
    {
      type: 'input',
      prop: 'intro',
      label: '角色介绍',
      placeholder: '请输入查询的角色介绍'
    },
    {
      type: 'date-picker',
      prop: 'createAt',
      label: '创建时间',
      'start-placeholder': '开始时间',
      'end-placeholder': '结束时间'
    }
  ]
}

export default searchConfig
