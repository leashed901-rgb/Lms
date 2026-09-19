import { SignInView } from '@/components/design-system/SignInView';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Log In | LEASHED Vocational Academy',
  description: 'Sign in to access your active Classroom Canvas, daily lesson agenda, assignments, and AI instructor.',
};

export default function LoginPage() {
  return <SignInView />;
}
