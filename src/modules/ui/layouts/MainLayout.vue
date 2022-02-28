<script lang="ts">
  import { defineComponent } from 'vue'
  export default defineComponent({
    name: 'MainLayout',
  })
</script>

<script lang="ts" setup>
  import EssentialLink from '../components/EssentialLink.vue'
  import { linkList } from '../helpers/link-list'

  import { ui } from '../store/ui'

  const uiStore = ui()
</script>

<template>
  <q-layout view="lHh Lpr lFf">
    <q-header reveal elevated>
      <q-toolbar class="bg-black">
        <q-btn
          flat
          dense
          round
          icon="las la-bars"
          aria-label="Menu"
          @click="uiStore.toggleSideMenu()"
        />

        <q-btn no-caps stretch flat aria-label="HubsLogs">
          <q-toolbar-title>HUB Virtual</q-toolbar-title>
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="uiStore.isSideMenuOpen" bordered>
      <q-list>
        <q-item-label header>Opciones</q-item-label>
        <essential-link
          v-for="link in linkList"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<style lang="scss" scoped></style>
