<!-- eslint-disable semi -->
<template>
  <q-page padding>
    <q-form class="row justify-center" @submit.prevent="handleForgotPassword">
      <p class="col-12 text-h4 text-center">Esqueci minha senha</p>
      <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">

        <q-input
          label="E-mail"
          type="email"
          v-model="email"
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
          <q-btn
            label="Voltar"
            color="dark-green"
            class="full-width"
            flat
            rounded
            :to="{ name: 'login' }"
          />
        </div>
      </div>
    </q-form>
  </q-page>
</template>
<script>
import { defineComponent, ref } from 'vue'
import useAuthUser from 'src/composables/UseAuthUser'
import useNotify from 'src/composables/UseNotify'

export default defineComponent({
  name: 'RegisterPage',

  setup () {
    const { sendPasswordResetEmail } = useAuthUser()
    const email = ref('')
    const { notifySuccess, notifyError } = useNotify()

    const handleForgotPassword = async () => {
      try {
        await sendPasswordResetEmail(email.value)
        notifySuccess(`E-mail para resetar a senha enviado para: ${email.value}`)
      } catch (error) {
        notifyError(error.message)
      }
    }

    return {
      email,
      handleForgotPassword
    }
  }

})

</script>
