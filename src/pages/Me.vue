<template>
  <q-page class="flex flex-center">
    <div v-if="user">
      <p>Olá, {{ user.email }}</p>
    </div>
  </q-page>
</template>

<script lang="ts">
import useAuthUser from 'src/composables/UseAuthUser'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'MePage',
  setup () {
    const { user } = useAuthUser()

    return {
      user
    }
  }
})
</script>
