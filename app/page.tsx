import { cosmic } from '@/lib/cosmic'
import { Service, TeamMember, CaseStudy, Testimonial } from '@/types'
import Hero from '@/components/Hero'
import Services from '@/components/Services'
import CaseStudies from '@/components/CaseStudies'
import TeamSection from '@/components/TeamSection'
import Testimonials from '@/components/Testimonials'
import Footer from '@/components/Footer'

export default async function HomePage() {
  // Fetch all content in parallel
  const [servicesResponse, teamResponse, caseStudiesResponse, testimonialsResponse] = await Promise.allSettled([
    cosmic.objects.find({ type: 'services' }).props(['id', 'title', 'slug', 'metadata']).depth(1),
    cosmic.objects.find({ type: 'team-members' }).props(['id', 'title', 'slug', 'metadata']).depth(1),
    cosmic.objects.find({ type: 'case-studies' }).props(['id', 'title', 'slug', 'metadata']).depth(1),
    cosmic.objects.find({ type: 'testimonials' }).props(['id', 'title', 'slug', 'metadata']).depth(1),
  ])

  // Extract data with fallbacks
  const services: Service[] = servicesResponse.status === 'fulfilled' ? servicesResponse.value.objects || [] : []
  const teamMembers: TeamMember[] = teamResponse.status === 'fulfilled' ? teamResponse.value.objects || [] : []
  const caseStudies: CaseStudy[] = caseStudiesResponse.status === 'fulfilled' ? caseStudiesResponse.value.objects || [] : []
  const testimonials: Testimonial[] = testimonialsResponse.status === 'fulfilled' ? testimonialsResponse.value.objects || [] : []

  return (
    <main>
      <Hero />
      <Services services={services} />
      <CaseStudies caseStudies={caseStudies} />
      <TeamSection teamMembers={teamMembers} />
      <Testimonials testimonials={testimonials} />
      <Footer />
    </main>
  )
}