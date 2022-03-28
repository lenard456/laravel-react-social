import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import laravel from 'vite-plugin-laravel'

const getServerHMRHost = () => {
  const GITPOD_ID = process.env.GITPOD_WORKSPACE_ID

  if (!GITPOD_ID) return 'localhost';

  return `3000-${GITPOD_ID}.gitpod.io`;
}

const getServerHMRPort = () => {
  const GITPOD_ID = process.env.GITPOD_WORKSPACE_ID

  if (!GITPOD_ID) return 3000;

  return 443;
}

const setupEnvironment = () => {
  const isGitpod = !!process.env.GITPOD_WORKSPACE_ID
  const GITPOD_WORKSPACE_HOST = process.env.GITPOD_WORKSPACE_ID +'.'+process.env.GITPOD_WORKSPACE_CLUSTER_HOST
  process.env.VITE_CLIENT_HOST = isGitpod ? `3000-${GITPOD_WORKSPACE_HOST}` : 'localhost:3000'
  process.env.VITE_SERVER_HOST = isGitpod ? `8000-${GITPOD_WORKSPACE_HOST}` : 'localhost:8000'
  process.env.VITE_HMR_HOST = isGitpod ? process.env.VITE_CLIENT_HOST : 'localhost'
  process.env.VITE_HMR_PORT = isGitpod ? 443 : 3000
  process.env.VITE_ISGITPOD = isGitpod
  process.env.VITE_GITPOD_WORKSPACE_ID = process.env.GITPOD_WORKSPACE_ID
}

export default function({mode}){
    process.env = {...process.env, ...loadEnv(mode, process.cwd())}
    setupEnvironment()
    process.env.VITE_GITPOD_WORKSPACE_ID = process.env.GITPOD_WORKSPACE_ID

    console.log(process.env.VITE_HMR_HOST)

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
          host: process.env.VITE_HMR_HOST,
          port: process.env.VITE_HMR_PORT
        }
      }
    })
  }