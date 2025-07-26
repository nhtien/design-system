import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'

export default defineConfig({
    plugins: [vue(), dts({
        insertTypesEntry: true
    }),
    cssInjectedByJsPlugin()
    ],
    build: {
        lib: {
            entry: 'src/index.ts',
            name: 'MyDesignSystem',
            fileName: (format) => `my-design-system.${format}.js`,
        },
        rollupOptions: {
            external: ['vue'],
            output: {
                globals: { vue: 'Vue' },
                exports: 'named'
            },
        },
    },
});