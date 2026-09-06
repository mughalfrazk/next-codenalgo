import { afterEach, vi } from 'vitest'
import { cleanup } from '@testing-library/react'

// Cleanup RTL renders after each test
afterEach(() => cleanup())

// next/font/google relies on a Next.js SWC/Babel transform that isn't applied
// under Vitest, so stub it with a lightweight fake that matches its shape.
vi.mock('next/font/google', () => {
  const makeFont = () => () => ({ className: '', variable: '', style: {} })
  return { Archivo_Black: makeFont(), Plus_Jakarta_Sans: makeFont() }
})

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

// ResizeObserver is not available in jsdom — used by Mantine's ScrollArea/AppShell
class MockResizeObserver {
  observe = vi.fn()
  disconnect = vi.fn()
  unobserve = vi.fn()
}
global.ResizeObserver = MockResizeObserver as unknown as typeof ResizeObserver

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
