<template>
  <div class="page-1">
    <h3 class="page-1__title">
      Page 1
    </h3>
    <textarea v-model="input" rows="4" class="page-1__textarea" placeholder="Type something here..." />
    <RippleButton class="page-1__save-button" :disabled="inputMatches" @click="save">
      Save
    </RippleButton>
  </div>
</template>

<script lang="ts" setup>
  import { computed, ref } from 'vue'
  import { onBeforeRouteLeave } from 'vue-router'
  import RippleButton from '@/components/RippleButton.vue'
  import { useSavedInput } from '@/stores/savedInput'

  const savedInputStore = useSavedInput()
  const input = ref(savedInputStore.input ?? '')

  const inputMatches = computed(() => input.value === savedInputStore.input)

  const save = (): void => {
    savedInputStore.save(input.value)
  }

  onBeforeRouteLeave((to, from, next) => {
    if (!inputMatches.value) {
      // I recognize that this solution is not perfect. Hopefully it is satisfactory for 'MVP' :)
      // in production I would certainly respect this lint rule and use a custom confirmation dialog
      // eslint-disable-next-line no-alert
      const userHasConfirmed = window.confirm(
        'You are leaving page 1! Click "OK" to save your changes or "Cancel" to discard them',
      )
      if (userHasConfirmed) {
        save()
      }
    }
    next()
  })
</script>

<style lang="scss">
.page-1 {
  text-align: center;
}

.page-1__textarea {
  color: inherit;
  font-family: inherit;
  font-size: inherit;
  margin: auto;
  outline-color: #76d7c4;
  overflow: auto;
  padding: 24px;
  resize: none;
  width: 85%;
}
</style>