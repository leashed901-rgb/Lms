'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Calendar,
  Clock,
  BookOpen,
  Award,
  ArrowRight,
  ChevronRight,
  CheckCircle2,
  Check,
  ChevronDown,
  PawPrint,
} from 'lucide-react';
import { Navbar } from '@/components/design-system/Navbar';
import { Footer } from '@/components/design-system/Footer';
import { EnrollmentModal } from '@/components/design-system/EnrollmentModal';
import { DynamicIcon } from '@/components/DynamicIcon';
import { ProgramDetails } from '@/lib/courses-data';

interface ProgramDetailViewProps {
  program: ProgramDetails;
}

export function ProgramDetailView({ program }: ProgramDetailViewProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'curriculum' | 'outcomes' | 'requirements' | 'faq'>('overview');
  const [openTermIndex, setOpenTermIndex] = useState<number | null>(null);
  const [enrollModalOpen, setEnrollModalOpen] = useState(false);

  // SVG Donut Calculations
  const donutTotal = program.donutData.technical + program.donutData.businessPersonal + program.donutData.applied;
  const techRatio = program.donutData.technical / donutTotal;
  const bizRatio = program.donutData.businessPersonal / donutTotal;
  const appRatio = program.donutData.applied / donutTotal;

  // Circumference for r=38 -> 2 * PI * 38 ≈ 238.76
  const circ = 238.76;
  const strokeTech = techRatio * circ;
  const strokeBiz = bizRatio * circ;
  const strokeApp = appRatio * circ;

  const offsetTech = 0;
  const offsetBiz = -strokeTech;
  const offsetApp = -(strokeTech + strokeBiz);

  return (
    <div className="min-h-screen flex flex-col bg-[#fbf9f5] font-sans text-[#141b16]">
      <Navbar activeNav="Academy" />

      {/* Hero Header Banner */}
      <section className="relative w-full min-h-[380px] lg:min-h-[440px] bg-[#121c15] text-white overflow-hidden flex items-center">
        {/* Background Image with warm gradient overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src={program.heroImage}
            alt={program.title}
            fill
            priority
            className="object-cover object-center brightness-[0.45] contrast-[1.05]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#121c15]/95 via-[#121c15]/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#121c15] via-transparent to-transparent" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 w-full max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="max-w-4xl">
            <span className="inline-block text-[0.72rem] font-bold tracking-[0.2em] text-[#d9b589] uppercase mb-2">
              {program.badge}
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4 leading-[1.15]">
              {program.fullTitle}
            </h1>
            <p className="text-[#d5e0d8] text-sm sm:text-base leading-relaxed mb-8 max-w-3xl">
              {program.subtitle}
            </p>

            {/* 4 Hero Pillars */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 pt-4 border-t border-white/10">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-white/5 border border-white/10 text-[#d9b589] shrink-0">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-bold text-white">{program.stats.weeks}</div>
                  <div className="text-xs text-[#a0b2a6]">Total Program</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-white/5 border border-white/10 text-[#d9b589] shrink-0">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-bold text-white">{program.stats.modules}</div>
                  <div className="text-xs text-[#a0b2a6]">Complete Curriculum</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-white/5 border border-white/10 text-[#d9b589] shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-bold text-white">{program.stats.hours}</div>
                  <div className="text-xs text-[#a0b2a6]">Total Instruction</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-white/5 border border-white/10 text-[#d9b589] shrink-0">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-bold text-white">{program.stats.credential}</div>
                  <div className="text-xs text-[#a0b2a6]">Included</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Script Tagline in Sky (matching the screenshot) */}
          <div className="hidden lg:block absolute top-12 right-12 text-right">
            <div className="font-serif italic text-2xl text-white/90 drop-shadow-sm font-normal">
              {program.tagline.split('. ').map((part, i) => (
                <div key={i}>{part.replace('.', '')}.</div>
              ))}
            </div>
            <div className="mt-8 flex items-center justify-end">
              {/* LEASHED Minimal Paw Mark */}
              <div className="flex items-center gap-2 text-white/80">
                <PawPrint className="w-8 h-8 text-white/90" />
                <span className="font-sans text-xs tracking-widest font-bold">LEASHED</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Body */}
      <main className="flex-1 w-full max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Navigation Tabs Bar */}
        <div className="border-b border-[#e5decb] mb-10 flex items-center justify-between overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-8">
            {(['overview', 'curriculum', 'outcomes', 'requirements', 'faq'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 text-sm font-semibold capitalize whitespace-nowrap transition-colors relative ${
                  activeTab === tab
                    ? 'text-[#141b16] font-bold'
                    : 'text-[#6c7d71] hover:text-[#141b16]'
                }`}
              >
                {tab === 'faq' ? 'FAQ' : tab}
                {activeTab === tab && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#141b16] rounded-full" />
                )}
              </button>
            ))}
          </div>
          <Link
            href="/courses"
            className="text-xs font-semibold text-[#4e5b41] hover:underline flex items-center gap-1 shrink-0 ml-4 pb-3"
          >
            ← All Courses &amp; Programs
          </Link>
        </div>

        {/* 2-Column Grid: Left Main Section (Overview & 4 Terms) + Right Sidebar Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column (8 cols on lg) */}
          <div className="lg:col-span-8 space-y-12">
            {/* 1. Program Overview Section */}
            <section className="bg-[#ffffff] rounded-2xl p-6 sm:p-8 border border-[#e8dfcf] shadow-sm">
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="flex-1">
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#141b16] mb-4">
                    Program Overview
                  </h2>
                  {program.overviewParagraphs.map((para, i) => (
                    <p key={i} className="text-sm text-[#4b5a50] leading-relaxed mb-6">
                      {para}
                    </p>
                  ))}

                  {/* Core Competencies 5-6 Icon Pill Row */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                    {program.coreCompetencies.map((comp, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2.5 p-2.5 rounded-xl bg-[#f8f5ee] border border-[#eee4d2]"
                      >
                        <div className="w-8 h-8 rounded-full bg-[#1b271e] text-[#d9b589] flex items-center justify-center shrink-0">
                          <DynamicIcon name={comp.icon} className="w-4 h-4" />
                        </div>
                        <span className="text-xs font-bold text-[#141b16] leading-tight">
                          {comp.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Trainer Portrait with Script Overlay (Matching Screenshot) */}
                <div className="w-full md:w-64 shrink-0 relative rounded-xl overflow-hidden shadow-md aspect-[3/4] bg-[#233327]">
                  <Image
                    src={program.trainerImage}
                    alt="Trainer with animal"
                    fill
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <p className="font-serif italic text-base leading-snug mb-1">
                      {program.heroQuote}
                    </p>
                    <div className="flex items-center gap-1.5 text-xs text-[#d9b589] font-bold tracking-wider">
                      <PawPrint className="w-3.5 h-3.5" />
                      <span>LEASHED</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 2. Four Terms. One Complete Path (The Comprehensive Syllabus) */}
            <section>
              <div className="mb-6">
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#141b16] tracking-tight">
                  Four Terms. One Complete Path.
                </h2>
                <p className="text-sm text-[#5a6a60] mt-1">
                  The program is structured into four terms, each building on the last with progressive skills, hands-on practice, and real-world application. Follow the full {program.totalWeeksFormatted.toLowerCase()} below.
                </p>
              </div>

              {/* Terms List Cards */}
              <div className="space-y-5">
                {program.terms.map((term, idx) => (
                  <div
                    key={term.termNumber}
                    className="bg-white rounded-xl border border-[#e8dfcf] overflow-hidden shadow-sm hover:border-[#cbbaa0] transition-all"
                  >
                    <div className="p-5 sm:p-6 flex flex-col md:flex-row gap-6 items-start">
                      {/* Thumbnail Image */}
                      <div className="w-full md:w-44 h-32 md:h-36 relative rounded-lg overflow-hidden shrink-0 bg-[#ebdcc8]">
                        <Image
                          src={term.image}
                          alt={term.name}
                          fill
                          className="object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>

                      {/* Term Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                          <span className="text-[0.72rem] font-bold uppercase tracking-wider text-[#4e5b41]">
                            TERM {term.termNumber}
                          </span>
                          <span className="text-xs font-bold text-[#708075] bg-[#f5efe3] px-2.5 py-0.5 rounded-full">
                            {term.clockHours} Hours
                          </span>
                        </div>
                        <h3 className="font-serif text-xl font-bold text-[#141b16] mb-2">
                          {term.name}
                        </h3>

                        <div className="flex items-center gap-4 text-xs text-[#526357] font-semibold mb-3">
                          <span className="flex items-center gap-1">
                            <BookOpen className="w-3.5 h-3.5 text-[#4e5b41]" />
                            {term.modulesCount} Modules
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-[#4e5b41]" />
                            {term.durationWeeks}
                          </span>
                        </div>

                        <p className="text-xs sm:text-sm text-[#506055] leading-relaxed mb-4">
                          {term.description}
                        </p>

                        {/* Bullets: 4-5 key topics */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#28382c]">
                          {term.topics.map((t, i) => (
                            <div key={i} className="flex items-center gap-1.5">
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#4e5b41] shrink-0" />
                              <span className="truncate">{t}</span>
                            </div>
                          ))}
                        </div>

                        {/* Accordion Toggle for Detailed Course Module Highlights */}
                        <div className="mt-4 pt-3 border-t border-[#f0e8dc]">
                          <button
                            onClick={() => setOpenTermIndex(openTermIndex === idx ? null : idx)}
                            className="text-xs font-bold text-[#4e5b41] hover:text-[#2c3624] flex items-center gap-1.5"
                          >
                            <span>{openTermIndex === idx ? 'Hide Module Catalog' : 'View Detailed Course Modules'}</span>
                            <ChevronDown
                              className={`w-3.5 h-3.5 transition-transform ${
                                openTermIndex === idx ? 'rotate-180' : ''
                              }`}
                            />
                          </button>

                          {openTermIndex === idx && (
                            <div className="mt-3 space-y-2.5 bg-[#fbf9f5] p-3.5 rounded-lg border border-[#e8dfcf]">
                              <div className="text-[0.7rem] font-bold uppercase tracking-wider text-[#637368] mb-2">
                                Term {term.termNumber} Core Modules &amp; Clock-Hours
                              </div>
                              {term.courseHighlights.map((mod) => (
                                <div
                                  key={mod.code}
                                  className="p-2.5 bg-white rounded border border-[#ebdcc8] text-xs"
                                >
                                  <div className="flex items-center justify-between font-bold text-[#141b16] mb-1">
                                    <span className="text-[#4e5b41] font-mono">{mod.code}</span>
                                    <span>{mod.title}</span>
                                    <span className="text-[#78887e] font-normal">{mod.hours} hrs</span>
                                  </div>
                                  <p className="text-[0.75rem] text-[#55655a] leading-relaxed">
                                    {mod.description}
                                  </p>
                                </div>
                              ))}
                              {term.modulesSummary.businessCodeRange && (
                                <div className="p-2 bg-[#f4efe5] rounded text-[0.75rem] text-[#55655a]">
                                  <strong>Business &amp; Personal Spine:</strong>{' '}
                                  {term.modulesSummary.businessCodeRange} (36 Modules · 216 Clock Hours)
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Program Totals Row Bar */}
              <div className="mt-6 p-4 rounded-xl bg-[#233327] text-white flex flex-wrap items-center justify-between gap-4 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#ebdcc8] text-[#141b16] flex items-center justify-center font-bold">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-sm">Program Total</div>
                    <div className="text-xs text-[#b8c9bd]">{program.totalModules} Total Modules</div>
                  </div>
                </div>

                <div className="flex items-center gap-6 text-xs text-[#dbe5dd]">
                  <div>
                    <span className="font-bold text-white text-sm">{program.totalsRow.technicalHours}</span>
                    <span className="block text-[0.68rem] text-[#a0b2a5]">Technical</span>
                  </div>
                  <div>
                    <span className="font-bold text-white text-sm">{program.totalsRow.businessHours}</span>
                    <span className="block text-[0.68rem] text-[#a0b2a5]">Business &amp; Personal</span>
                  </div>
                  <div>
                    <span className="font-bold text-white text-sm">{program.totalsRow.appliedHours}</span>
                    <span className="block text-[0.68rem] text-[#a0b2a5]">Applied</span>
                  </div>
                  <div className="border-l border-white/20 pl-4">
                    <span className="font-bold text-[#ebdcc8] text-base">{program.totalsRow.totalHours}</span>
                    <span className="block text-[0.68rem] text-[#a0b2a5]">Total Clock Hours</span>
                  </div>
                </div>

                <button
                  onClick={() => setEnrollModalOpen(true)}
                  className="px-5 py-2.5 rounded-full bg-[#ebdcc8] hover:bg-[#decbb4] text-[#141b16] font-bold text-xs transition-colors shadow-sm flex items-center gap-1.5"
                >
                  <span>Enroll Now</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </section>

            {/* 3. Textbooks & Program Manuals Section */}
            <section className="bg-white rounded-2xl p-6 sm:p-8 border border-[#e8dfcf] shadow-sm">
              <h3 className="font-serif text-xl font-bold text-[#141b16] mb-3">
                Required Program Manuals &amp; Texts
              </h3>
              <p className="text-xs text-[#526357] mb-4">
                Curriculum materials provided to enrolled students through the LEASHED Learning Management System:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {program.manuals.map((man) => (
                  <div
                    key={man.id}
                    className="flex items-start gap-2.5 p-3 rounded-lg bg-[#fbf9f5] border border-[#eee4d4]"
                  >
                    <BookOpen className="w-4 h-4 text-[#4e5b41] shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-[#141b16]">{man.title}</div>
                      <div className="text-[0.7rem] text-[#6c7d71]">{man.id} • {man.type}</div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column: Program Metrics & Info Sidebar (4 cols on lg) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Total Program Donut Card */}
            <div className="bg-white rounded-2xl p-6 border border-[#e8dfcf] shadow-sm">
              <div className="flex items-center gap-6">
                {/* SVG Donut */}
                <div className="relative w-24 h-24 shrink-0">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="38"
                      fill="transparent"
                      stroke="#eee6d8"
                      strokeWidth="12"
                    />
                    {/* Technical (Olive Green) */}
                    <circle
                      cx="50"
                      cy="50"
                      r="38"
                      fill="transparent"
                      stroke="#4e5b41"
                      strokeWidth="12"
                      strokeDasharray={`${strokeTech} ${circ}`}
                      strokeDashoffset={offsetTech}
                    />
                    {/* Business & Personal (Warm Gold/Sand) */}
                    <circle
                      cx="50"
                      cy="50"
                      r="38"
                      fill="transparent"
                      stroke="#c99c64"
                      strokeWidth="12"
                      strokeDasharray={`${strokeBiz} ${circ}`}
                      strokeDashoffset={offsetBiz}
                    />
                    {/* Applied (Deep Forest) */}
                    <circle
                      cx="50"
                      cy="50"
                      r="38"
                      fill="transparent"
                      stroke="#1a2920"
                      strokeWidth="12"
                      strokeDasharray={`${strokeApp} ${circ}`}
                      strokeDashoffset={offsetApp}
                    />
                  </svg>
                </div>

                <div>
                  <div className="text-xs text-[#637367] font-semibold uppercase tracking-wider">
                    Total Program
                  </div>
                  <div className="font-serif text-2xl font-bold text-[#141b16]">
                    {program.totalClockHours} Hours
                  </div>
                  <div className="text-xs text-[#526357] mt-0.5">
                    {program.totalWeeks} Weeks • {program.totalModules} Modules
                  </div>
                </div>
              </div>

              {/* Breakdown Legend */}
              <div className="mt-4 pt-4 border-t border-[#f0e8dc] space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-[#4b5950]">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#4e5b41]" />
                    Technical Hours
                  </span>
                  <span className="font-bold text-[#141b16]">{program.donutData.technical} hrs</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-[#4b5950]">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#c99c64]" />
                    Business &amp; Personal
                  </span>
                  <span className="font-bold text-[#141b16]">{program.donutData.businessPersonal} hrs</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-[#4b5950]">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#1a2920]" />
                    Applied (Capstone)
                  </span>
                  <span className="font-bold text-[#141b16]">{program.donutData.applied} hrs</span>
                </div>
              </div>
            </div>

            {/* Program Breakdown Details */}
            <div className="bg-white rounded-2xl p-6 border border-[#e8dfcf] shadow-sm">
              <h4 className="font-serif text-base font-bold text-[#141b16] mb-4">
                Program Breakdown
              </h4>
              <div className="space-y-3.5 text-xs">
                {program.breakdown.map((item, i) => (
                  <div key={i} className="flex items-start justify-between gap-2">
                    <div>
                      <div className="font-bold text-[#141b16]">{item.type}</div>
                      {item.description && (
                        <div className="text-[0.72rem] text-[#6c7d71]">{item.description}</div>
                      )}
                    </div>
                    <div className="text-right shrink-0">
                      <span className="font-bold text-[#141b16]">{item.hours} hrs</span>
                      <span className="block text-[0.68rem] text-[#78887e]">({item.percent})</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Delivery & Access */}
            <div className="bg-white rounded-2xl p-6 border border-[#e8dfcf] shadow-sm">
              <h4 className="font-serif text-base font-bold text-[#141b16] mb-4">
                Delivery &amp; Access
              </h4>
              <div className="space-y-3.5 text-xs">
                {program.deliveryAndAccess.map((del, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-md bg-[#ebdcc8] text-[#233327] flex items-center justify-center shrink-0 mt-0.5">
                      <DynamicIcon name={del.icon} className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-[#141b16]">{del.title}</div>
                      <div className="text-[0.72rem] text-[#58685d]">{del.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Completion Requirements */}
            <div className="bg-white rounded-2xl p-6 border border-[#e8dfcf] shadow-sm">
              <h4 className="font-serif text-base font-bold text-[#141b16] mb-4">
                Completion Requirements
              </h4>
              <ul className="space-y-2.5 text-xs text-[#3f4f44]">
                {program.completionRequirements.map((req, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#4e5b41] shrink-0 mt-0.5" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Turn Your Passion Into a Career Banner Card */}
            <div className="relative rounded-2xl overflow-hidden p-6 text-white shadow-md">
              <Image
                src={program.trainerImage}
                alt="Enrolling"
                fill
                className="object-cover brightness-[0.4]"
                referrerPolicy="no-referrer"
              />
              <div className="relative z-10">
                <h4 className="font-serif text-xl font-bold mb-2">
                  Turn Your Passion Into a Rewarding Career.
                </h4>
                <p className="text-xs text-[#dce7df] mb-4 leading-relaxed">
                  Join the next cohort of professional pet care providers. Limited seats available per lab.
                </p>
                <button
                  onClick={() => setEnrollModalOpen(true)}
                  className="w-full py-2.5 rounded-full bg-[#ebdcc8] hover:bg-[#decbb4] text-[#141b16] font-bold text-xs transition-colors shadow-sm flex items-center justify-center gap-2"
                >
                  <span>Enroll Now</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer Banner */}
      <section className="w-full bg-[#121c15] border-t border-[#223026] text-white py-12">
        <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="font-serif italic text-xl sm:text-2xl text-[#ebdcc8] mb-2">
            {program.heroQuote}
          </p>
          <p className="text-xs uppercase tracking-widest text-[#8a9c90] font-bold">
            — {program.heroQuoteAttribution || 'LEASHED'} —
          </p>
        </div>
      </section>

      <Footer />

      {/* Enrollment Modal */}
      <EnrollmentModal
        isOpen={enrollModalOpen}
        onClose={() => setEnrollModalOpen(false)}
        initialProgramId={program.id}
      />
    </div>
  );
}
