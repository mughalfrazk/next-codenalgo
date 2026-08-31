import { afterEach, vi } from 'vitest'
import { cleanup } from '@testing-library/react'

// Cleanup RTL renders after each test
afterEach(() => cleanup())

// IntersectionObserver is not available in jsdom — must be a class (not arrow fn)
class MockIntersectionObserver {
  private cb: IntersectionObserverCallback
  observe = vi.fn().mockImplementation((el: Element) => {
    this.cb(
      [{ isIntersecting: true, target: el } as IntersectionObserverEntry],
      this as unknown as IntersectionObserver
    )
  })
  disconnect = vi.fn()
  unobserve = vi.fn()
  constructor(cb: IntersectionObserverCallback) {
    this.cb = cb
  }
}
global.IntersectionObserver = MockIntersectionObserver as unknown as typeof IntersectionObserver

// requestAnimationFrame completes animation in a single tick (p >= 1 always)
global.requestAnimationFrame = vi.fn().mockImplementation((cb: FrameRequestCallback) => {
  cb(performance.now() + 999_999)
  return 1
})
global.cancelAnimationFrame = vi.fn()

// matchMedia is not available in jsdom
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})
