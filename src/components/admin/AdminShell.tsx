'use client'

import {
  ActionIcon,
  AppShell,
  Group,
  Image,
  Loader,
  Menu,
  NavLink,
  Text,
  useMantineColorScheme,
} from '@mantine/core'
import { CaretDownIcon, GearIcon, ListIcon, MoonIcon, SunIcon } from '@phosphor-icons/react'
import { signOut } from 'firebase/auth'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useAuth } from '@/lib/firebase/AuthProvider'
import { getFirebaseAuth } from '@/lib/firebase/client'

const NAV_LINKS = [{ label: 'Site Settings', href: '/admin/settings', icon: GearIcon }]

export function AdminShell({ children }: { children: React.ReactNode }) {
  const [navOpen, setNavOpen] = useState(true)
  const { user, loading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  const { colorScheme, toggleColorScheme } = useMantineColorScheme()

  useEffect(() => {
    if (!loading && !user && pathname !== '/admin/login') {
      router.replace('/admin/login')
    }
  }, [loading, user, pathname, router])

  if (pathname === '/admin/login') return <>{children}</>

  if (loading) {
    return (
      <Group justify="center" mt="xl">
        <Loader />
      </Group>
    )
  }

  if (!user) return null

  return (
    <AppShell
      header={{ height: 68 }}
      navbar={{ width: navOpen ? 220 : 68, breakpoint: 'sm', collapsed: { mobile: !navOpen } }}
      padding={{ base: 20, sm: 36, lg: 44 }}
      styles={{
        header: {
          background: 'var(--admin-surface)',
          borderBottom: '1px solid var(--admin-border)',
        },
        navbar: {
          background: 'var(--admin-surface)',
          borderRight: '1px solid var(--admin-border)',
        },
        main: { background: 'var(--admin-bg)' },
      }}
    >
      <AppShell.Header>
        <Group h="100%" px={32} justify="space-between">
          <Group gap={12}>
            <ActionIcon
              className="admin-icon-btn"
              size={34}
              variant="default"
              onClick={() => setNavOpen((o) => !o)}
              aria-label="Toggle sidebar"
            >
              <ListIcon size={18} weight="regular" />
            </ActionIcon>
            <Image src="/logo-icon.jpg" alt="Code & Algo" w={32} h={32} radius={9} />
            <div>
              <Text
                className="admin-logo-word"
                fz={16}
                style={{ fontFamily: 'var(--font-archivo), sans-serif' }}
              >
                CODE &amp; ALGO
              </Text>
              <Text className="admin-muted" fz={12} mt={-2}>
                Admin
              </Text>
            </div>
          </Group>
          <Group gap={14}>
            <ActionIcon
              className="admin-icon-btn"
              size={34}
              radius="xl"
              variant="default"
              onClick={() => toggleColorScheme()}
              aria-label="Toggle color scheme"
            >
              {colorScheme === 'dark' ? (
                <SunIcon size={16} weight="regular" />
              ) : (
                <MoonIcon size={16} weight="regular" />
              )}
            </ActionIcon>
            <Menu position="bottom-end" width={160} keepMounted>
              <Menu.Target>
                <Group gap={6} style={{ cursor: 'pointer' }}>
                  <Text fz={14}>{user.email}</Text>
                  <CaretDownIcon size={12} weight="regular" />
                </Group>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item onClick={() => signOut(getFirebaseAuth())}>Sign out</Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p={10}>
        {NAV_LINKS.map((link) => {
          const Icon = link.icon
          const active = pathname === link.href
          return (
            <NavLink
              key={link.href}
              href={link.href}
              label={navOpen ? link.label : undefined}
              title={navOpen ? undefined : link.label}
              leftSection={<Icon size={18} weight="regular" />}
              active={active}
              className={`admin-nav-item${active ? ' admin-nav-active' : ''}${navOpen ? '' : ' admin-nav-item-collapsed'}`}
              mb={4}
            />
          )
        })}
      </AppShell.Navbar>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  )
}
