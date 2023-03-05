import { useGlobalStore } from '@/stores'

export default defineNuxtRouteMiddleware((to, from) => {
    
        const allowedPaths = ['/admin/logout'] 
    
        if(!allowedPaths.includes(to.path) &&  !localStorage.getItem('currentUser')) {
            
            const { setFlashSwal } =  useGlobalStore()    
            setFlashSwal({
                title: 'Unauthorized', 
                text : 'Please sign into system first' , 
                icon : 'warning' , 
                confirmButtonText : 'OK'
            })
            const router = useRouter() 
            router.push('/login')
        }
        
    
})
