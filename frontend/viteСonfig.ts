import { transformAssetUrls } from 'vite-plugin-vuetify'

export const viteConfig = {
    vue: {
        template: {
            transformAssetUrls,
        },
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `
                    @import "~/assets/scss/main.scss";
                    @import "~/assets/scss/_variables.scss";
                    @import "~/assets/scss/_mixins.scss";
                    `,
            },
        },
    },    
}