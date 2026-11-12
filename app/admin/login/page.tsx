import { LoginForm } from '@/components/admin/login-form'

export const dynamic = 'force-dynamic'

export default function LoginPage() {
  return <LoginForm locked={!process.env.ADMIN_PASSWORD} />
}
