import type PageModel from '@/components/page-model/page-model.vue'
import { ref } from 'vue'

function usePageModel(editCb?: (payload: any) => void) {
  const pageModelRef = ref<InstanceType<typeof PageModel>>()

  const handleAddNewClick = () => {
    pageModelRef.value?.showModel()
  }
  const handleEditClick = (payload) => {
    pageModelRef.value?.showModel(true, payload)
    editCb && editCb(payload)
  }

  return { pageModelRef, handleAddNewClick, handleEditClick }
}

export default usePageModel
