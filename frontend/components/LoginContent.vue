<script lang="ts" setup>
    import type { TLogin } from '~/types/login';
    import { useLoginStore } from  '~/store/login'

    const { login, logout } = useLoginStore()
    const { errorMsg } = toRefs(useLoginStore())
    const { rulesEmpty, rulesMinCharacter } = useRules()  

    const form: Reactive<TLogin> = reactive({ username: '', password: ''})  
    const isBtnLoading: Ref<boolean> = ref(false)    
    const refsForm: Ref = ref()

    const onSubmit = async () => {
        const { valid } = await refsForm.value.validate()

        if (!valid) {
            return
        }

        isBtnLoading.value = true
        await login(form)
        navigateTo('/')
        isBtnLoading.value = false
    }
</script>
<template>
    <v-sheet class="mx-auto pt-15" max-width="400">
        <v-form 
            ref="refsForm"
            @submit.prevent="onSubmit"
            lazy-validation
        >
            <v-text-field
                label="User name"
                v-model="form.username"
                :rules="[v => rulesEmpty(v, 'user name')]"
                required
            ></v-text-field>
            <v-text-field
                label="Password"
                type="password"
                v-model="form.password"
                :rules="[v => rulesMinCharacter(v, 'password', 8)]"
                required
            ></v-text-field>

            <v-alert
                v-if="errorMsg"
                :text="errorMsg"
                type="error"
                variant="tonal"
            ></v-alert>
            <v-btn
                class="mt-2"
                text="Login"
                type="submit"
                :loading="isBtnLoading"
                block
            ></v-btn>
        </v-form>
    </v-sheet>
</template>