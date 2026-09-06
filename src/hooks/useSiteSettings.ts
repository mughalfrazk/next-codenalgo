import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { fetchSiteSettings, saveSiteSettings } from '@/data/siteSettings'
import type { SiteSettings } from '@/models/siteSettings'

const QUERY_KEY = ['site-settings']

export function useSiteSettings() {
  return useQuery({ queryKey: QUERY_KEY, queryFn: fetchSiteSettings })
}

export function useSaveSiteSettings() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (settings: SiteSettings) => saveSiteSettings(settings),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: QUERY_KEY }),
  })
}
