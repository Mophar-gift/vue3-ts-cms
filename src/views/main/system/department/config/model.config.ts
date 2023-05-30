import type { IModelConfig } from '@/components/page-model/type'

const modelConfig: IModelConfig = {
  title: {
    addNewTitle: '新增部门',
    editTitle: '编辑部门'
  },
  pageName: 'department',
  formItems: [
    {
      type: 'input',
      prop: 'name',
      label: '部门名称',
      placeholder: '请输入部门名称'
    },
    {
      type: 'input',
      prop: 'leader',
      label: '部门主管',
      placeholder: '请输入部门主管'
    },
    {
      type: 'select',
      prop: 'parentId',
      label: '上级部门',
      placeholder: '请选择上级部门',
      options: []
    }
  ],
  rules: {
    name: [{ required: true, message: '必须输入部门名称', trigger: 'blur' }]
  }
}

export default modelConfig
