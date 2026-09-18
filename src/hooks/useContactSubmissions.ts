import { useQuery } from '@tanstack/react-query'
import { fetchContactSubmissions } from '@/data/contactSubmissions'

const QUERY_KEY = ['contact-submissions']

export function useContactSubmissions() {
  return useQuery({ queryKey: QUERY_KEY, queryFn: fetchContactSubmissions })
}
