<template>
  <q-page padding>
    <div class="row justify-center">
      <div class="col-12 text-center">
        <p class="text-h6">
          Configurações
        </p>
      </div>
      <q-form class="col-md-7 col-xs-12 col-sm-12 q-gutter-y-md" @submit.prevent="handleSubmit">
        <q-input
          label="Nome da Loja"
          v-model="form.name"
          lazy-rules
          :rules="[val => (val && val.length > 0) || 'Campo obrigatório!']"
        />

        <q-input
          label="Telefone"
          v-model="form.phone"
          mask="(##) #.####-####"
          unmasked-value
        />

        <q-input
          label="Imagem Parallax"
          stack-label
          v-model="parallax"
          type="file"
          accept="image/*"
        />

        <div class="row justify-center q-gutter-md q-pa-md" >
          <q-color v-model="form.primary_color" class="col-md-4 col-sm-12 col-xs-12" />
          <q-color v-model="form.secondary_color" class="col-md-4 col-sm-12 col-xs-12" />
        </div>

        <q-btn
          label="Salvar"
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
import { defineComponent, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import useBrand from 'src/composables/UseBrand'
import useAuthUser from 'src/composables/UseAuthUser'

export default defineComponent({
  name: 'FormConfig',
  setup () {
    const table = 'config'
    const router = useRouter()
    const { post, listPublic, update, uploadImg } = useApi()
    const { notifySuccess, notifyError } = useNotify()
    const { setBrand } = useBrand()
    const { user } = useAuthUser()

    let config = {}
    const parallax = ref([])

    const form = ref({
      name: '',
      phone: '',
      primary_color: '',
      secondary_color: '',
      parallax_url: ''
    })

    onMounted(() => {
      handleGetConfig()
    })

    const handleSubmit = async () => {
      try {
        if (parallax.value.length > 0) {
          const parallaxUrl = await uploadImg(parallax.value[0], 'parallax')
          form.value.parallax_url = parallaxUrl
        }
        if (form.value.id) {
          await update(table, form.value)
          notifySuccess('Categoria editada com sucesso!')
        } else {
          await post(table, form.value)
          notifySuccess('Categoria adicionada com sucesso!')
        }

        setBrand(form.value.primary_color, form.value.secondary_color)
        router.push({ name: 'me' })
      } catch (error) {
        notifyError(error.message)
      }
    }

    const handleGetConfig = async () => {
      try {
        config = await listPublic(table, user.value.id)
        form.value = config[0]
      } catch (error) {
        notifyError(error.message)
      }
    }

    return {
      form,
      handleSubmit,
      parallax
    }
  }
})
</script>
