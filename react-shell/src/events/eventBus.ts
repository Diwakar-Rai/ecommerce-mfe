type EventHandler<T = unknown> = (payload: T) => void;

class EventBus {
  private listeners = new Map<string, Set<EventHandler>>();

  on<T>(eventName: string, handler: EventHandler<T>): () => void {
    let handlers = this.listeners.get(eventName);
    if (!handlers) {
      handlers = new Set<EventHandler>();
      this.listeners.set(eventName, handlers);
    }

    const listener = handler as EventHandler;
    handlers.add(listener);

    return () => this.off(eventName, listener);
  }

  emit<T>(eventName: string, payload: T): void {
    const handlers = this.listeners.get(eventName);

    if (!handlers) return;
    for (const handler of [...handlers]) {
      handler(payload);
    }
  }

  off(eventName: string, handler: EventHandler): void {
    const handlers = this.listeners.get(eventName);
    if (!handlers) return;
    handlers.delete(handler);

    if (handlers.size === 0) {
      this.listeners.delete(eventName);
    }
  }

  clear(eventName: string): void {
    this.listeners.delete(eventName);
  }
}

export const eventBus = new EventBus();
