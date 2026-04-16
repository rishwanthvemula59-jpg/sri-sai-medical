<script setup>
import { useChatStore } from '@/stores/chatStore'
import { ref, computed, nextTick } from 'vue'

const chatStore = useChatStore()
const messageInput = ref('')
const messagesContainer = ref(null)

const isLoading = computed(() => chatStore.loading)

const handleSendMessage = async () => {
  if (!messageInput.value.trim()) return
  
  const text = messageInput.value
  messageInput.value = ''
  
  await chatStore.sendUserMessage(text)
  
  // Scroll to bottom
  await nextTick()
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
  }
}

const handleQuickSuggestion = (suggestion) => {
  messageInput.value = suggestion.text
  handleSendMessage()
}

const openChat = () => chatStore.openChat()
</script>

<template>
  <!-- Chat Floating Button -->
  <div
    v-if="!chatStore.isOpen"
    @click="openChat"
    class="fixed bottom-lg right-lg z-40 w-14 h-14 rounded-full bg-gradient-to-br from-primary-950 to-primary-700 shadow-lg hover:shadow-xl cursor-pointer flex items-center justify-center transform hover:scale-110 transition-all duration-fast group"
  >
    <span class="text-2xl">💬</span>
    <div v-if="chatStore.unreadCount > 0" class="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-danger-600 text-white text-xs font-bold flex items-center justify-center">
      {{ chatStore.unreadCount }}
    </div>
  </div>

  <!-- Chat Panel -->
  <div
    v-if="chatStore.isOpen"
    class="fixed bottom-lg right-lg z-40 w-96 max-w-[calc(100vw-2rem)] h-[600px] max-h-[calc(100vh-8rem)] surf-container rounded-2xl shadow-3xl flex flex-col overflow-hidden"
  >
    <!-- Header -->
    <div class="bg-gradient-to-r from-primary-950 to-primary-700 text-white p-lg flex items-center justify-between">
      <div>
        <h3 class="font-manrope font-bold text-lg">Sri Sai Health Assistant</h3>
        <p class="text-sm text-primary-100">Always here to help 👋</p>
      </div>
      <button
        @click="chatStore.closeChat"
        class="hover:bg-primary-800 p-sm rounded-lg transition-colors"
      >
        <span class="text-xl">✕</span>
      </button>
    </div>

    <!-- Messages Container -->
    <div
      ref="messagesContainer"
      class="flex-1 overflow-y-auto p-lg space-y-md"
    >
      <div
        v-for="message in chatStore.messages"
        :key="message.id"
        :class="[
          'animate-slide-up',
          message.sender === 'user'
            ? 'flex justify-end'
            : 'flex justify-start'
        ]"
      >
        <div
          :class="[
            'max-w-xs px-lg py-md rounded-xl',
            message.sender === 'user'
              ? 'bg-primary-950 text-white rounded-br-none'
              : 'bg-neutral-100 text-primary rounded-bl-none'
          ]"
        >
          <p class="text-sm leading-relaxed">{{ message.text }}</p>
          <p :class="[
            'text-xs mt-sm',
            message.sender === 'user'
              ? 'text-primary-100'
              : 'text-tertiary'
          ]">
            {{ new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }}
          </p>
        </div>
      </div>

      <!-- Loading Indicator -->
      <div v-if="isLoading" class="flex justify-start">
        <div class="bg-neutral-100 px-lg py-md rounded-xl rounded-bl-none flex gap-sm">
          <span class="inline-block w-2 h-2 bg-neutral-400 rounded-full animate-bounce"></span>
          <span class="inline-block w-2 h-2 bg-neutral-400 rounded-full animate-bounce" style="animation-delay: 0.1s;"></span>
          <span class="inline-block w-2 h-2 bg-neutral-400 rounded-full animate-bounce" style="animation-delay: 0.2s;"></span>
        </div>
      </div>
    </div>

    <!-- Quick Suggestions (if no messages yet) -->
    <div
      v-if="chatStore.messages.length <= 1"
      class="px-lg py-md border-t border-neutral-100"
    >
      <p class="text-xs text-tertiary font-600 mb-md">Quick actions:</p>
      <div class="flex flex-wrap gap-sm">
        <button
          v-for="(suggestion, idx) in chatStore.suggestions.slice(0, 2)"
          :key="idx"
          @click="handleQuickSuggestion(suggestion)"
          class="px-md py-sm bg-neutral-100 hover:bg-primary-50 text-xs text-secondary rounded-lg transition-colors"
        >
          {{ suggestion.text }}
        </button>
      </div>
    </div>

    <!-- Input Area -->
    <div class="border-t border-neutral-100 p-lg">
      <div class="flex gap-md">
        <input
          v-model="messageInput"
          @keyup.enter="handleSendMessage"
          type="text"
          placeholder="Ask me anything..."
          class="flex-1 px-lg py-md rounded-lg border border-neutral-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-950"
        />
        <button
          @click="handleSendMessage"
          :disabled="!messageInput.trim() || isLoading"
          class="px-lg py-md bg-primary-950 hover:bg-primary-900 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-600"
        >
          <span v-if="!isLoading">Send</span>
          <span v-else class="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-4px); }
}
</style>
