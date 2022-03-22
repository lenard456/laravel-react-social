import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import laravel from 'vite-plugin-laravel'

export default function({mode}){
    process.env = {...process.env, ...loadEnv(mode, process.cwd())}
    return defineConfig({
      plugins: [
        react(),
        laravel()
      ],

      resolve: {
        alias: [
          {find: '@utils', replacement: '/resources/js/utils'},
          {find: '@pages', replacement: '/resources/js/pages'},
          {find: '@components', replacement: '/resources/js/components'},
          {find: '@apis', replacement: '/resources/js/apis'},
          {find: '@contexts', replacement: '/resources/js/contexts'}
        ]
      },

      server:{
        host: 'localhost',
        hmr: {
          host: process.env.VITE_HMR_HOST || 'localhost',
          port: process.env.VITE_HMR_PORT || 3000
        }
      }
    })
  }