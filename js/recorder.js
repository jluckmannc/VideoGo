/**
 * Recorder.js - Simulación de grabación con timer
 * Tracks recording state, duration, and segments
 */

const Recorder = {
  isRecording: false,
  startTime: null,
  pausedTime: 0,
  segments: 1,
  intervalId: null,

  /**
   * Iniciar grabación
   */
  start() {
    if (this.isRecording) return;

    this.isRecording = true;
    this.startTime = Date.now() - this.pausedTime;
    this.segments = 1;

    // Persistir estado
    Storage.setCurrentRecording({
      isRecording: true,
      startTime: this.startTime,
      segments: this.segments,
      timestamp: new Date().toISOString()
    });

    // Actualizar timer cada segundo
    this.intervalId = setInterval(() => this.updateTimer(), 1000);
  },

  /**
   * Pausar grabación
   */
  pause() {
    if (!this.isRecording) return;

    this.isRecording = false;
    this.pausedTime = Date.now() - this.startTime;

    if (this.intervalId) clearInterval(this.intervalId);

    Storage.setCurrentRecording({
      isRecording: false,
      startTime: this.startTime,
      segments: this.segments,
      timestamp: new Date().toISOString()
    });
  },

  /**
   * Reanudar grabación
   */
  resume() {
    if (this.isRecording) return;
    this.start();
  },

  /**
   * Detener grabación y guardar
   */
  stop() {
    if (!this.isRecording) return;

    if (this.intervalId) clearInterval(this.intervalId);

    const duration = Date.now() - this.startTime;
    const durationSeconds = Math.floor(duration / 1000);

    // Guardar grabación en historial
    const recording = Storage.addRecording({
      startTime: new Date(this.startTime).toISOString(),
      duration: durationSeconds,
      segments: this.segments,
      size: this.estimateSize(durationSeconds)
    });

    // Limpiar estado
    this.isRecording = false;
    this.startTime = null;
    this.pausedTime = 0;
    this.segments = 1;
    Storage.setCurrentRecording(null);

    return recording;
  },

  /**
   * Marcar segmento
   */
  markSegment() {
    if (!this.isRecording) return;
    this.segments++;
  },

  /**
   * Obtener tiempo actual de grabación en MM:SS:MS
   */
  getFormattedTime() {
    if (!this.isRecording && this.pausedTime === 0) return '00:00:00';

    const elapsed = this.isRecording ? Date.now() - this.startTime : this.pausedTime;
    const seconds = Math.floor(elapsed / 1000);

    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return [hours, minutes, secs]
      .map(n => String(n).padStart(2, '0'))
      .join(':');
  },

  /**
   * Obtener duración en segundos
   */
  getDurationSeconds() {
    if (!this.isRecording && this.pausedTime === 0) return 0;
    const elapsed = this.isRecording ? Date.now() - this.startTime : this.pausedTime;
    return Math.floor(elapsed / 1000);
  },

  /**
   * Restaurar estado desde sessionStorage si app se recargó
   */
  restore() {
    const current = Storage.getCurrentRecording();
    if (current && current.isRecording) {
      this.startTime = current.startTime;
      this.pausedTime = 0;
      this.segments = current.segments || 1;
      this.isRecording = true;
      this.intervalId = setInterval(() => this.updateTimer(), 1000);
    }
  },

  /**
   * Actualizar timer en UI (debe ser implementado por la pantalla)
   */
  updateTimer() {
    // Callback que pueden registrar las pantallas
    if (window.recorderUpdateCallback) {
      window.recorderUpdateCallback({
        time: this.getFormattedTime(),
        seconds: this.getDurationSeconds(),
        segments: this.segments,
        isRecording: this.isRecording
      });
    }
  },

  /**
   * Estimar tamaño de archivo (mock)
   * ~1.5MB por segundo (video HD typical)
   */
  estimateSize(durationSeconds) {
    const sizeInMB = durationSeconds * 1.5 / 1000;
    if (sizeInMB < 1) return Math.round(sizeInMB * 100) / 100 + ' MB';
    const sizeInGB = sizeInMB / 1024;
    return Math.round(sizeInGB * 100) / 100 + ' GB';
  }
};
