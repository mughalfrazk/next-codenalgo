'use client'

import {
  Alert,
  Avatar,
  Button,
  Badge,
  Card,
  Divider,
  Group,
  Loader,
  Modal,
  Stack,
  Table,
  Title,
} from '@mantine/core'
import { useState } from 'react'
import { useContactSubmissions } from '@/hooks/useContactSubmissions'
import type { ContactSubmission, EmailStatus } from '@/models/contactSubmission'

const STATUS_LABEL: Partial<Record<EmailStatus, { label: string; color: string }>> = {
  sent: { label: 'Sent', color: 'blue' },
  skipped: { label: 'Skipped', color: 'gray' },
  failed: { label: 'Failed', color: 'red' },
}

function formatRelativeTime(timestamp: number): string {
  const diffMs = Date.now() - timestamp
  const minutes = Math.round(diffMs / 60_000)
  if (minutes < 1) return 'just now'
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.round(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.round(hours / 24)
  if (days < 7) return `${days}d ago`
  const weeks = Math.round(days / 7)
  return `${weeks}w ago`
}

function truncate(text: string, max: number): string {
  return text.length > max ? `${text.slice(0, max).trimEnd()}…` : text
}

function initials(name: string): string {
  const parts = name.trim().split(/\s+/)
  return (parts[0][0] + (parts[1]?.[0] ?? '')).toUpperCase()
}

export function SubmissionsTable() {
  const { data, isLoading, isError, error, refetch } = useContactSubmissions()
  const [selected, setSelected] = useState<ContactSubmission | null>(null)

  if (isLoading) return <Loader />

  if (isError) {
    return (
      <Alert color="red" title="Could not load submissions">
        {error instanceof Error ? error.message : 'Something went wrong.'}
        <Button variant="light" size="xs" mt="sm" onClick={() => refetch()}>
          Retry
        </Button>
      </Alert>
    )
  }

  /* v8 ignore next -- react-query guarantees data is defined once isLoading/isError are false */
  const submissions = data ?? []

  return (
    <Stack gap={24}>
      <Title order={2} className="admin-heading">
        Submissions
      </Title>
      <Card className="admin-card" padding={0} radius={20}>
        <Table verticalSpacing={16} horizontalSpacing={24} highlightOnHover>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Name</Table.Th>
              <Table.Th>Email</Table.Th>
              <Table.Th>Message</Table.Th>
              <Table.Th>Received</Table.Th>
              <Table.Th>Email</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {submissions.map((submission) => {
              const status = STATUS_LABEL[submission.emailStatus]
              return (
                <Table.Tr
                  key={submission.id}
                  onClick={() => setSelected(submission)}
                  style={{ cursor: 'pointer' }}
                >
                  <Table.Td fw={700}>{submission.name}</Table.Td>
                  <Table.Td>{submission.email}</Table.Td>
                  <Table.Td>{truncate(submission.details, 40)}</Table.Td>
                  <Table.Td>{formatRelativeTime(submission.createdAt)}</Table.Td>
                  <Table.Td>
                    {status && (
                      <Badge color={status.color} variant="light">
                        {status.label}
                      </Badge>
                    )}
                  </Table.Td>
                </Table.Tr>
              )
            })}
          </Table.Tbody>
        </Table>
      </Card>

      <Modal
        opened={selected !== null}
        onClose={() => setSelected(null)}
        radius={20}
        padding={32}
        size="lg"
      >
        {selected && (
          <Stack gap={20}>
            <Group gap={14}>
              <Avatar radius="xl" size={56} className="admin-avatar">
                {initials(selected.name)}
              </Avatar>
              <div>
                <Title order={4} className="admin-heading" fz={22}>
                  {selected.name}
                </Title>
                <div className="admin-muted">{selected.email}</div>
              </div>
            </Group>

            {(selected.service || selected.budget) && (
              <Group gap={10}>
                {selected.service && (
                  <span className="admin-pill admin-pill-accent">{selected.service}</span>
                )}
                {selected.budget && (
                  <span className="admin-pill admin-pill-muted">{selected.budget}</span>
                )}
              </Group>
            )}

            {(selected.company || selected.phone) && (
              <Group gap={40} align="flex-start">
                {selected.company && (
                  <div>
                    <div className="admin-label">Company</div>
                    <div className="admin-heading" style={{ fontSize: 15 }}>
                      {selected.company}
                    </div>
                  </div>
                )}
                {selected.phone && (
                  <div>
                    <div className="admin-label">Phone</div>
                    <div className="admin-heading" style={{ fontSize: 15 }}>
                      {selected.phone}
                    </div>
                  </div>
                )}
              </Group>
            )}

            <div>
              <div className="admin-label" style={{ marginBottom: 10 }}>
                Project Details
              </div>
              <div className="admin-surface-alt admin-detail-box">{selected.details}</div>
            </div>

            <Divider color="var(--admin-border)" />

            <Group justify="space-between" align="center">
              <div className="admin-muted" style={{ fontSize: 13 }}>
                ✓ Agreed to be contacted ·{' '}
                {new Date(selected.createdAt).toLocaleString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                  hour: 'numeric',
                  minute: '2-digit',
                })}
              </div>
              <Button
                component="a"
                href={`mailto:${selected.email}`}
                radius={10}
                className="admin-gradient-btn"
              >
                Reply
              </Button>
            </Group>
          </Stack>
        )}
      </Modal>
    </Stack>
  )
}
