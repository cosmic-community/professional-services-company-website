// app/services/[slug]/page.tsx
import { cosmic } from '@/lib/cosmic'
import { Service } from '@/types'
import { notFound } from 'next/navigation'
import ServiceDetail from '@/components/ServiceDetail'

interface ServicePageProps {
  params: Promise<{ slug: string }>
}

async function getService(slug: string): Promise<Service | null> {
  try {
    const response = await cosmic.objects.findOne({
      type: 'services',
      slug: slug
    }).props(['id', 'title', 'slug', 'metadata']).depth(1)
    
    return response.object as Service
  } catch (error) {
    if ((error as any).status === 404) {
      return null
    }
    throw error
  }
}

async function getRelatedServices(currentSlug: string): Promise<Service[]> {
  try {
    const response = await cosmic.objects.find({ type: 'services' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
      .limit(3)
    
    // Filter out the current service
    const filteredServices = response.objects.filter((service: Service) => service.slug !== currentSlug)
    return filteredServices.slice(0, 2) as Service[]
  } catch (error) {
    if ((error as any).status === 404) {
      return []
    }
    throw error
  }
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params
  const service = await getService(slug)
  
  if (!service) {
    notFound()
  }

  const relatedServices = await getRelatedServices(slug)

  return <ServiceDetail service={service} relatedServices={relatedServices} />
}

export async function generateStaticParams() {
  try {
    const response = await cosmic.objects.find({ type: 'services' })
      .props(['slug'])
    
    return response.objects.map((service: any) => ({
      slug: service.slug,
    }))
  } catch (error) {
    return []
  }
}