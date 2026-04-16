// src/services/voiceService.js

// Get Speech Recognition API (cross-browser compatible)
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

// Supported Indian languages
export const INDIAN_LANGUAGES = {
  'en-IN': { name: 'English (India)', code: 'en' },
  'hi-IN': { name: 'हिंदी (Hindi)', code: 'hi' },
  'ta-IN': { name: 'தமிழ் (Tamil)', code: 'ta' },
  'te-IN': { name: 'తెలుగు (Telugu)', code: 'te' },
  'mr-IN': { name: 'मराठी (Marathi)', code: 'mr' },
  'bn-IN': { name: 'বাংলা (Bengali)', code: 'bn' },
  'gu-IN': { name: 'ગુજરાતી (Gujarati)', code: 'gu' },
  'kn-IN': { name: 'ಕನ್ನಡ (Kannada)', code: 'kn' },
  'ml-IN': { name: 'മലയാളം (Malayalam)', code: 'ml' },
  'or-IN': { name: 'ଓଡ଼ିଆ (Odia)', code: 'or' },
  'pa-IN': { name: 'ਪੰਜਾਬੀ (Punjabi)', code: 'pa' },
  'ur-IN': { name: 'اردو (Urdu)', code: 'ur' },
}

let recognition = null
let isListening = false

/**
 * Initialize speech recognition
 * @param {string} language - Language code (e.g., 'en-IN', 'hi-IN')
 * @param {Function} onResult - Callback with recognized text
 * @param {Function} onError - Error callback
 * @returns {Object} Recognition control methods
 */
export const initializeVoiceRecognition = (language = 'en-IN', onResult, onError) => {
  if (!SpeechRecognition) {
    console.warn('Speech Recognition API not supported')
    return null
  }
  
  if (!recognition) {
    recognition = new SpeechRecognition()
  }
  
  recognition.continuous = false
  recognition.interimResults = true
  recognition.language = language
  
  recognition.onstart = () => {
    isListening = true
  }
  
  recognition.onresult = (event) => {
    let interimTranscript = ''
    
    for (let i = event.resultIndex; i < event.results.length; i++) {
      const transcript = event.results[i][0].transcript
      
      if (event.results[i].isFinal) {
        onResult({
          text: transcript,
          isFinal: true,
          language,
        })
      } else {
        interimTranscript += transcript
      }
    }
    
    if (interimTranscript) {
      onResult({
        text: interimTranscript,
        isFinal: false,
        language,
      })
    }
  }
  
  recognition.onerror = (event) => {
    console.error('Speech recognition error:', event.error)
    onError(event.error)
  }
  
  recognition.onend = () => {
    isListening = false
  }
  
  return {
    start: () => {
      if (!isListening) {
        recognition.start()
      }
    },
    stop: () => {
      if (isListening) {
        recognition.stop()
      }
    },
    abort: () => recognition.abort(),
    setLanguage: (lang) => {
      recognition.language = lang
    },
  }
}

/**
 * Synthesize text to speech
 * @param {Object} params - Speech synthesis parameters
 * @param {string} params.text - Text to speak
 * @param {string} params.language - Language code
 * @param {number} params.rate - Speech rate (0.5 - 2.0)
 * @param {number} params.pitch - Pitch (0 - 2.0)
 * @param {Function} params.onStart - Callback when speech starts
 * @param {Function} params.onEnd - Callback when speech ends
 */
export const synthesizeText = ({
  text,
  language = 'en-IN',
  rate = 1,
  pitch = 1,
  volume = 1,
  onStart = () => {},
  onEnd = () => {},
}) => {
  if (!('speechSynthesis' in window)) {
    console.warn('Speech Synthesis API not supported')
    return null
  }
  
  // Cancel any ongoing speech
  window.speechSynthesis.cancel()
  
  const utterance = new SpeechSynthesisUtterance(text)
  utterance.lang = language
  utterance.rate = rate
  utterance.pitch = pitch
  utterance.volume = volume
  
  utterance.onstart = onStart
  utterance.onend = onEnd
  
  window.speechSynthesis.speak(utterance)
  
  return {
    pause: () => window.speechSynthesis.pause(),
    resume: () => window.speechSynthesis.resume(),
    stop: () => window.speechSynthesis.cancel(),
  }
}

/**
 * Check if device supports voice features
 * @returns {Object} Support status
 */
export const checkVoiceSupport = () => {
  return {
    speechRecognition: !!SpeechRecognition,
    speechSynthesis: 'speechSynthesis' in window,
    isSupported: !!SpeechRecognition && 'speechSynthesis' in window,
  }
}

/**
 * Get available voices
 * @returns {Array} Array of available voices
 */
export const getAvailableVoices = () => {
  if (!('speechSynthesis' in window)) return []
  
  return window.speechSynthesis.getVoices()
}

export default {
  initializeVoiceRecognition,
  synthesizeText,
  checkVoiceSupport,
  getAvailableVoices,
  INDIAN_LANGUAGES,
}
