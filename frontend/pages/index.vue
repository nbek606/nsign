<script lang="ts" setup>
    import { useLoginStore } from  '~/store/login'
    import NotesContent from '~/components/NotesContent.vue'
    
    const { logout } = useLoginStore()
</script>
<template lang="">
    <div>
        <v-btn @click="logout">
            Exit
        </v-btn>
        <NotesContent />
    </div>
</template>
