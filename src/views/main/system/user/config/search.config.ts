import type { ISearchConfig } from '@/components/page-search/type'

const searchConfig: ISearchConfig = {
  pageName: 'users',
  formItems: [
    {
      type: 'input',
      label: '用户名',
      prop: 'name',
      placeholder: '请输入查询的用户名'
    },
    {
      type: 'input',
      label: '真实姓名',
      prop: 'realname',
      placeholder: '请输入查询的真实姓名'
    },
    {
      type: 'input',
      label: '手机号码',
      prop: 'cellphone',
      placeholder: '请输入查询的手机号码'
    },
    {
      type: 'select',
      label: '状态',
      prop: 'enable',
      placeholder: '请选择查询的状态',
      options: [
        { label: '启用', value: '1' },
        { label: '禁用', value: '0' }
      ]
    },
    {
      type: 'date-picker',
      label: '创建时间',
      prop: 'createAt',
      'start-placeholder': '开始时间',
      'end-placeholder': '结束时间'
    }
  ]
}

export default searchConfig
