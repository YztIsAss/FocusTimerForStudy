// timerService.ts
type Setter<T> = (v: T) => void;

type ExternalSetters = {
  setDisplayTime?: Setter<number>;
  setIsRunning?: Setter<boolean>;
  setElapsed?: Setter<number>;
  setBeginTime?: Setter<number>;
  setPhase?: Setter<"idle" | "work" | "shortBreak" | "longBreak">;
};

const STORAGE_KEY = "countdownTimerState_v1";

class TimerService {
  private static instance: TimerService | null = null;

  private targetMs = 0;
  private startedAt: number | null = null;
  private pausedElapsed = 0;
  private isRunning = false;
  private tickId: number | null = null;
  private externalSetters: ExternalSetters = {};
  private onFinishCallbacks: (() => void)[] = [];
  private phase: "idle" | "work" | "shortBreak" | "longBreak" = "idle";

  private constructor() {
    this.restoreFromStorage();
    document.addEventListener("visibilitychange", () => this.forceTick());
    window.addEventListener("storage", (e) => {
      if (e.key === STORAGE_KEY) {
        this.restoreFromStorage();
        this.forceTick();
      }
    });
  }

  static getInstance() {
    if (!TimerService.instance) TimerService.instance = new TimerService();
    return TimerService.instance;
  }

  init(externalSetters: ExternalSetters = {}) {
    this.externalSetters = externalSetters;
    this.forceTick();
    this.externalSetters.setPhase?.(this.phase);
  }

  setPhase(p: "idle" | "work" | "shortBreak" | "longBreak") {
    this.phase = p;
    this.externalSetters.setPhase?.(p);
    this.saveToStorage();
  }

  getPhase() {
    return this.phase;
  }

  setTarget(ms: number) {
    this.targetMs = Math.max(0, Math.floor(ms));
    this.saveToStorage();
    this.forceTick();
  }

  start() {
    if (this.isRunning) return;
    const now = Date.now();
    this.startedAt = now - this.pausedElapsed;
    this.isRunning = true;
    this.saveToStorage();
    this.startTicker();
    this.externalSetters.setIsRunning?.(true);
  }

  pause() {
    if (!this.isRunning) return;
    const elapsed = this.getElapsed();
    this.pausedElapsed = elapsed;
    this.startedAt = null;
    this.isRunning = false;
    this.stopTicker();
    this.saveToStorage();
    this.externalSetters.setElapsed?.(this.pausedElapsed);
    this.externalSetters.setIsRunning?.(false);
    this.forceTick();
  }

  reset() {
    this.stopTicker();
    this.startedAt = null;
    this.pausedElapsed = 0;
    this.isRunning = false;
    this.targetMs = 0;
    this.phase = "idle";
    this.saveToStorage();
    this.externalSetters.setDisplayTime?.(0);
    this.externalSetters.setElapsed?.(0);
    this.externalSetters.setIsRunning?.(false);
    this.externalSetters.setPhase?.(this.phase);
  }

  private getElapsed(): number {
    if (this.isRunning && this.startedAt != null) {
      return Date.now() - this.startedAt;
    } else {
      return this.pausedElapsed;
    }
  }

  getRemaining() {
    const rem = Math.max(0, this.targetMs - this.getElapsed());
    return rem;
  }

  onFinish(cb: () => void) {
    this.onFinishCallbacks.push(cb);
  }

  private startTicker() {
    if (this.tickId != null) return;
    this.tickId = window.setInterval(() => this.tick(), 200);
    this.tick();
  }

  private stopTicker() {
    if (this.tickId != null) {
      clearInterval(this.tickId);
      this.tickId = null;
    }
  }

  private tick() {
    const remaining = this.getRemaining();
    this.externalSetters.setDisplayTime?.(remaining);
    this.externalSetters.setElapsed?.(this.getElapsed());
    if (remaining <= 0 && this.isRunning) {
      this.isRunning = false;
      this.stopTicker();
      this.startedAt = null;
      this.pausedElapsed = this.targetMs;
      this.saveToStorage();
      this.playBeep();
      this.externalSetters.setIsRunning?.(false);
      // notify external about current phase finishing (external can call setPhase to change)
      // keep phase value as-is; external decides next phase
      this.onFinishCallbacks.forEach((cb) => {
        try { cb(); } catch (e) { console.error(e); }
      });
    }
  }

  forceTick() {
    this.tick();
  }

  displayTick() {
    const remaining = this.getRemaining();
    this.externalSetters.setDisplayTime?.(remaining);
  }

  private saveToStorage() {
    const payload = {
      targetMs: this.targetMs,
      startedAt: this.startedAt,
      pausedElapsed: this.pausedElapsed,
      isRunning: this.isRunning,
      phase: this.phase,
      savedAt: Date.now(),
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch (e) {
      console.warn("Could not save timer state", e);
    }
    try {
      localStorage.setItem(`${STORAGE_KEY}_ping`, Date.now().toString());
    } catch {}
  }

  private restoreFromStorage() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw);
      this.targetMs = parsed.targetMs ?? this.targetMs;
      this.startedAt = parsed.startedAt ?? null;
      this.pausedElapsed = parsed.pausedElapsed ?? 0;
      this.isRunning = parsed.isRunning ?? false;
      this.phase = parsed.phase ?? this.phase;
      if (this.isRunning) {
        this.startTicker();
      } else {
        this.stopTicker();
      }
    } catch (e) {
      console.warn("Failed to restore timer state", e);
    }
  }
  // シンプルなビープ音（WebAudioAPI）
  private playBeep() {
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const now = ctx.currentTime;
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = "sine";
      o.frequency.value = 880; // A5-ish beep
      g.gain.value = 0.0001;
      o.connect(g);
      g.connect(ctx.destination);
      // ramp
      g.gain.setValueAtTime(0.0001, now);
      g.gain.exponentialRampToValueAtTime(0.2, now + 0.01);
      o.start(now);
      g.gain.exponentialRampToValueAtTime(0.0001, now + 1.0);
      o.stop(now + 1.05);
      // close audio context after a bit
      setTimeout(() => {
        try { ctx.close(); } catch {}
      }, 1500);
    } catch (e) {
      console.warn("Cannot play beep:", e);
    }
  }
}

export default TimerService.getInstance();
export type { ExternalSetters };
