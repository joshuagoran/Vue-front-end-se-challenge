import { defineStore } from 'pinia'

type SavedInputState = {
  input: string | null,
}

export const useSavedInput = defineStore('savedInput', {
  state: (): SavedInputState => ({
    // I'm defaulting input to an empty string to avoid confusing the user by presenting the confirmation dialog if they haven't entered text due to comparing null to '' in Page-1.vue
    input: '',
  }),
  actions: {
    save(value: string | null) {
      this.input = value
    },
  },
})