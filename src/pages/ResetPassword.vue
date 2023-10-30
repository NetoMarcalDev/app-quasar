<!-- eslint-disable semi -->
<template>
  <q-page padding>
    <q-form class="row justify-center" @submit.prevent="handlePasswordReset">
      <p class="col-12 text-h4 text-center">Resetar senha</p>
      <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">

        <q-input
          label="Nova senha"
          v-model="newPassword"
          lazy-rules
          :rules="[val => (val && val.length > 0) || 'Campo obrigatório!']"
        />
        <div class="full-width q-pt-md q-gutter-y-md">
          <q-btn
            label="Enviar e-mail"
            color="primary"
            class="full-width"
            outline
            rounded
            type="submit"
          />
        </div>
      </div>
    </q-form>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'
import useAuthUser from 'src/composables/UseAuthUser'
import { useRouter } from 'vue-router'
import useNotify from 'src/composables/UseNotify'

export default defineComponent({
  name: 'ResetPasswordPage',

  setup () {
    const { resetPassword } = useAuthUser()
    const router = useRouter()
    const { notifySuccess, notifyError } = useNotify()
    // const route = useRoute()
    // const token = route.query.token

    const newPassword = ref('')

    const handlePasswordReset = async () => {
      try {
        await resetPassword(newPassword.value)
        notifySuccess('Senha alterada com sucesso!')
        router.push({ name: 'login' })
      } catch (error) {
        notifyError(error.message)
      }
    }

    return {
      newPassword,
      handlePasswordReset
    }
  }
})
</script>
