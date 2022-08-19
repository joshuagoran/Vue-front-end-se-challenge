<template>
  <div v-if="!message.deleted" class="message-item" :class="classes.item" @click.prevent="toggleActive">
    <div class="message-item__checkbox">
      <FontAwesomeIcon class="fa-lg" :icon="['far', classes.icon]" />
    </div>
    <div>
      <div class="message-item__from">
        {{ message.from }}
      </div>
      <div class="message-item__subject">
        {{ message.subject }}
      </div>
    </div>
    <Popper hover open-delay="200" close-delay="100" content="This message is urgent!">
      <FontAwesomeIcon v-if="message.urgent" class="fa-lg message-item__urgent-icon" icon="triangle-exclamation" />
    </Popper>
    <div class="message-item__right-cell">
      <Popper hover open-delay="200" close-delay="100">
        <!--
          trigger element for the popover message preview
          open to feedback if this seems unclear to users!
        -->
        <FontAwesomeIcon class="fa-lg message-item__preview-icon" icon="eye" />
        <!-- popover content -->
        <template #content>
          <div class="message-item__popover">
            {{ message.message }}
          </div>
        </template>
      </Popper>
      <div class="message-item__timestamp">
        {{ message.timestamp }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
  import { computed, PropType } from 'vue'
  import Popper from 'vue3-popper'
  import { Message } from '@/types/Exercise-1/Message'

  const props = defineProps({
    message: {
      type: Object as PropType<Message>,
      required: true,
    },
    selected: {
      type: Boolean,
    },
    selectedMessageColor: {
      type: String,
      default: '#76d7c4',
      required: false,
    },
  })

  const emit = defineEmits<{
    (event: 'update:selected', value: boolean): void,
  }>()

  const classes = computed(() => ({
    item: {
      'message-item--selected': props.selected,
    },
    icon: [props.selected ? 'check-square' : 'square'],
  }))

  function toggleActive(): void {
    emit('update:selected', !props.selected)
  }
</script>

<style lang="scss">
.message-item {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 12px 24px;
  background-position: center;
  transition: background 800ms;

  &:hover {
    background: rgba(133, 146, 158, 0.05)
      radial-gradient(circle, transparent 1%, rgba(133, 146, 158, 0.05) 1%)
      center/15000%;
  }

  &:active {
    background-color: rgba(133, 146, 158, 0.05);
    background-size: 100%;
    transition: background 0s;
  }
}

.message-item--selected .message-item__from {
  color: v-bind('selectedMessageColor')
}

.message-item--deleted {
  opacity: 0.5
}

.message-item__urgent-icon {
  color: rgb(190, 95, 0);
  padding-left: 1rem;
}

.message-item__checkbox {
  margin: 24px 24px 24px 0;
}

.message-item__from {
  color: #2c3e50;
  font-weight: bold;
  transition: all 250ms;
}

.message-item__subject {
  font-size: 0.85rem;
}

.message-item__timestamp {
  width: 3.5rem;
  font-size: 0.75rem;
  margin-left: 1rem;
  text-align: right;
}

.message-item__popover {
  background-color: rgb(240, 240, 240);
  width: 500px;
  padding: .75rem;
}

.message-item__right-cell {
  display: flex;
  margin-left: auto;
}
</style>
