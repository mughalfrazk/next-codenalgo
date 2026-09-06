'use client'

import {
  Alert,
  Button,
  Card,
  Divider,
  Loader,
  SimpleGrid,
  Stack,
  TextInput,
  Title,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { notifications } from '@mantine/notifications'
import { useEffect } from 'react'
import { useSaveSiteSettings, useSiteSettings } from '@/hooks/useSiteSettings'
import type { SiteSettings, SocialLink } from '@/models/siteSettings'

const EMPTY: SiteSettings = {
  name: '',
  tagline: '',
  email: '',
  phone: '',
  address: '',
  addressShort: '',
  businessHours: '',
  url: '',
  legal: '',
  socials: [],
}

const SOCIAL_PLATFORMS: Array<Pick<SocialLink, 'label' | 'short'>> = [
  { label: 'LinkedIn', short: 'in' },
  { label: 'Facebook', short: 'fb' },
  { label: 'Instagram', short: 'ig' },
]

type FormValues = SiteSettings & { socialHandles: Record<string, string> }

function toFormValues(settings: SiteSettings): FormValues {
  const socialHandles: Record<string, string> = {}
  for (const platform of SOCIAL_PLATFORMS) {
    const existing = settings.socials.find((s) => s.label === platform.label)
    socialHandles[platform.label] = existing ? existing.href.replace(/^https?:\/\//, '') : ''
  }
  return { ...settings, socialHandles }
}

function toSiteSettings(values: FormValues): SiteSettings {
  const socials: SocialLink[] = SOCIAL_PLATFORMS.filter((platform) =>
    values.socialHandles[platform.label]?.trim()
  ).map((platform) => {
    const handle = values.socialHandles[platform.label].trim()
    return {
      label: platform.label,
      short: platform.short,
      href: /^https?:\/\//.test(handle) ? handle : `https://${handle}`,
    }
  })
  const { socialHandles: _socialHandles, ...rest } = values
  return { ...rest, socials }
}

export function SiteSettingsForm() {
  const { data, isLoading, isError, error, refetch } = useSiteSettings()
  const save = useSaveSiteSettings()

  const form = useForm<FormValues>({ initialValues: toFormValues(EMPTY) })

  useEffect(() => {
    if (data) form.setValues(toFormValues(data))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  function handleSubmit(values: FormValues) {
    save.mutate(toSiteSettings(values), {
      onSuccess: () =>
        notifications.show({ title: 'Saved', message: 'Site settings updated.', color: 'green' }),
      onError: () =>
        notifications.show({ title: 'Error', message: 'Could not save settings.', color: 'red' }),
    })
  }

  if (isLoading) return <Loader />

  if (isError) {
    return (
      <Alert color="red" title="Could not load site settings">
        {error instanceof Error ? error.message : 'Something went wrong.'}
        <Button variant="light" size="xs" mt="sm" onClick={() => refetch()}>
          Retry
        </Button>
      </Alert>
    )
  }

  return (
    <Stack maw={800} gap={24}>
      <Title order={2} className="admin-heading">
        Site Settings
      </Title>
      <Card className="admin-card" padding={40} radius={20}>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack className="admin-input" gap={24}>
            <SimpleGrid cols={{ base: 1, sm: 2 }} spacing={20} verticalSpacing={20}>
              <TextInput label="Company name" {...form.getInputProps('name')} />
              <TextInput label="Tagline" {...form.getInputProps('tagline')} />
              <TextInput label="Email" {...form.getInputProps('email')} />
              <TextInput label="Phone" {...form.getInputProps('phone')} />
              <TextInput label="Address" {...form.getInputProps('address')} />
              <TextInput label="Short address" {...form.getInputProps('addressShort')} />
              <TextInput label="Business hours" {...form.getInputProps('businessHours')} />
              <TextInput label="Website URL" {...form.getInputProps('url')} />
              <TextInput label="Legal footer text" {...form.getInputProps('legal')} />
            </SimpleGrid>

            <Divider />

            <Title order={4} className="admin-heading">
              Social links
            </Title>
            <Stack gap={20}>
              {SOCIAL_PLATFORMS.map((platform) => (
                <TextInput
                  key={platform.label}
                  label={platform.label}
                  {...form.getInputProps(`socialHandles.${platform.label}`)}
                />
              ))}
            </Stack>

            <Button
              type="submit"
              loading={save.isPending}
              className="admin-gradient-btn"
              mt={8}
              w="fit-content"
            >
              Save changes
            </Button>
          </Stack>
        </form>
      </Card>
    </Stack>
  )
}
