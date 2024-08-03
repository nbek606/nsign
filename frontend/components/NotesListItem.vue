<script lang="ts" setup>
    import DeleteDialog from '~/components/DeleteDialog.vue'
    import NotesFromDialog from '~/components/NotesFormDialog.vue'

    import type { TNotes } from '~/types/notes.ts'

    import { useNotesStore } from '~/store/notes'

    interface IProps {
        item: TNotes 
    }

    const deleteDialog: Ref<boolean> = ref(false)
    const formDialog: Ref<boolean> = ref(false)

    const { notesDelete, setEditableNotes, setDeleteNotesId } = useNotesStore()

    const props = defineProps<IProps>()

    const changeFormDialog = () => {
        formDialog.value = !formDialog.value
    }

    const changeDeleteDialog = () => {
        deleteDialog.value = !deleteDialog.value
    }
</script>
<template lang="">
   <v-list-item>
        <v-list-item-title>
            {{ item.title }}
        </v-list-item-title>

        <v-list-item-subtitle>
            {{ item.body }}
        </v-list-item-subtitle>
        
        <NotesFromDialog
            :dialog="formDialog"
            :edit="true"
            :notes="item"
            @close="changeFormDialog"
            @onSubmit=""
        >
            <v-btn
                class="text-none mt-4"
                color="green"
                prepend-icon="mdi-pencil"
                text="Редактировать"
                size="small"
                variant="flat"
                flat
                @click="changeFormDialog"
            ></v-btn>
        </NotesFromDialog>    

        <DeleteDialog  
            :dialog="deleteDialog"
            @close="changeDeleteDialog"
            @delete="notesDelete(item.id)"
        >
            <v-btn
                @click="changeDeleteDialog"  
                class="text-none mt-1"
                color="grey"
                prepend-icon="mdi-delete"
                text="Удалить"
                size="small"
                variant="flat"
                flat
            />
        </DeleteDialog>
    </v-list-item>
</template>

<style lang="scss" scoped>
    
</style>