import type { IModelConfig } from '@/components/page-model/type'

const modelConfig: IModelConfig = {
  pageName: 'role',
  title: {
    addNewTitle: '新增角色',
    editTitle: '编辑角色'
  },
  formItems: [
    {
      type: 'input',
      prop: 'name',
      label: '角色名称',
      placeholder: '请输入角色名称'
    },
    {
      type: 'input',
      prop: 'intro',
      label: '角色描述',
      placeholder: '请输入角色描述'
    },
    {
      type: 'custom',
      prop: 'menuList',
      label: '权限分配',
      slotName: 'menuList'
    }
  ],
  rules: {
    name: [{ required: true, message: '必须输入角色名称', trigger: 'blur' }]
  }
}

export default modelConfig
