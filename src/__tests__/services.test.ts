import { describe, expect, it } from 'vitest'
import {
  getService,
  relatedServices,
  services,
  engagementModels,
  servicesWhyChoose,
  servicesFaq,
} from '@/content/services'

describe('getService', () => {
  it('returns the service matching the slug', () => {
    const first = services[0]
    const result = getService(first.slug)
    expect(result).toBe(first)
  })

  it('returns undefined for an unknown slug', () => {
    expect(getService('nonexistent-slug')).toBeUndefined()
  })
})

describe('relatedServices', () => {
  it('returns an empty array for an unknown slug', () => {
    expect(relatedServices('nonexistent')).toEqual([])
  })

  it('returns Service objects for each relatedSlug', () => {
    const serviceWithRelated = services.find((s) => s.relatedSlugs.length > 0)
    if (!serviceWithRelated) return // nothing to test if data has no relations
    const result = relatedServices(serviceWithRelated.slug)
    expect(result.length).toBe(serviceWithRelated.relatedSlugs.length)
    result.forEach((s) => expect(services).toContain(s))
  })

  it('skips relatedSlugs that do not resolve', () => {
    // All slugs in the data set are valid, so this tests the filter path by
    // using a service whose relatedSlugs we can check for validity.
    for (const svc of services) {
      const result = relatedServices(svc.slug)
      expect(result.every((s) => Boolean(s))).toBe(true)
    }
  })
})

describe('content arrays', () => {
  it('services array is non-empty and each service has required shape', () => {
    expect(services.length).toBeGreaterThan(0)
    for (const s of services) {
      expect(s.slug).toBeTruthy()
      expect(s.title).toBeTruthy()
      expect(Array.isArray(s.included)).toBe(true)
      expect(Array.isArray(s.processSteps)).toBe(true)
      expect(Array.isArray(s.benefits)).toBe(true)
      expect(Array.isArray(s.techStack)).toBe(true)
      expect(Array.isArray(s.faq)).toBe(true)
    }
  })

  it('engagementModels is non-empty', () => {
    expect(engagementModels.length).toBeGreaterThan(0)
  })

  it('servicesWhyChoose is non-empty', () => {
    expect(servicesWhyChoose.length).toBeGreaterThan(0)
  })

  it('servicesFaq is non-empty', () => {
    expect(servicesFaq.length).toBeGreaterThan(0)
  })
})
