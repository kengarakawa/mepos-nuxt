import { useAdminStore } from '@/stores/useAdminStore'

export const ADMIN_STORE_STORAGE = 'ADMIN_STORE_STORAGE'

export const usePersistAdminStore = () => {
    const adminStore = useAdminStore()
    
    
    
    
    const toUnsub = adminStore.$subscribe(() => {
        
        console.log('  persist storing ...')
        console.log(adminStore.contents)
        localStorage.setItem(ADMIN_STORE_STORAGE , JSON.stringify(adminStore.contents))
    })
        
    onUnmounted( () => {
        toUnsub()
    })
}
