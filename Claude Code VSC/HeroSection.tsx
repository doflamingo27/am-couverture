'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import LeadForm from './LeadForm'

interface HeroSectionProps {
  defaultHeadline: string
  subheadline: string
  ctaText?: string
  imageSrc?: string
  imageAlt?: string
  utmHeadlines?: Record<string, string>
  formTitle?: string
  reviewCount?: number
  reviewScore?: string
  experienceYears?: number
  interventionCount?: number
}

// Maps utm_content → headline override
function DynamicHeadline({
  defaultHeadline,
  utmHeadlines,
}: {
  defaultHeadline: string
  utmHeadlines?: Record<string, string>
}) {
  const searchParams = useSearchParams()
  const utmContent = searchParams.get('utm_content') ?? ''
  const headline = utmHeadlines?.[utmContent] ?? defaultHeadline
  return (
    <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight mb-3">
      {headline}
    </h1>
  )
}

export default function HeroSection({
  defaultHeadline,
  subheadline,
  ctaText = 'Recevoir mon devis gratuit',
  imageSrc,
  imageAlt = 'Toiture propre après intervention AM Couverture',
  utmHeadlines,
  formTitle = 'Devis gratuit en 24h',
  reviewCount = 47,
  reviewScore = '4.9',
  experienceYears = 15,
  interventionCount = 200,
}: HeroSectionProps) {
  return (
    <section className="relative bg-white pt-6 pb-10 md:pt-10 md:pb-14">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 items-start">

          {/* LEFT — Copy */}
          <div>
            {/* Social Proof Band 1 — Google Reviews (always visible) */}
            <div className="flex items-center gap-2 mb-5">
              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <svg key={s} className="w-5 h-5 text-yellow-400 fill-yellow-400" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="font-bold text-gray-900">{reviewScore}/5</span>
              <span className="text-gray-500 text-sm">· {reviewCount} avis Google vérifiés</span>
            </div>

            {/* Headline (dynamic) */}
            <Suspense fallback={
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight mb-3">
                {defaultHeadline}
              </h1>
            }>
              <DynamicHeadline defaultHeadline={defaultHeadline} utmHeadlines={utmHeadlines} />
            </Suspense>

            {/* Subheadline */}
            <p className="text-gray-600 text-lg leading-relaxed mb-6">{subheadline}</p>

            {/* Social Proof Band 2 — Stats (second distinct form of proof) */}
            <div className="flex flex-wrap gap-4 mb-7">
              <div className="flex items-center gap-2 bg-blue-50 rounded-xl px-4 py-2.5">
                <span className="text-2xl font-bold text-blue-700">{experienceYears}+</span>
                <span className="text-sm text-blue-600 leading-tight">ans<br/>d'expérience</span>
              </div>
              <div className="flex items-center gap-2 bg-green-50 rounded-xl px-4 py-2.5">
                <span className="text-2xl font-bold text-green-700">{interventionCount}+</span>
                <span className="text-sm text-green-600 leading-tight">toitures<br/>traitées</span>
              </div>
              <div className="flex items-center gap-2 bg-orange-50 rounded-xl px-4 py-2.5">
                <span className="text-2xl font-bold text-orange-700">100%</span>
                <span className="text-sm text-orange-600 leading-tight">garantie<br/>décennale</span>
              </div>
            </div>

            {/* CTA mobile only (appears above form on mobile) */}
            <div className="md:hidden mb-6">
              <a
                href="#formulaire"
                className="block w-full text-center bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-bold text-lg px-6 py-4 rounded-2xl shadow-lg transition-all duration-200"
              >
                {ctaText}
              </a>
              {/* FUD reduction — mobile */}
              <div className="flex justify-center flex-wrap gap-3 mt-3">
                <span className="text-xs text-gray-500 flex items-center gap-1">
                  <span className="text-green-500">✓</span> Sans engagement
                </span>
                <span className="text-xs text-gray-500 flex items-center gap-1">
                  <span className="text-green-500">✓</span> 100% gratuit
                </span>
                <span className="text-xs text-gray-500 flex items-center gap-1">
                  <span className="text-green-500">✓</span> Rappel sous 2h
                </span>
              </div>
            </div>

            {/* Image (desktop) */}
            {imageSrc && (
              <div className="hidden md:block relative rounded-2xl overflow-hidden aspect-video shadow-lg">
                <img
                  src={imageSrc}
                  alt={imageAlt}
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm rounded-xl px-3 py-2 shadow">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-xs font-medium text-gray-700">Artisan disponible dans le Loiret</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* RIGHT — Form */}
          <div id="formulaire" className="scroll-mt-6">
            <div className="bg-white border-2 border-orange-200 rounded-3xl p-6 shadow-xl">
              <div className="text-center mb-5">
                <p className="font-bold text-xl text-gray-900">{formTitle}</p>
                <p className="text-sm text-gray-500 mt-1">Artisan certifié · Loiret (45)</p>
              </div>
              <LeadForm ctaText={ctaText} />
              {/* FUD reduction — under form */}
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex justify-center flex-wrap gap-x-4 gap-y-1">
                  <span className="text-xs text-gray-500 flex items-center gap-1">
                    <span className="text-green-500">✓</span> Sans engagement
                  </span>
                  <span className="text-xs text-gray-500 flex items-center gap-1">
                    <span className="text-green-500">✓</span> 100% gratuit
                  </span>
                  <span className="text-xs text-gray-500 flex items-center gap-1">
                    <span className="text-green-500">✓</span> Rappel sous 2h
                  </span>
                  <span className="text-xs text-gray-500 flex items-center gap-1">
                    <span className="text-green-500">✓</span> Données protégées
                  </span>
                </div>
              </div>
            </div>

            {/* Trust micro-badges under form */}
            <div className="mt-4 flex items-center justify-center gap-3 flex-wrap">
              <div className="flex items-center gap-1.5 text-xs text-gray-600 bg-gray-50 px-3 py-2 rounded-lg border border-gray-100">
                <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Assurance décennale
              </div>
              <div className="flex items-center gap-1.5 text-xs text-gray-600 bg-gray-50 px-3 py-2 rounded-lg border border-gray-100">
                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Artisan local Loiret (45)
              </div>
              <div className="flex items-center gap-1.5 text-xs text-gray-600 bg-gray-50 px-3 py-2 rounded-lg border border-gray-100">
                <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
                SIRET vérifié
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
