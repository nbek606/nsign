<script lang="ts" setup> 
    interface IProps {
        dialog: boolean
    }

    const emit = defineEmits(['close', 'delete'])

    const props = defineProps<IProps>()
</script>
<template lang="">
    <div>
        <slot />
        <v-dialog
            :model-value="dialog"
            width="auto"
            @click:outside="emit('close')"
        >
            <v-card
                max-width="400"
                title="Вы действительно хотите удалить?"
            >
                <template v-slot:actions>
                    <v-btn
                        class=""
                        text="Да"
                        @click="emit('delete')"
                    ></v-btn>
                    <v-btn
                        class=""
                        text="Нет"
                        @click="emit('close')"
                    ></v-btn>
                </template>
            </v-card>
        </v-dialog>
    </div>
</template>