<template>
  <div class="q-pa-md">
    <q-table
      grid
      :rows="products"
      :columns="columnsProduct"
      row-key="id"
      :loading="loading"
      :filter="filter"
    >
      <template v-slot:top>
        <span class="text-h6"> Produtos </span>
        <q-space />
        <q-input outlined dense debounce="300" v-model="filter" placeholder="Consultar" class="q-mr-sm">
          <template v-slot:append>
            <q-icon name="mdi-magnify" />
          </template>
        </q-input>
      </template>

      <template v-slot:item="props">
        <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4">
          <q-card flat bordered>
            <q-img :src="props.row.img_url" :ratio="4/3" />
            <q-card-section class="text-center">
              <div class="text-h6">{{ props.row.name }}</div>
              <div class="text-subtitle2">{{ formatCurrency(props.row.price) }}</div>
            </q-card-section>
          </q-card>
        </div>
      </template>
    </q-table>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'
import useApi from 'src/composables/UseApi'
import useNotify from 'src/composables/UseNotify'
import { useRoute } from 'vue-router'
import { columnsProduct } from './table'
import { formatCurrency } from 'src/utils/format'

export default defineComponent({
  name: 'ProductListPublic',
  setup () {
    const products = ref([])
    const loading = ref(true)
    const filter = ref('')
    const table = 'product'

    const { listPublic } = useApi()
    const { notifyError } = useNotify()
    const route = useRoute()

    const handleListProducts = async (userId) => {
      try {
        loading.value = true
        products.value = await listPublic(table, userId)
        loading.value = false
      } catch (error) {
        loading.value = false
        notifyError(error.message)
      }
    }

    onMounted(() => {
      if (route.params.id) {
        handleListProducts(route.params.id)
      }
    })

    return {
      columnsProduct,
      products,
      loading,
      filter,
      formatCurrency
    }
  }
})
</script>