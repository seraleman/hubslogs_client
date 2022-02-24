<script lang="ts">
  import { defineComponent } from 'vue'
  export default defineComponent({
    name: 'App',
  })
</script>

<script setup lang="ts">
  import { provide } from 'vue'
  import { apolloClient } from './graphQL/client'
  import { DefaultApolloClient } from '@vue/apollo-composable'

  provide(DefaultApolloClient, apolloClient)
</script>

<template>
  <router-view />
</template>
