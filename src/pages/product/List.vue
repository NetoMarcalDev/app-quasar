<template>
  <div class="q-pa-md">
    <q-table
      :rows="products"
      :columns="columnsProduct"
      row-key="id"
      :loading="loading"
    >
    <template v-slot:top>
      <span class="text-h6">
        Produto
      </span>
      <q-btn
        label="Listar"
        dense
        size="sm"
        outline
        class="q-ml-sm"
        icon="mdi-store"
        color="primary"
        @click="handleGoToHistore"
      />
      <q-btn
        label="Copiar link"
        dense
        size="sm"
        outline
        class="q-ml-sm"
        icon="mdi-content-copy"
        color="primary"
        @click="handleCopyPublicUrl"
      />
      <q-space />
      <q-btn
        v-if="$q.platform.is.desktop"
        label="Adiconar"
        color="primary"
        icon="mdi-plus"
        dense
        :to="{ name: 'form-produto' }"
      />
    </template>
    <template v-slot:body-cell-img_url="props">
      <q-td :props="props">
        <q-avatar v-if="props.row.img_url">
          <img :src="props.row.img_url">
        </q-avatar>
        <q-avatar v-else color="grey" text-color="white" icon="mdi-image-off" />
      </q-td>
    </template>
    <template v-slot:body-cell-actions="props">
        <q-td :props="props" class="q-gutter-sm">
          <q-btn icon="mdi-pencil-outline" color="secondary" dense @click="handleEdit(props.row)">
            <q-tooltip>
              Editar
            </q-tooltip>
          </q-btn>
          <q-btn icon="mdi-delete-outline" color="negative" dense @click="handleRemoveProduct(props.row)">
            <q-tooltip>
              Deletar
            </q-tooltip>
          </q-btn>
        </q-td>
      </template>
    </q-table>
    <q-page-sticky
      position="bottom-right"
      :offset="[18, 18]"
    >
      <q-btn
        v-if="$q.platform.is.mobile"
        fab
        icon="mdi-plus"
        color="primary"
        :to="{ name: 'form-produto' }"
      />
    </q-page-sticky>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'
import useApi from 'src/composables/UseApi'
import useAuthUser from 'src/composables/UseAuthUser'
import useNotify from 'src/composables/UseNotify'
import { useRouter } from 'vue-router'
import { useQuasar, openURL, copyToClipboard } from 'quasar'
import { columnsProduct } from './table'

export default defineComponent({
  name: 'ProductList',
  setup () {
    const products = ref([])
    const loading = ref(true)
    const { listPublic, remove } = useApi()
    const { user } = useAuthUser()
    const { notifyError, notifySuccess } = useNotify()
    const router = useRouter()
    const table = 'product'
    const $q = useQuasar()

    const handleListProducts = async () => {
      try {
        loading.value = true
        products.value = await listPublic(table, user.value.id)
        loading.value = false
      } catch (error) {
        loading.value = false
        notifyError(error.message)
      }
    }

    const handleEdit = (product) => {
      router.push({ name: 'form-produto', params: { id: product.id } })
    }

    const handleRemoveProduct = async (product) => {
      try {
        $q.dialog({
          title: 'Confirme',
          message: `Deseja excluir ${product.name} ?`,
          cancel: true,
          persistent: true
        }).onOk(async () => {
          await remove(table, product.id)
          notifySuccess('Produto removido com sucesso.')
          handleListProducts()
        })
      } catch (error) {
        notifyError(error.message)
      }
    }

    const handleGoToHistore = () => {
      const idUser = user.value.id
      const link = router.resolve({ name: 'produtos', params: { id: idUser } })
      openURL(window.origin + link.href)
    }

    const handleCopyPublicUrl = () => {
      const idUser = user.value.id
      const link = router.resolve({ name: 'produtos', params: { id: idUser } })
      const externalLink = window.origin + link.href
      copyToClipboard(externalLink)
        .then(() => {
          notifySuccess('Link copiado com sucesso!')
        })
        .catch(() => {
          notifyError('Não foi possível compiar o link.')
        })
    }

    onMounted(() => {
      handleListProducts()
    })

    return {
      columnsProduct,
      products,
      loading,
      handleEdit,
      handleRemoveProduct,
      handleGoToHistore,
      handleCopyPublicUrl
    }
  }
})

</script>
