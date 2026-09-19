'use client';

import Link from 'next/link';
import { ArrowLeft, Compass, BookOpen, GraduationCap, Compass as CompassIcon, Layers } from 'lucide-react';
import { Navbar } from '@/components/design-system/Navbar';
import { Footer } from '@/components/design-system/Footer';

export default function NotFound() {
  const quickLinks = [
    { label: 'Return to Home', href: '/', icon: ArrowLeft },
    { label: 'Academy Overview', href: '/academy', icon: GraduationCap },
    { label: 'Training Programs', href: '/training', icon: BookOpen },
    { label: 'Career Pathway', href: '/pathway', icon: CompassIcon },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#fbf9f5] text-[#161c18]">
      {/* Real Next.js App Router Header */}
      <Navbar />

      <main className="flex-1 w-full flex flex-col items-center justify-center px-4 py-16 sm:py-24 text-center">
        <div className="max-w-lg w-full bg-white rounded-2xl border border-[#e8e2d5] p-8 sm:p-10 shadow-sm flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-[#1b2921]/10 flex items-center justify-center text-[#1b2921] mb-6">
            <Compass className="w-8 h-8 stroke-[1.75]" />
          </div>
          
          <span className="font-mono text-xs font-bold tracking-widest text-[#728076] uppercase mb-2">
            Status: 404 Route Found
          </span>
          
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#141d17] tracking-tight mb-3">
            Page Not Found
          </h1>
          
          <p className="font-sans text-sm sm:text-base text-[#526357] leading-relaxed mb-8 max-w-sm">
            This route is registered in the Next.js App Router architecture. The page content and syllabus have not been published yet.
          </p>

          <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-6">
            {quickLinks.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-[#e2ddd1] bg-[#faf8f4] hover:bg-[#f1ede3] text-[#1e2a22] text-xs font-semibold transition-colors"
                >
                  <Icon className="w-3.5 h-3.5 text-[#5e7064]" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#1b2921] text-white font-sans text-xs sm:text-sm font-semibold hover:bg-[#25392e] transition-colors shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Homepage</span>
          </Link>
        </div>
      </main>

      {/* Real Next.js App Router Footer */}
      <Footer />
    </div>
  );
}
