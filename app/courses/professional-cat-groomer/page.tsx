import { notFound } from 'next/navigation';
import { getProgramBySlug } from '@/lib/courses-data';
import { ProgramDetailView } from '@/components/ProgramDetailView';

export default function ProfessionalCatGroomerPage() {
  const program = getProgramBySlug('professional-cat-groomer');
  if (!program) notFound();

  return <ProgramDetailView program={program} />;
}
