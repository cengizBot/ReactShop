import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@interface': path.resolve(__dirname, 'src/interface'),
            '@api': path.resolve(__dirname, 'src/api'),
            '@type': path.resolve(__dirname, 'src/type'),
            '@routing': path.resolve(__dirname, 'src/routing'),
            '@store': path.resolve(__dirname, 'src/store'),
            '@components': path.resolve(__dirname, 'src/components'),
            '@pages': path.resolve(__dirname, 'src/pages'),
            '@data': path.resolve(__dirname, 'src/data'),
            '@i18n': path.resolve(__dirname, 'src/i18n'),
            '@locales': path.resolve(__dirname, 'src/locales'),
            '@url': path.resolve(__dirname, 'src/url'),
            '@util': path.resolve(__dirname, 'src/util')
        },
    },
});
