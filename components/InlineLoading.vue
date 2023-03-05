<script setup>
    const dots = ref(1)
    const maxDots = 3     
    
    
    setInterval( () => {
        dots.value = dots.value + 1         
        if(dots.value > maxDots) {
            dots.value = 1 
        }
    }, 1000)
</script>
<template>
    <div class="container mx-auto text-center animate-bounce">        
        <div class="w-1/6 text-left mx-auto">
            <span class="font-xl font-bold text-green-500">L O A D I N G {{  '. ' .repeat(dots) }}</span>
        </div>
        
    </div>
</template>

