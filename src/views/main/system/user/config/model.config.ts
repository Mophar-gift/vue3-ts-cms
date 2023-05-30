import type { IModelConfig } from '@/components/page-model/type'

const modelConfig: IModelConfig = {
  title: {
    addNewTitle: '新增用户',
    editTitle: '编辑用户'
  },
  pageName: 'users',
  formItems: [
    {
      type: 'input',
      prop: 'name',
      label: '用户名',
      placeholder: '请输入用户名'
    },
    {
      type: 'password',
      prop: 'password',
      label: '密码',
      placeholder: '请输入密码'
    },
    {
      type: 'input',
      prop: 'realname',
      label: '真实姓名',
      placeholder: '请输入真实姓名'
    },
    {
      type: 'input',
      prop: 'cellphone',
      label: '手机号码',
      placeholder: '请输入手机号码'
    },
    {
      type: 'select',
      prop: 'roleId',
      label: '选择角色',
      placeholder: '请选择角色',
      options: []
    },
    {
      type: 'select',
      prop: 'departmentId',
      label: '选择部门',
      placeholder: '请选择部门',
      options: []
    }
  ],
  rules: {
    name: [{ required: true, message: '必须输入用户名', trigger: 'blur' }],
    password: [{ required: true, message: '必须输入密码', trigger: 'blur' }],
    realname: [{ required: true, message: '必须输入真实姓名', trigger: 'blur' }],
    cellphone: [{ required: true, message: '必须输入手机号码', trigger: 'blur' }],
    roleId: [{ required: true, message: '必须选择角色', trigger: 'change' }],
    departmentId: [{ required: true, message: '必须选择部门', trigger: 'change' }]
  }
}

export default modelConfig
