/**
 * Encapsulates the element ID counter so there is no global mutable state.
 * A fresh IdGenerator is created per codegen() call, ensuring IDs start at 1
 * for every render and never leak across calls.
 */
export class IdGenerator {
  private counter = 0;

  /** Returns the next unique string ID. */
  next(): string {
    return String(++this.counter);
  }

  /** Returns a random seed value used by Excalidraw for roughness rendering. */
  static seed(): number {
    return Math.floor(Math.random() * 9999);
  }
}
