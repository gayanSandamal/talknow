<template>
  <div class="w-full">
    <h1 class="mb-12 font-bold text-6xl">Todo List.</h1>
    <div class="flex gap-2 my-2">
      <input
        v-model="task"
        class="rounded w-full p-2"
        type="text"
        placeholder="What do you need to?"
      />
      <button @click="insertEvent" class="btn-black">
        Add
      </button>
    </div>

    <div class="bg-white shadow overflow-hidden rounded-md">
      <ul v-for="(todo, index) in allEvents" :key="index">
        <TodoItem :todo="todo" />
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import TodoItem from '@/components/TodoItem.vue'
import { allEvents, fetchEvents, addEvent } from '@/utils/useEvents'
import { userSession } from '@/utils/useAuth'

export default defineComponent({
  name: 'TodoList',
  components: {
    TodoItem,
  },

  async setup() {
    await fetchEvents()

    const task = ref('')

    /**
     * Wrapper function adding a new todo for additional client-side error handling.
     */
    async function insertEvent() {
      // Guard for short task descriptions which will fail db policy.
      if (task.value.length <= 3) {
        alert('Please make your task a little more descriptive')
        return
      }
      // Type check to ensure user is still logged in.
      if (userSession?.value === null) {
        alert('Please log in again')
        return
      }
      try {
        // Try and write the data to the database.
        const todo = await addEvent({ created_by: userSession.value?.user?.id, title: task.value })

        // If there was no response, don't do anything.
        if (!todo) {
          return
        }
        // Otherwise, push the response into allEvents.
        allEvents.value.push(todo)

        // Reset input field.
        task.value = ''
      } catch (err) {
        console.error('Unknown error when adding todo', err)
      }
    }

    return {
      task,
      allEvents,
      insertEvent,
      userSession,
    }
  },
})
</script>