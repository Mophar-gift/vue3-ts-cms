export interface IContentConfig {
  pageName: 'users' | 'department' | 'role' | 'menu'
  header?: IHeader
  hasTableSelection?: boolean
  hasTableIndex?: boolean
  hasPagination?: boolean
  tableItems: ITableItem[]
  childrenTree?: {
    rowKey: string
    treeProps: {
      children: string
    }
  }
}

interface IHeader {
  title?: string
  btnTitle?: string
}
interface ITableItem extends ITableItemBase {
  align?: 'left' | 'center' | 'right'
  width?: string
  slotName?: string
}
interface ITableItemBase {
  label: string
  prop: string
}
