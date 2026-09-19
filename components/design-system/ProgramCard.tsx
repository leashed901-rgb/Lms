'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Scissors, Heart, Briefcase, ArrowRight } from 'lucide-react';

export type ProgramIconType = 'scissors' | 'heart' | 'cat' | 'briefcase';

export interface ProgramItem {
  id: string;
  title: string;
  duration: string;
  hours: string;
  imageSrc: string;
  imageAlt: string;
  iconType: ProgramIconType;
  tagline?: string;
  href?: string;
}

interface ProgramCardProps {
  program: ProgramItem;
  onSelect?: (program: ProgramItem) => void;
}

export function ProgramCard({ program, onSelect }: ProgramCardProps) {
  const targetHref = program.href || `/training/${program.id}`;

  const renderIcon = (type: ProgramIconType) => {
    switch (type) {
      case 'scissors':
        return <Scissors className="w-4 h-4 text-[#1a2920]" strokeWidth={2.2} />;
      case 'heart':
        return <Heart className="w-4 h-4 text-[#1a2920]" strokeWidth={2.2} fill="#1a2920" fillOpacity={0.15} />;
      case 'briefcase':
        return <Briefcase className="w-4 h-4 text-[#1a2920]" strokeWidth={2.2} />;
      case 'cat':
        return (
          // Cat silhouette vector
          <svg className="w-4 h-4 text-[#1a2920]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5c-4 0-7 2.5-7 6.5 0 3 1.5 5 4 6 1 .5 2 .5 3 .5s2 0 3-.5c2.5-1 4-3 4-6 0-4-3-6.5-7-6.5z" />
            <path d="M5 10L3 3l6.5 3" />
            <path d="M19 10l2-7-6.5 3" />
            <circle cx="9" cy="11.5" r="0.75" fill="currentColor" />
            <circle cx="15" cy="11.5" r="0.75" fill="currentColor" />
            <path d="M12 14v1" />
          </svg>
        );
      default:
        return <Scissors className="w-4 h-4 text-[#1a2920]" />;
    }
  };

  return (
    <Link
      href={targetHref}
      onClick={() => onSelect?.(program)}
      className="group relative flex flex-col bg-white rounded-lg overflow-hidden transition-all duration-200 border border-[#e5decb] hover:border-[#b8ad98] cursor-pointer block"
    >
      {/* Card Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#e8e4db]">
        <Image
          src={program.imageSrc}
          alt={program.imageAlt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover object-center transition-transform duration-300 group-hover:scale-102"
          referrerPolicy="no-referrer"
        />
      </div>

      {/* Body Area */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-md bg-[#f4eee5] border border-[#e4dcce] flex items-center justify-center shrink-0">
            {renderIcon(program.iconType)}
          </div>
          <span className="text-[0.72rem] font-mono uppercase tracking-wider text-[#6d7e73] font-semibold">
            {program.hours}
          </span>
        </div>

        {/* Program Title */}
        <h3 className="font-serif font-bold text-[#141b16] text-[1.05rem] leading-snug tracking-tight mb-2 group-hover:text-[#2d3d32] transition-colors">
          {program.title}
        </h3>

        {/* Tagline */}
        {program.tagline && (
          <p className="text-xs text-[#5f7166] leading-relaxed line-clamp-2 mb-4">
            {program.tagline}
          </p>
        )}

        {/* Card Footer: Metadata & Action button */}
        <div className="pt-3 flex items-center justify-between border-t border-[#f0ebe1] text-xs font-semibold text-[#141b16]">
          <span className="text-[#6d7e73]">{program.duration}</span>
          <span className="inline-flex items-center gap-1 text-[#2d3d32] group-hover:underline">
            <span>Explore Program</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}
