<template>
    <Navbar />
    <main>
        <router-view />
    </main>
</template>

<script>
import Navbar from '@/components/frontend/Nav.vue'
export default {
    name: 'FrontendLayout',
    components: {
        Navbar
    }
}
</script>