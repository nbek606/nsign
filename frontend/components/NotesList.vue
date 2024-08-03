<script lang="ts" setup>
    import NotesListItem from '~/components/NotesListItem.vue'
    import NotesList from '~/components/NotesList.vue'
    import type { TNotes } from '~/types/notes.ts'

    interface IProps {
        list: TNotes 
    }

    const props = defineProps<IProps>()
    const dialog: Ref<boolean> = ref(false)
</script>
<template lang="">
    <v-card
        class="mx-auto"
        max-width="1000"
    >
        <v-list lines="three" >
            <NotesListItem  
                v-for="item in list"
                :key="item.id"
                :item="item"
            />
        </v-list>
  </v-card>
</template>
<style lang="scss" scoped>
    
</style>