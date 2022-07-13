<template>
  <div id="app" class="w-full h-full flex flex-col justify-center bg-gray-300">
    <div
      v-if="showPasswordReset"
      class="w-full h-full flex flex-col justify-center items-center p-4"
    >
      <PasswordReset />
    </div>
    <div
      v-else-if="userSession === null"
      class="w-full h-full flex flex-col justify-center items-center p-4"
    >
      <AuthPage />
    </div>
    <div v-else class="w-full h-full flex flex-col justify-center items-center p-4 max-w-sm m-auto">
      <Suspense>
        <template #default>
          <div>
            <TodoList />
            <button class="btn-black w-full mt-12" @click="handleLogout">
              Logout
            </button>
          </div>
        </template>
        <template #fallback>
          <LoadingPage />
        </template>
      </Suspense>
    </div>
  </div>
</template>

<script>
import AuthPage from '@/components/AuthPage.vue'
import PasswordReset from '@/components/PasswordReset.vue'
import TodoList from '@/components/TodoList.vue'
import LoadingPage from '@/components/LoadingPage.vue'
import { userSession, handleLogout } from '@/utils/useAuth'
import { getParameterByName } from '@/lib/helpers'

export default {
  components: {
    AuthPage,
    PasswordReset,
    TodoList,
    LoadingPage,
  },
  computed: {
    showPasswordReset: function() {
      const requestType = getParameterByName('type', location.href)
      return requestType === 'recovery'
    }
  },
  setup() {
    return { userSession, handleLogout }
  },
}
</script>