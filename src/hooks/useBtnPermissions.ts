import useLoginStore from '@/stores/login/login'

function useBtnPermissions(permissionID: string) {
  const loginStore = useLoginStore()
  const { btnPermissions } = loginStore

  return !!btnPermissions.find((item) => item.includes(permissionID))
}

export default useBtnPermissions
