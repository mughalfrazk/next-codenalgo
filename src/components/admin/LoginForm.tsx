'use client'

import {
  Alert,
  Button,
  Container,
  Paper,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { z } from 'zod'
import { getFirebaseAuth } from '@/lib/firebase/client'

const loginSchema = z.object({
  email: z.email('Enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

export function LoginForm() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const form = useForm({
    initialValues: { email: '', password: '' },
    validate: (values) => {
      const result = loginSchema.safeParse(values)
      if (result.success) return {}
      const errors: Record<string, string> = {}
      for (const issue of result.error.issues) {
        errors[String(issue.path[0])] = issue.message
      }
      return errors
    },
  })

  async function handleSubmit(values: typeof form.values) {
    setError(null)
    setSubmitting(true)
    try {
      await signInWithEmailAndPassword(getFirebaseAuth(), values.email, values.password)
      router.replace('/admin')
    } catch {
      setError('Invalid email or password.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Container size={380} my={80} style={{ display: 'flex', justifyContent: 'center' }}>
      <Paper className="admin-card" p={36} radius={20} style={{ width: '100%', maxWidth: 380 }}>
        <Title order={2} fz={22} fw={700}>
          Admin sign in
        </Title>
        <Text className="admin-muted" mt={4} mb={24}>
          Code &amp; Algo dashboard
        </Text>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack className="admin-input">
            {error && (
              <Alert color="red" title="Sign in failed">
                {error}
              </Alert>
            )}
            <TextInput
              label="Email"
              placeholder="you@codenalgo.com"
              required
              {...form.getInputProps('email')}
            />
            <PasswordInput
              label="Password"
              placeholder="Your password"
              required
              {...form.getInputProps('password')}
            />
            <Button
              type="submit"
              loading={submitting}
              fullWidth
              className="admin-gradient-btn"
              mt={8}
            >
              Sign in
            </Button>
          </Stack>
        </form>
      </Paper>
    </Container>
  )
}
