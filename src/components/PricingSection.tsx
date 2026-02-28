'use client'

import { useContent } from '@/lib/i18n'
import AnimatedSection from './AnimatedSection'

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg viewBox='0 0 20 20' fill='none' className={className} aria-hidden='true'>
      <circle cx='10' cy='10' r='8' fill='currentColor' opacity='0.2' />
      <path d='M6 10L9 13L14 7' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
    </svg>
  )
}

export default function PricingSection() {
  const content = useContent()
  return (
    <AnimatedSection id='planes' className='relative pt-24 pb-12 lg:pb-16 bg-dark overflow-hidden'>
      <div className='absolute inset-0 overflow-hidden pointer-events-none'>
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-magenta/5 blur-[140px]' />
      </div>

      <div className='relative z-10 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
        {/* Header */}
        <h2 className='font-[family-name:var(--font-heading)] text-3xl sm:text-4xl md:text-5xl font-medium text-white mb-4'>
          {content.pricing.headline}
        </h2>
        <p className='text-lg text-white/60 mb-12 max-w-lg mx-auto'>
          {content.pricing.subheadline}
        </p>

        {/* Single plan card */}
        <div className='relative group'>
          <div className='absolute -inset-0.5 rounded-3xl bg-gradient-to-br from-magenta via-violet to-gold opacity-75 blur-sm group-hover:opacity-100 transition-opacity' />
          <div className='relative bg-[#111111] rounded-3xl p-10 border border-transparent'>

            {/* Launch badge */}
            <div className='inline-flex items-center gap-1.5 bg-magenta/10 border border-magenta/30 text-magenta text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider mb-8'>
              <span className='w-1.5 h-1.5 rounded-full bg-magenta animate-pulse' />
              {content.pricing.badge}
            </div>

            {/* Price */}
            <div className='mb-8'>
              <div className='flex items-baseline justify-center gap-2 mb-2'>
                <span className='text-white/40 text-3xl font-medium mr-1'>$</span>
                <span className='text-6xl sm:text-7xl font-bold text-white'>249</span>
                <div className='text-left'>
                  <div className='text-magenta font-semibold'>MXN</div>
                  <div className='text-white/40 text-sm'>/mes</div>
                </div>
              </div>
              <p className='text-white/30 text-sm'>{content.pricing.priceNote}</p>
            </div>

            {/* Features */}
            <ul className='space-y-4 mb-10 text-left max-w-xs mx-auto'>
              {content.pricing.features.map((feature: string, i: number) => (
                <li key={i} className='flex items-start gap-3'>
                  <CheckIcon className='w-5 h-5 text-gold flex-shrink-0 mt-0.5' />
                  <span className='text-white/75 text-sm leading-relaxed'>{feature}</span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <a
              href='#lista-de-espera'
              className='inline-block w-full bg-magenta text-white font-semibold py-4 px-8 rounded-full text-lg transition-all duration-300 hover:bg-magenta-dark hover:shadow-lg hover:shadow-magenta/30 hover:-translate-y-0.5'
            >
              {content.pricing.cta}
            </a>

            {/* Tagline */}
            <p className='text-white/25 text-xs mt-6 font-[family-name:var(--font-playfair)] italic'>
              &ldquo;{content.pricing.tagline}&rdquo;
            </p>
          </div>
        </div>

        {/* Bottom note */}
        <p className='text-white/20 text-sm mt-8'>{content.pricing.note}</p>
      </div>
    </AnimatedSection>
  )
}
