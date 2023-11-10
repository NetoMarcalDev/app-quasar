<template>
  <q-page padding>
    <div class="row" v-if="brand.name">
      <div class="col-12 text-center text-h4">
        {{ brand.name }}
        <q-select
          outlined
          v-model="categoryId"
          label="Categoria"
          :options="optionsCategories"
          option-label="name"
          option-value="id"
          map-options
          emit-value
          clearable
          dense
          @update:model-value="handleListProducts(route.params.id)"
        />
      </div>
    </div>
    <div class="q-pa-md">
      <q-table
        grid
        :rows="products"
        :columns="columnsProduct"
        v-model:pagination="initialPagination"
        row-key="id"
        :loading="loading"
        :filter="filter"
        hide-pagination
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
            <q-card flat bordered class="cursor-pointer" @click="handleShowDetails(props.row)">
              <q-img :src="props.row.img_url" :ratio="4/3" />
              <q-card-section class="text-center">
                <div class="text-h6">{{ props.row.name }}</div>
                <div class="text-subtitle2">{{ formatCurrency(props.row.price) }}</div>
              </q-card-section>
            </q-card>
          </div>
        </template>
      </q-table>
      <div class="row justify-center">
        <q-pagination
          v-model="initialPagination.page"
          :max="pagesNumber"
          direction-links
          @update:model-value="handleScrollToTop"
        />
      </div>
    </div>
    <dialog-product-details
      :show="showDialogDetails"
      :product="productDetails"
      @hide-dialog="showDialogDetails = false"
    />
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted, computed } from 'vue'
import useApi from 'src/composables/UseApi'
import useNotify from 'src/composables/UseNotify'
import { useRoute } from 'vue-router'
import { columnsProduct, initialPagination } from './table'
import { formatCurrency } from 'src/utils/format'
import DialogProductDetails from 'src/components/DialogProductDetails.vue'

export default defineComponent({
  name: 'ProductListPublic',
  components: {
    DialogProductDetails
  },
  setup () {
    const products = ref([])
    const loading = ref(true)
    const filter = ref('')
    const table = 'product'
    const showDialogDetails = ref(false)
    const productDetails = ref({})
    const categoryId = ref('')
    const optionsCategories = ref([])

    const { listPublic, brand } = useApi()
    const { notifyError } = useNotify()
    const route = useRoute()

    const handleListProducts = async (userId) => {
      try {
        loading.value = true
        products.value = categoryId.value ? await listPublic(table, userId, 'category_id', categoryId.value) : await listPublic(table, userId)
        loading.value = false
      } catch (error) {
        loading.value = false
        notifyError(error.message)
      }
    }

    const handleShowDetails = (product) => {
      productDetails.value = product
      showDialogDetails.value = true
    }

    const handleListCategories = async (userId) => {
      optionsCategories.value = await listPublic('category', userId)
    }

    const handleScrollToTop = () => {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    onMounted(() => {
      if (route.params.id) {
        handleListCategories(route.params.id)
        handleListProducts(route.params.id)
      }
    })

    return {
      columnsProduct,
      products,
      loading,
      filter,
      formatCurrency,
      showDialogDetails,
      productDetails,
      handleShowDetails,
      brand,
      categoryId,
      optionsCategories,
      handleListProducts,
      route,
      initialPagination,
      handleScrollToTop,
      pagesNumber: computed(() => Math.ceil(products.value.length / initialPagination.value.rowPerPag))
    }
  }
})
</script>
