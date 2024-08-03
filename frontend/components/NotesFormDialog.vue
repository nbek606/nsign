<script lang="ts" setup>
    import type { TNotes } from '~/types/notes'
    import { useNotesStore } from '~/store/notes'

    interface IProps {
        dialog: boolean,
        notes?: TNotes,
        edit?: boolean
    }

    const props = defineProps<IProps>()

    const { notesCreate, notesEdit } = useNotesStore()
    const { rulesEmpty } = useRules()  

    const emit = defineEmits(['close'])

    const form: TNotes = ref({ title: '', body: '' })
    const refsForm: Ref = ref()
    const title = props.edit ? 'Edit' : 'Create'

    const onSubmit = async () => {
        const { valid } = await refsForm.value.validate()
   
        if (!valid) {
            return 
        }

        props.edit ? await notesEdit(form.value) :  await notesCreate(form.value)

        closeForm()
    }

    const closeForm = () => {
        form.value = { title: '', body: '' }
        emit('close')
    }
    
    onMounted(() => {
        if (props.edit) form.value = {...form.value, ...props.notes}
    })
</script>
<template lang="">
    <div>
        <slot />
        <v-dialog
            :model-value="dialog"
            width="auto"
            @click:outside="emit('close')"
        >
            <v-sheet 
                class="mx-auto pa-10" 
                width="800"
            >
                <v-btn 
                    class="float-right"
                    @click="closeForm"
                >
                    <v-icon> 
                        mdi-close
                    </v-icon>
                </v-btn>  

                <h1 class="text-h4 pb-10">
                    {{ title }}
                </h1>

                <v-form 
                    @submit.prevent
                    ref="refsForm"
                >
                    <v-text-field
                        label="Title"
                        v-model="form.title"
                        :rules="[v => rulesEmpty(v, 'title')]"
                    />

                    <v-textarea
                        label="Body"
                        v-model="form.body"
                        :rules="[v => rulesEmpty(v, 'body')]"
                    />

                    <v-btn 
                        class="mt-2" 
                        type="submit" 
                        block
                        @click="onSubmit"
                    >
                        Save
                    </v-btn>
                </v-form>
            </v-sheet>
        </v-dialog>
    </div>
</template>
