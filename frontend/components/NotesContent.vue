<script lang="ts" setup>
    import { useNotesStore } from '~/store/notes'
    import NotesFormDialog from '~/components/NotesFormDialog.vue'

    const { notes } = useNotesStore()
    
    onMounted(async () => {
        await notes()
    })

    const { notesList, maxNotes, next } = toRefs(useNotesStore())

    const dialog: Ref<boolean> = ref(false) 

    const changeDialog = () => {
        dialog.value = !dialog.value
    }    
</script>
<template lang="">
    <div class="notes__content">
        <v-card
            class="mx-auto mb-4 pt-4 pl-4 pb-4 pr-4"
            max-width="1000"
        >
            <NotesFormDialog
                :dialog="dialog"
                @close="changeDialog"
            >
                    <v-btn
                        class="text-none float-right"
                        color="primary"
                        prepend-icon="mdi-plus"
                        text="Создать заметку"
                        variant="flat"
                        flat
                    @click="changeDialog"
                    ></v-btn>
            </NotesFormDialog>    
        </v-card>
        
        <NotesList 
            :list="notesList"
        />     
        
        <v-card
            v-if="next"
            class="mx-auto elavation-0 mt-4 mb-15"
            max-width="1000"
        >
            <v-btn
                class="text-none float-center"
                text="Загрузить еще"
                variant="flat"
                @click="notes()"
                flat
                block
            ></v-btn>
        </v-card>
    </div> 
</template>