import { defineStore } from 'pinia'

interface State {
  isSideMenuOpen: boolean
}

export const ui = defineStore('ui', {
  state: (): State => ({
    isSideMenuOpen: true,
  }),

  actions: {
    toggleSideMenu() {
      this.isSideMenuOpen = !this.isSideMenuOpen
    },
  },
})
