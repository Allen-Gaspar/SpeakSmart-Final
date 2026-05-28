// Speech Recognition Manager
export class SpeechRecognitionManager {
  constructor() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    this.recognition = new SpeechRecognition();
    this.isListening = false;
    this.transcript = '';
    this.listeners = [];
    
    // Setup recognition
    this.recognition.continuous = false;
    this.recognition.interimResults = true;
    this.recognition.lang = 'en-US';

    this.setupListeners();
  }

  setupListeners() {
    this.recognition.onstart = () => {
      this.isListening = true;
      this.notifyListeners('start');
      console.log("[v0] Speech recognition started");
    };

    this.recognition.onresult = (event) => {
      let interim = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          this.transcript += transcript + ' ';
        } else {
          interim += transcript;
        }
      }
      this.notifyListeners('result', { transcript: this.transcript, interim });
    };

    this.recognition.onerror = (event) => {
      console.error("[v0] Speech recognition error:", event.error);
      this.notifyListeners('error', event.error);
    };

    this.recognition.onend = () => {
      this.isListening = false;
      this.notifyListeners('end', { transcript: this.transcript });
      console.log("[v0] Speech recognition ended");
    };
  }

  start(language = 'en-US') {
    this.transcript = '';
    this.recognition.lang = language;
    this.recognition.start();
  }

  stop() {
    this.recognition.stop();
  }

  abort() {
    this.recognition.abort();
  }

  isSupported() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    return !!SpeechRecognition;
  }

  subscribe(callback) {
    this.listeners.push(callback);
  }

  notifyListeners(event, data) {
    this.listeners.forEach(callback => callback(event, data));
  }
}

// Create singleton instance
export const speechManager = new SpeechRecognitionManager();

// Check browser support
window.addEventListener('load', () => {
  if (speechManager.isSupported()) {
    console.log("[v0] Speech Recognition API supported");
  } else {
    console.warn("[v0] Speech Recognition API not supported");
  }
});
