import { defineStore } from "pinia";

import type { TLogin } from '~/types/login';
import type { TUser } from '~/types/user'
import { ref } from 'vue'

export const useLoginStore = defineStore('login', () => {
    const user: Ref<TUser | null>= ref(null) 
    const errorMsg: Ref<string> = ref('')

    const nuxtApp = useNuxtApp()
  
    const login = async (form: TLogin) =>  {
        errorMsg.value = ''

        try {
            const data: TUser = await nuxtApp.$api('/auth/', { method: 'POST', body: form })
            user.value = data
        } catch (error) {
            errorMsg.value = 'Неверный логин или пароль'
        }
    }

    const accessToken = computed((): string | undefined => {
        return user.value?.token
    })

    const logout = () => {
        user.value = null
        navigateTo('login')
    }

    return {
        login,
        logout,
        user,
        accessToken,
        errorMsg
    }
}, {
    persist: {
        paths: ['user']
    }
})