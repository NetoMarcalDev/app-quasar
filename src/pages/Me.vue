<template>
  <q-page padding>
    <!--div v-if="user">
      <p>Olá, {{ user.email }}</p>
    </div-->
    <div class="row q-col-gutter-md">
      <div class="col-md-4 col-xs-12 col-sm-6">
        <card-dashboard
          table='category'
          label='Categorias'
          icon='mdi-shape-outline'
        />
      </div>
      <div class="col-md-4 col-xs-12 col-sm-6">
        <card-dashboard
          table='product'
          label='Produtos'
          icon='mdi-archive'
        />
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import useAuthUser from 'src/composables/UseAuthUser'
import { defineComponent, defineAsyncComponent } from 'vue'

export default defineComponent({
  name: 'MePage',
  components: {
    CardDashboard: defineAsyncComponent(() => import('components/CardDashboard.vue'))
  },
  setup () {
    const { user } = useAuthUser()

    return {
      user
    }
  }
})
</script>
