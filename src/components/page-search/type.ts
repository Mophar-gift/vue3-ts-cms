export interface ISearchConfig {
  pageName: 'users' | 'department' | 'role' | 'menu'
  formItems: IFormItem[]
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
}

interface IFormItemBase {
  type: 'input' | 'select' | 'radio' | 'date-picker'
  prop: string
  label: string
}
interface IOptionItem {
  label: string
  value: string
}
