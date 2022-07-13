import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import { supabase } from './lib/supabase'
import { userSession } from '@/utils/useAuth'

createApp(App).use(store).use(router).mount('#app')

supabase.auth.onAuthStateChange((event, session) => {
  userSession.value = session
})