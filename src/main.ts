import { createSSRApp } from 'vue'
import pinia from './stores'
import 'virtual:windi-base.css'
import 'virtual:windi-components.css'
import 'virtual:windi-utilities.css'
import App from './App.vue'

export function createApp() {
  const app = createSSRApp(App)
  app.use(pinia)
  return {
    app,
    pinia
  }
}
