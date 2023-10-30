<template>
  <q-page padding>
    <div class="row justify-center">
      <div class="col-12 text-center">
        <p class="text-h6">
          Categoria
        </p>
      </div>
      <q-form class="col-md-7 col-xs-12 col-sm-12 q-gutter-y-md" @submit.prevent="handleSubmit">
        <q-input
          label="Descrição"
          v-model="form.name"
          lazy-rules
          :rules="[val => (val && val.length > 0) || 'Campo obrigatório!']"
        />

        <q-btn
          :label=" isUpdate ? 'Editar' : 'Salvar' "
          color="primary"
          class="full-width"
          rounded
          type="submit"
        />

        <q-btn
          label="Cancelar"
          color="primary"
          class="full-width"
          rounded
          flat
          :to="{ name: 'categoria' }"
        />

      </q-form>
    </div>
  </q-page>
</template>

<script>
import useApi from 'src/composables/UseApi'
import useNotify from 'src/composables/UseNotify'
import { defineComponent, ref, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

export default defineComponent({
  name: 'FormCategory',
  setup () {
    const table = 'category'
    const router = useRouter()
    const route = useRoute()
    const { post, getById, update } = useApi()
    const { notifySuccess, notifyError } = useNotify()

    const isUpdate = computed(() => route.params.id)
    let category = {}

    const form = ref({
      name: ''
    })

    onMounted(() => {
      if (isUpdate.value) {
        handleGetCategory(isUpdate.value)
      }
    })

    const handleSubmit = async () => {
      try {
        if (isUpdate.value) {
          await update(table, form.value)
          notifySuccess('Categoria editada com sucesso!')
        } else {
          await post(table, form.value)
          notifySuccess('Categoria adicionada com sucesso!')
        }
        router.push({ name: 'categoria' })
      } catch (error) {
        notifyError(error.message)
      }
    }

    const handleGetCategory = async (id) => {
      try {
        category = await getById(table, id)
        form.value = category
      } catch (error) {
        notifyError(error.message)
      }
    }

    return {
      form,
      handleSubmit,
      isUpdate
    }
  }
})
</script>
