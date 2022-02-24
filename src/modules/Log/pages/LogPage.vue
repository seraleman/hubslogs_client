<script lang="ts">
  import { defineComponent, watch } from 'vue'
  export default defineComponent({
    name: 'LogPage',
  })
</script>

<script lang="ts" setup>
  import { useQuery } from '@vue/apollo-composable'
  import gql from 'graphql-tag'
  import { ref } from 'vue'
  import { Reason } from '../../reason/interfaces'

  const {
    error,
    result,
    loading,
    fetchMore,
    forceDisabled,
    networkStatus,
    onResult,
    options,
    subscribeToMore,
    onError,
    query,
    refetch,
    restart,
    start,
    stop,
    variables,
  } = useQuery(
    gql`
      query ExampleQuery {
        getAllReasons {
          id
          name
          description
        }
      }
    `,
    null,
    {
      errorPolicy: 'all',
    }
  )

  watch(
    () => error.value,
    (error) => {
      console.log('error: ', error)
      console.log('error clientErrors: ', error?.clientErrors)
      console.log('error extraInfo: ', error?.extraInfo)
      console.log('error graphQLErrors: ', error?.graphQLErrors)
      if (error?.graphQLErrors !== undefined) {
        const [response1] = error?.graphQLErrors
        console.log('response1: ', response1.extensions.code)
      }

      if (error?.graphQLErrors !== undefined) {
        const [responseError] = error?.graphQLErrors
        const { code } = responseError.extensions
        console.log('response - code: ', code)
      }
      console.log(
        'error graphQLErrors: ',
        error?.graphQLErrors[0].extensions.code
      )
      console.log('error message: ', error?.message)
      console.log('error networkError: ', error?.networkError)
      console.log('error stack: ', error?.stack)
      if (error !== null) {
        error.graphQLErrors.forEach((element) => {
          console.log(element)
          console.log(element.message)
        })
      }
    }
  )

  watch(
    () => result.value,
    (result) => {
      console.log('result: ', result)
    }
  )

  watch(
    () => loading.value,
    (loading) => {
      console.log('loading: ', loading)
    }
  )

  watch(
    () => forceDisabled.value,
    (forceDisabled) => {
      console.log('forceDisabled: ', forceDisabled)
    }
  )

  watch(
    () => networkStatus.value,
    (networkStatus) => {
      console.log('networkStatus: ', networkStatus)
    }
  )

  watch(
    () => variables.value,
    (variables) => {
      console.log('variables: ', variables)
    }
  )

  watch(
    () => options,
    (options) => {
      console.log('options: ', options)
    }
  )

  watch(
    () => query.value,
    (query) => {
      console.log('query: ', query)
    }
  )

  // console.log('fetchMore: ', fetchMore)
  // console.log('onResult: ', onResult)
  // console.log('subscribeToMore: ', subscribeToMore)
  // console.log('onError: ', onError)
  // console.log('refetch: ', refetch)
  // console.log('restart: ', restart)
  // console.log('start: ', start)
  // console.log('stop: ', stop)

  const reason: Reason = {
    description: '',
    id: '620eb3457fd5565e6cff16f8',
    name: 'Hub Trade',
  }
  const document = ref<string>('')

  const onSubmit = (document: string) => {
    console.log(document)
  }
</script>

<template>
  <!-- <q-input
    v-model="document"
    type="text"
    label="Ingrese cédula para registrar"
  />

  <q-btn
    color="primary"
    icon="check"
    label="Registrar visita"
    @click="onSubmit(document)"
  /> -->7

  <div v-if="loading">Loading...</div>
  <div v-else>
    <h2>Good: {{ result }}</h2>
    <pre>
Bad:
     
    </pre>
  </div>

  <pre>{{ result }}</pre>
</template>

<style lang="scss" scoped></style>
