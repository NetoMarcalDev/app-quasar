<!-- eslint-disable no-trailing-spaces -->
<template>
  <q-page padding class="text-body1">
    <div class="row justify-center">
      <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">
    <p>Obrigado por se cadastrar!</p>
    <p>
      Orientações para confirmar o e-mail para finalizar o cadastro:
      <strong>{{ $route.query.email }}</strong>
    </p>

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
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'EmailConfirmationPage'
})
</script>
