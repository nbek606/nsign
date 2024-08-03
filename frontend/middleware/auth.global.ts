import { useLoginStore } from "~/store/login";

export default defineNuxtRouteMiddleware((to, from) => {
    const { accessToken } = toRefs(useLoginStore())
    
    if (!accessToken.value && to.name !== 'login') {
        return navigateTo('/login')
    } else if (accessToken.value && to.name === 'login') {
        return navigateTo('/')
    }
});