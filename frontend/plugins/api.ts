import { useLoginStore } from "~/store/login"

export default defineNuxtPlugin((nuxtApp) => {
    const { accessToken } = toRefs(useLoginStore())
    const config = useRuntimeConfig()

    const api = $fetch.create({
        baseURL: config.public.baseURL,
        onRequest({ request, options, error }) {
            if (accessToken.value) {
                const headers = options.headers ||= {}
                if (Array.isArray(headers)) {
                    headers.push(['Authorization', `Token ${accessToken.value}`])
                } else if (headers instanceof Headers) {
                    headers.set('Authorization', `Token ${accessToken.value}`)
                } else {
                    headers.Authorization = `Token ${accessToken.value}`
                }
            }
        }
    })
    
    return {
        provide: {
            api
        }
    }
})
