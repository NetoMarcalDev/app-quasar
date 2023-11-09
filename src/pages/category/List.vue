<template>
  <div class="q-pa-md">
    <q-table
      :rows="caterories"
      :columns="columnsCategory"
      row-key="id"
      :loading="loading"
    >
    <template v-slot:top>
      <span class="text-h6">
        Categoria
      </span>
      <q-space />
      <q-btn
        v-if="$q.platform.is.desktop"
        label="Adiconar"
        color="primary"
        icon="mdi-plus"
        dense
        :to="{ name: 'form-categoria' }"
      />
    </template>
    <template v-slot:body-cell-actions="props">
        <q-td :props="props" class="q-gutter-sm">
          <q-btn icon="mdi-pencil-outline" color="secondary" dense @click="handleEdit(props.row)">
            <q-tooltip>
              Editar
            </q-tooltip>
          </q-btn>
          <q-btn icon="mdi-delete-outline" color="negative" dense @click="handleRemoveCategory(props.row)">
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
        :to="{ name: 'form-categoria' }"
      />
    </q-page-sticky>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'
import useApi from 'src/composables/UseApi'
import useNotify from 'src/composables/UseNotify'
import useAuthUser from 'src/composables/UseAuthUser'

import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { columnsCategory } from './table'

export default defineComponent({
  name: 'CategoryList',
  setup () {
    const caterories = ref([])
    const loading = ref(true)
    const { user } = useAuthUser()
    const { listPublic, remove } = useApi()
    const { notifyError, notifySuccess } = useNotify()
    const router = useRouter()
    const table = 'category'
    const $q = useQuasar()

    const handleListCategories = async () => {
      try {
        loading.value = true
        caterories.value = await listPublic(table, user.value.id)
        loading.value = false
      } catch (error) {
        loading.value = false
        notifyError(error.message)
      }
    }

    const handleEdit = (category) => {
      router.push({ name: 'form-categoria', params: { id: category.id } })
    }

    const handleRemoveCategory = async (category) => {
      try {
        $q.dialog({
          title: 'Confirme',
          message: `Deseja excluir ${category.name} ?`,
          cancel: true,
          persistent: true
        }).onOk(async () => {
          await remove(table, category.id)
          notifySuccess('Categoria removida com sucesso.')
          handleListCategories()
        })
      } catch (error) {
        notifyError(error.message)
      }
    }

    onMounted(() => {
      handleListCategories()
    })

    return {
      columnsCategory,
      caterories,
      loading,
      handleEdit,
      handleRemoveCategory
    }
  }
})

</script>
