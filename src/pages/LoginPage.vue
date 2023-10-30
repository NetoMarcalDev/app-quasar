<!-- eslint-disable no-trailing-spaces -->
<template>
  <q-page padding>
    <q-form class="row justify-center" @submit.prevent="handleLogin">
      <p class="col-12 text-h4 text-center">Login</p>
      <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">
        <q-input
          label="E-mail"
          v-model="form.email"
          type="email"
          lazy-rules
          :rules="[val => (val && val.length > 0) || 'Campo obrigatório!']"
        />

        <q-input
          label="Senha"
          v-model="form.password"
          :type="isPwd ? 'password' : 'text'"
          lazy-rules
          :rules="[val => (val && val.length > 0) || 'Campo obrigatório!']"
        >
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            ></q-icon>
          </template>
        </q-input>

        <div class="full-width q-pt-md">
          <q-btn
            label="Acessar"
            color="primary"
            class="full-width"
            outline
            rounded
            type="submit"
          />
        </div>

        <div class="full-width">
          <q-btn
            label="Cadastre-se"
            color="primary"
            class="full-width"
            flat
            to="cadastro"
            size="0.8em"
          />
          <q-btn
            label="Esqueceu a senha?"
            color="primary"
            class="full-width"
            flat
            :to="{ name: 'esqueci-minha-senha' }"
            size="0.8em"
          />
        </div>

      </div>
    </q-form>
  </q-page>
</template>

<script>
import { defineComponent, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import useAuthUser from 'src/composables/UseAuthUser'
import useNotify from 'src/composables/UseNotify'

export default defineComponent({
  name: 'LoginPage',
  setup () {
    const router = useRouter()
    const { login, isLoggedIn } = useAuthUser()
    const { notifyError, notifySuccess } = useNotify()

    const form = ref({
      email: '',
      password: ''
    })

    onMounted(() => {
      if (isLoggedIn) {
        router.push({ name: 'me' })
      }
    })

    const handleLogin = async () => {
      try {
        await login(form.value)
        notifySuccess('Login realizado com sucesso!')
        router.push({ name: 'me' })
      } catch (error) {
        notifyError(error.message)
      }
    }

    return {
      form,
      isPwd: ref(true),
      handleLogin
    }
  }
})
</script>
