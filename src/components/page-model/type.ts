import type { FormRules } from 'element-plus'

export interface IModelConfig {
  pageName: 'users' | 'department' | 'role' | 'menu'
  title: {
    addNewTitle: string
    editTitle: string
  }
  formItems: IFormItem[]
  rules?: FormRules
  labelWidth?: string
  labelPosition?: 'left' | 'right' | 'top'
  size?: 'large' | 'default' | 'small'
}

interface IFormItem extends IFormItemBase {
  placeholder?: string
  initialValue?: any
  'range-separator'?: string
  'start-placeholder'?: string
  'end-placeholder'?: string
  options?: IOptionItem[]
  slotName?: string
}

interface IFormItemBase {
  type: 'input' | 'password' | 'select' | 'radio' | 'date-picker' | 'custom'
  prop: string
  label: string
}
interface IOptionItem {
  label: string
  value: string
}
