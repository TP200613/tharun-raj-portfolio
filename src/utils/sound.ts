// Web Audio API Sound Synthesizer for tactile UI feedback & Speech Synthesis

class SoundEffects {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private voices: SpeechSynthesisVoice[] = [];
  private voiceGender: 'female' | 'male' = 'male';
  private currentlySpeaking: boolean = false;

  constructor() {
    this.initVoices();
  }

  private initCtx() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  private initVoices() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const loadVoices = () => {
        try {
          this.voices = window.speechSynthesis.getVoices();
        } catch {
          this.voices = [];
        }
      };

      loadVoices();
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = loadVoices;
      }
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (muted && typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      this.currentlySpeaking = false;
    }
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public setVoiceGender(gender: 'female' | 'male') {
    this.voiceGender = gender;
  }

  public getVoiceGender(): 'female' | 'male' {
    return this.voiceGender;
  }

  public isVoiceSpeaking(): boolean {
    return this.currentlySpeaking;
  }

  public stopSpeech() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      this.currentlySpeaking = false;
    }
  }

  public playClick() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(400, this.ctx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.06, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.04);
    } catch {
      // Audio context may be restricted by browser policy before first interaction
    }
  }

  public playKeypress() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(600 + Math.random() * 200, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.03, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.03);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.03);
    } catch {
      // Audio context may be restricted before interaction
    }
  }

  public playSuccess() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6

      notes.forEach((freq, index) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + index * 0.08);

        gain.gain.setValueAtTime(0.05, now + index * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, now + index * 0.08 + 0.25);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + index * 0.08);
        osc.stop(now + index * 0.08 + 0.25);
      });
    } catch {
      // Audio context may be restricted
    }
  }

  public playGreetingChime() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const chords = [523.25, 659.25, 783.99, 1046.5, 1318.5]; // C5, E5, G5, C6, E6

      chords.forEach((freq, index) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + index * 0.06);

        gain.gain.setValueAtTime(0.04, now + index * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.001, now + index * 0.06 + 0.35);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + index * 0.06);
        osc.stop(now + index * 0.06 + 0.35);
      });
    } catch {
      // Audio context may be restricted
    }
  }

  public speakText(text: string, onStart?: () => void, onEnd?: () => void) {
    if (this.isMuted) return;

    try {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        // Resume synthesis if paused (common Chrome issue)
        if (window.speechSynthesis.paused) {
          window.speechSynthesis.resume();
        }

        // Cancel previous speech
        window.speechSynthesis.cancel();

        // Ensure voices are fetched
        if (!this.voices || this.voices.length === 0) {
          this.voices = window.speechSynthesis.getVoices();
        }

        // Small delay so cancel doesn't abruptly drop new utterance in Chrome
        setTimeout(() => {
          try {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.rate = 1.02; // Natural, clear conversational pacing
            utterance.pitch = this.voiceGender === 'female' ? 1.08 : 0.95;
            utterance.volume = 0.95;

            // Select natural voice prioritizing male clear voice
            const availableVoices = this.voices.length > 0 ? this.voices : window.speechSynthesis.getVoices();

            let matchedVoice: SpeechSynthesisVoice | undefined;

            if (this.voiceGender === 'male') {
              // High priority male natural voices across Windows, Mac, Chrome, Edge, Android, iOS
              matchedVoice = availableVoices.find(
                (v) =>
                  v.lang.startsWith('en') &&
                  (v.name.includes('Microsoft David') ||
                    v.name.includes('Microsoft Mark') ||
                    v.name.includes('Microsoft Guy') ||
                    v.name.includes('Google UK English Male') ||
                    v.name.includes('Guy Online') ||
                    v.name.includes('Ryan') ||
                    v.name.includes('Daniel') ||
                    v.name.includes('Alex') ||
                    v.name.includes('Oliver') ||
                    v.name.includes('Fred') ||
                    v.name.includes('Tom') ||
                    v.name.includes('Aaron') ||
                    v.name.includes('Male') ||
                    v.name.includes('male')) &&
                  !v.name.includes('Female') &&
                  !v.name.includes('female') &&
                  !v.name.includes('Zira') &&
                  !v.name.includes('Jenny')
              );

              if (!matchedVoice) {
                matchedVoice = availableVoices.find(
                  (v) =>
                    v.lang.startsWith('en') &&
                    (v.name.includes('David') ||
                      v.name.includes('Mark') ||
                      v.name.includes('George') ||
                      v.name.includes('Guy') ||
                      v.name.includes('Male') ||
                      v.name.includes('male'))
                );
              }
            } else {
              matchedVoice = availableVoices.find(
                (v) =>
                  v.lang.startsWith('en') &&
                  (v.name.includes('Google UK English Female') ||
                    v.name.includes('Google US English') ||
                    v.name.includes('Natural') ||
                    v.name.includes('Jenny') ||
                    v.name.includes('Zira') ||
                    v.name.includes('Samantha') ||
                    v.name.includes('Victoria') ||
                    v.name.includes('Karen') ||
                    v.name.includes('Moira') ||
                    v.name.includes('Female') ||
                    v.name.includes('female'))
              );
            }

            // Fallback to English voice
            if (!matchedVoice) {
              matchedVoice =
                availableVoices.find((v) => v.lang.startsWith('en-US')) ||
                availableVoices.find((v) => v.lang.startsWith('en-GB')) ||
                availableVoices.find((v) => v.lang.startsWith('en-IN')) ||
                availableVoices.find((v) => v.lang.startsWith('en')) ||
                availableVoices[0];
            }

            if (matchedVoice) {
              utterance.voice = matchedVoice;
            }

            utterance.onstart = () => {
              this.currentlySpeaking = true;
              if (onStart) onStart();
            };

            utterance.onend = () => {
              this.currentlySpeaking = false;
              if (onEnd) onEnd();
            };

            utterance.onerror = () => {
              this.currentlySpeaking = false;
              if (onEnd) onEnd();
            };

            window.speechSynthesis.speak(utterance);
          } catch {
            this.currentlySpeaking = false;
            this.playGreetingChime();
            if (onEnd) onEnd();
          }
        }, 30);
      } else {
        this.playGreetingChime();
        if (onEnd) onEnd();
      }
    } catch {
      this.playGreetingChime();
      if (onEnd) onEnd();
    }
  }

  public playBeep(frequency = 440, duration = 0.08) {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'square';
      osc.frequency.setValueAtTime(frequency, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.03, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch {
      // Audio context may be restricted
    }
  }
}

export const soundFx = new SoundEffects();

