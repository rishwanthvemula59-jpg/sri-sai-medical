<script setup>
import { ref, computed, onMounted } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { useChatStore } from '@/stores/chatStore'
import { initializeVoiceRecognition, synthesizeText, checkVoiceSupport, INDIAN_LANGUAGES } from '@/services/voiceService'

const userStore = useUserStore()
const chatStore = useChatStore()

const isListening = ref(false)
const isSpeaking = ref(false)
const recognizedText = ref('')
const voiceSupported = ref(false)
const recognitionControl = ref(null)
const showSettings = ref(false)

const supportsVoice = computed(() => voiceSupported.value && userStore.voiceEnabled)

onMounted(() => {
  const support = checkVoiceSupport()
  voiceSupported.value = support.isSupported
  
  if (voiceSupported.value) {
    recognitionControl.value = initializeVoiceRecognition(
      userStore.preferredLanguage,
      (result) => {
        recognizedText.value = result.text
        if (result.isFinal) {
          // Send recognized text to chatbot
          handleRecognizedText(result.text)
        }
      },
      (error) => {
        console.error('Voice error:', error)
        isListening.value = false
      }
    )
  }
})

const toggleListening = () => {
  if (!recognitionControl.value) return
  
  if (isListening.value) {
    recognitionControl.value.stop()
    isListening.value = false
  } else {
    recognizedText.value = ''
    recognitionControl.value.setLanguage(userStore.preferredLanguage)
    recognitionControl.value.start()
    isListening.value = true
  }
}

const handleRecognizedText = (text) => {
  chatStore.openChat()
  chatStore.sendUserMessage(text)
  recognizedText.value = ''
  isListening.value = false
}

const toggleLanguage = () => {
  showSettings.value = !showSettings.value
}

const changeLanguage = (language) => {
  userStore.setLanguage(language)
  if (recognitionControl.value) {
    recognitionControl.value.setLanguage(language)
  }
  showSettings.value = false
}

const speakTest = (msg = "नमस्ते! मैं आपका स्वास्थ्य सहायक हूँ।") => {
  synthesizeText({
    text: msg,
    language: userStore.preferredLanguage,
    onStart: () => {
      isSpeaking.value = true
    },
    onEnd: () => {
      isSpeaking.value = false
    },
  })
}
</script>

<template>
  <!-- Voice Assistant Floating Button -->
  <div v-if="supportsVoice" class="fixed top-24 right-lg z-30 flex flex-col items-end gap-md">
    <!-- Language Settings -->
    <div v-if="showSettings" class="surf-container rounded-2xl shadow-lg p-lg border border-neutral-100 min-w-[200px] animate-scale-in">
      <p class="text-xs font-600 text-secondary mb-md">Select Language</p>
      <div class="space-y-sm max-h-60 overflow-y-auto">
        <button
          v-for="(lang, code) in INDIAN_LANGUAGES"
          :key="code"
          @click="changeLanguage(code)"
          :class="[
            'w-full text-left px-md py-sm rounded-lg text-sm transition-colors',
            userStore.preferredLanguage === code
              ? 'bg-primary-50 text-primary-950 font-600'
              : 'hover:bg-neutral-50 text-secondary'
          ]"
        >
          {{ lang.name }}
        </button>
      </div>
    </div>

    <!-- Main Voice Button -->
    <div class="flex flex-col gap-md">
      <!-- Microphone Button -->
      <button
        @click="toggleListening"
        :class="[
          'w-14 h-14 rounded-full flex items-center justify-center transition-all duration-fast transform hover:scale-110 shadow-lg',
          isListening
            ? 'bg-danger-600 animate-pulse'
            : 'bg-gradient-to-br from-blue-500 to-blue-600 hover:shadow-xl'
        ]"
        title="Click to speak"
      >
        <span class="text-2xl">🎤</span>
      </button>

      <!-- Settings Button -->
      <button
        @click="toggleLanguage"
        :class="[
          'w-12 h-12 rounded-full flex items-center justify-center transition-all duration-fast surf-container hover:bg-neutral-100 shadow-md border border-neutral-100',
          showSettings ? 'bg-neutral-100' : ''
        ]"
        title="Voice settings"
      >
        <span class="text-xl">⚙️</span>
      </button>
    </div>

    <!-- Recognized Text Tooltip -->
    <div
      v-if="recognizedText"
      class="surf-container rounded-lg shadow-md px-lg py-md border border-neutral-100 text-xs text-secondary max-w-xs animate-slide-up"
    >
      <p class="font-500 mb-sm">Recognized:</p>
      <p>{{ recognizedText }}</p>
    </div>
  </div>

  <!-- Fallback notification if voice not supported -->
  <div v-if="!voiceSupported && userStore.voiceEnabled" class="fixed top-24 right-lg z-30">
    <div class="surf-container rounded-lg shadow-md px-lg py-md border border-neutral-100 text-xs text-secondary">
      <p>Voice not supported in your browser</p>
    </div>
  </div>
</template>

<style scoped>
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>
