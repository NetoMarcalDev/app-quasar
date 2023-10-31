<template>
  <q-page padding>
    <div class="row justify-center">
      <div class="col-12 text-center">
        <p class="text-h6">
          Produto
        </p>
      </div>
      <q-form class="col-md-7 col-xs-12 col-sm-12 q-gutter-y-md" @submit.prevent="handleSubmit">
        <q-input
          label="Imagem"
          stack-label
          v-model="img"
          type="file"
        />

        <q-input
          label="Descrição"
          v-model="form.name"
          lazy-rules
          :rules="[val => (val && val.length > 0) || 'Campo obrigatório!']"
        />

        <q-editor
          v-model="form.description"
          min-height="5rem"
        />

        <q-input
          label="Estoque"
          v-model="form.amount"
          lazy-rules
          :rules="[val => !!val || 'Campo obrigatório!']"
          type="number"
        />

        <q-input
          label="Valor"
          v-model="form.price"
          lazy-rules
          :rules="[val => !!val || 'Campo obrigatório!']"
          prefix="R$ "
        />

        <q-select
          v-model="form.category_id"
          :options="optionsCategory"
          label="Categoria"
          option-value="id"
          option-label="name"
          map-options
          emit-value
          :rules="[val => !!val || 'Categoria obrigatória!']"
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
          :to="{ name: 'produto' }"
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
  name: 'FormProduct',
  setup () {
    const table = 'product'
    const router = useRouter()
    const route = useRoute()
    const { post, getById, update, list, uploadImg } = useApi()
    const { notifySuccess, notifyError } = useNotify()

    const isUpdate = computed(() => route.params.id)
    let product = {}
    const optionsCategory = ref([])

    const form = ref({
      name: '',
      description: '',
      amount: 0,
      price: 0,
      category_id: '',
      img_url: ''
    })
    const img = ref([])

    onMounted(() => {
      if (isUpdate.value) {
        handleGetProduct(isUpdate.value)
      }
      handleListCategory()
    })

    const handleListCategory = async () => {
      try {
        optionsCategory.value = await list('category')
      } catch (error) {
        notifyError(error.messge)
      }
    }

    const handleSubmit = async () => {
      try {
        if (img.value.length > 0) {
          const imgUrl = await uploadImg(img.value[0], 'products')
          form.value.img_url = imgUrl
        }
        if (isUpdate.value) {
          console.log(form.value)
          await update(table, form.value)
          notifySuccess('Produto editado com sucesso!')
        } else {
          await post(table, form.value)
          notifySuccess('Produto adicionado com sucesso!')
        }
        router.push({ name: 'produto' })
      } catch (error) {
        notifyError(error.message)
      }
    }

    const handleGetProduct = async (id) => {
      try {
        product = await getById(table, id)
        form.value = product
      } catch (error) {
        notifyError(error.message)
      }
    }

    return {
      form,
      handleSubmit,
      isUpdate,
      optionsCategory,
      img
    }
  }
})
</script>
