import { defineStore } from 'pinia'

export const useGlobalStore = defineStore('global' , {
    
    state: () => {
        return {
            flashMessage : {},      
            flashSwal : {} ,       
        }
    } ,
    actions: {
        setFlashMessage(newMessage: object) {
            return this.flashMessage = newMessage
        } ,
        getFlashMessage(clearCurrentAsWell=true ) {
            const message = this.flashMessage            
            if(clearCurrentAsWell) {
                this.flashMessage = {}
            }
            return message 
        } , 
        setFlashSwal(swalObject: object) {
            return this.flashSwal = swalObject
        } ,
        getFlashSwal(clearCurrentAsWell=true ) {
            const message = this.flashSwal            
            if(clearCurrentAsWell) {
                this.flashSwal = {}
            }
            return message 
        } ,
        hasFlashSwal() {                        
            return Object.keys(this.flashSwal).length !== 0 
        }
    }
    
})
