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
          {find: '@utils', replacement: '@/js/utils'},
          {find: '@pages', replacement: '@/js/pages'},
          {find: '@components', replacement: '@/js/components'},
          {find: '@apis', replacement: '@/js/apis'}
        ]
      },

      server:{
        hmr: {
          host: process.env.VITE_HMR_HOST || 'localhost',
          port: process.env.VITE_HMR_PORT || 3000
        }
      }
    })
  }