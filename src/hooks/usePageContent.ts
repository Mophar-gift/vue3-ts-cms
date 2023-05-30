import type PageContent from '@/components/page-content/page-content.vue'
import { ref } from 'vue'

function usePageContent() {
  const pageContentRef = ref<InstanceType<typeof PageContent>>()

  const handleSearchClick = (searchVal) => {
    pageContentRef.value?.fetchPageData(searchVal)
  }
  const handleResetClick = () => {
    pageContentRef.value?.fetchPageData()
  }
  const handleUpdatePageData = () => {
    pageContentRef.value?.fetchPageData()
    pageContentRef.value?.updateCommonData()
  }

  return { pageContentRef, handleSearchClick, handleResetClick, handleUpdatePageData }
}

export default usePageContent
