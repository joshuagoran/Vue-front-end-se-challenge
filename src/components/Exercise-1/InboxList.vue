<template>
  <div class="inbox-list">
    <div class="inbox-list__top-bar">
      <div class="inbox-list__title">
        <span v-if="selectedMessages.length">{{ selectedMessagesLabel }}</span>
        <slot v-else />
      </div>
      <div class="inbox-list__actions">
        <FontAwesomeIcon class="fa-lg inbox-list__delete-icon" :icon="['fas', 'trash']" @click="deleteMessages" />
        <FontAwesomeIcon class="fa-lg" :icon="['fas', 'search']" />
        <FontAwesomeIcon class="fa-lg" :icon="['fas', 'ellipsis-v']" />
      </div>
    </div>

    <div class="inbox-list__messages">
      <MessageItem
        v-for="message in messages"
        :key="message.id"
        :message="message"
        :selected="selectedMessages.includes(message)"
        selected-message-color="rebeccapurple"
        @update:selected="toggleSelection(message, $event)"
      />
    </div>
  </div>
</template>


<script lang="ts" setup>
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
  import { computed, PropType, reactive } from 'vue'
  import MessageItem from '@/components/Exercise-1/MessageItem.vue'
  import { Message } from '@/types/Exercise-1/Message'


  const props = defineProps({
    messages: {
      type: Array as PropType<Message[]>,
      default: () => [],
    },
    deleteMessage: {
      type: Function,
      required: true,
    },
  })

  const selectedMessages: Message[] = reactive([])

  const selectedMessagesLabel = computed(() => `${selectedMessages.length} ${toPlural('message', selectedMessages.length)} selected`)


  function toPlural(word: string, count: number): string {
    return count === 1 ? word : `${word}s`
  }

  function toggleSelection(message: Message, selected: boolean): void {
    unselectMessage(message)

    if (selected) {
      selectMessage(message)
    }
  }

  function selectMessage(message: Message): void {
    selectedMessages.push(message)
  }

  function unselectMessage(message: Message): void {
    const index = selectedMessages.indexOf(message)

    if (index > -1) {
      selectedMessages.splice(index, 1)
    }
  }

  function deleteMessages(): void {
    selectedMessages.forEach(message => {
      props.deleteMessage(message.id)
    })
    // clear contents of selectedMessages
    selectedMessages.splice(0, selectedMessages.length)
  }
</script>

<style lang="scss">
.inbox-list {
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 3px 3px -2px rgba(0, 0, 0, 0.2), 0 3px 4px 0 rgba(0, 0, 0, 0.14),
    0 1px 8px 0 rgba(0, 0, 0, 0.12) !important;
}

.inbox-list__top-bar {
  display: flex;
  align-items: center;
  color: white;
  background-color: #76d7c4;
  box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.2),
    0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12);
  height: 64px;
  justify-content: space-between;
  padding: 12px 24px;
}

.inbox-list__actions {
  display: flex;
  gap: 24px;
}

.inbox-list__title {
  font-size: 1.5em;
  font-weight: bold;
}

.inbox-list__delete-icon {
  cursor: pointer;
}
</style>
