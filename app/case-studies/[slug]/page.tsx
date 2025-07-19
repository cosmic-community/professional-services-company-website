// app/case-studies/[slug]/page.tsx
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { cosmic } from '@/lib/cosmic'
import type { CaseStudy, Service } from '@/types'

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

async function getCaseStudy(slug: string): Promise<CaseStudy | null> {
  try {
    const response = await cosmic.objects
      .findOne({
        type: 'case-studies',
        slug: slug,
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)

    return response.object as CaseStudy
  } catch (error) {
    console.error('Error fetching case study:', error)
    return null
  }
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params
  const caseStudy = await getCaseStudy(slug)

  if (!caseStudy) {
    notFound()
  }

  const {
    project_title,
    client,
    industry,
    project_summary,
    challenge,
    solution,
    results,
    featured_image,
    project_duration,
    services_used,
    key_metrics
  } = caseStudy.metadata

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Breadcrumb */}
      <div className="bg-gray-50 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-4">
              <li>
                <Link href="/" className="text-gray-500 hover:text-gray-700">
                  Home
                </Link>
              </li>
              <li>
                <div className="flex items-center">
                  <svg className="flex-shrink-0 h-5 w-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  <Link href="/case-studies" className="ml-4 text-gray-500 hover:text-gray-700">
                    Case Studies
                  </Link>
                </div>
              </li>
              <li>
                <div className="flex items-center">
                  <svg className="flex-shrink-0 h-5 w-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="ml-4 text-gray-900 font-medium">{project_title}</span>
                </div>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-purple-700 py-16">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {project_title}
            </h1>
            <p className="text-xl text-blue-100 mb-6 max-w-3xl mx-auto">
              {project_summary}
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-blue-100">
              <div className="flex items-center">
                <span className="font-semibold">Client:</span>
                <span className="ml-2">{client}</span>
              </div>
              {industry && (
                <div className="flex items-center">
                  <span className="font-semibold">Industry:</span>
                  <span className="ml-2">{industry}</span>
                </div>
              )}
              {project_duration && (
                <div className="flex items-center">
                  <span className="font-semibold">Duration:</span>
                  <span className="ml-2">{project_duration}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Featured Image */}
      {featured_image && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="rounded-lg overflow-hidden shadow-lg">
            <img
              src={`${featured_image.imgix_url}?w=1200&h=600&fit=crop&auto=format,compress`}
              alt={project_title}
              className="w-full h-96 object-cover"
            />
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content Column */}
          <div className="lg:col-span-2">
            {/* Challenge Section */}
            {challenge && (
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">The Challenge</h2>
                <div 
                  className="prose prose-lg max-w-none text-gray-700"
                  dangerouslySetInnerHTML={{ __html: challenge }}
                />
              </div>
            )}

            {/* Solution Section */}
            {solution && (
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Solution</h2>
                <div 
                  className="prose prose-lg max-w-none text-gray-700"
                  dangerouslySetInnerHTML={{ __html: solution }}
                />
              </div>
            )}

            {/* Results Section */}
            {results && (
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Results</h2>
                <div 
                  className="prose prose-lg max-w-none text-gray-700"
                  dangerouslySetInnerHTML={{ __html: results }}
                />
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Key Metrics */}
            {key_metrics && typeof key_metrics === 'object' && Object.keys(key_metrics).length > 0 && (
              <div className="bg-gray-50 rounded-lg p-6 mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Key Metrics</h3>
                <div className="space-y-3">
                  {Object.entries(key_metrics as Record<string, string>).map(([key, value]) => (
                    <div key={key} className="border-b border-gray-200 pb-2 last:border-b-0">
                      <div className="text-sm font-medium text-gray-600 capitalize">
                        {key.replace(/_/g, ' ')}
                      </div>
                      <div className="text-lg font-semibold text-blue-600">
                        {value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Services Used */}
            {services_used && services_used.length > 0 && (
              <div className="bg-white border rounded-lg p-6 mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Services Used</h3>
                <div className="space-y-3">
                  {services_used.map((service: Service) => (
                    <Link 
                      key={service.id}
                      href={`/services/${service.slug}`}
                      className="block p-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-200"
                    >
                      <div className="flex items-center">
                        {service.metadata.service_icon && (
                          <img
                            src={`${service.metadata.service_icon.imgix_url}?w=40&h=40&fit=crop&auto=format,compress`}
                            alt={service.metadata.service_name}
                            className="w-8 h-8 rounded mr-3 flex-shrink-0"
                          />
                        )}
                        <div>
                          <div className="font-semibold text-gray-900">
                            {service.metadata.service_name}
                          </div>
                          {service.metadata.starting_price && (
                            <div className="text-sm text-gray-600">
                              Starting at {service.metadata.starting_price}
                            </div>
                          )}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Project Details */}
            <div className="bg-white border rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Project Details</h3>
              <div className="space-y-3">
                <div>
                  <div className="text-sm font-medium text-gray-600">Client</div>
                  <div className="text-gray-900">{client}</div>
                </div>
                {industry && (
                  <div>
                    <div className="text-sm font-medium text-gray-600">Industry</div>
                    <div className="text-gray-900">{industry}</div>
                  </div>
                )}
                {project_duration && (
                  <div>
                    <div className="text-sm font-medium text-gray-600">Duration</div>
                    <div className="text-gray-900">{project_duration}</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gray-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to achieve similar results?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Let&apos;s discuss how we can help transform your business with our proven strategies and expertise.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
            >
              Start Your Project
            </Link>
            <Link
              href="/case-studies"
              className="inline-block border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition-colors duration-200"
            >
              View More Case Studies
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export async function generateStaticParams() {
  try {
    const response = await cosmic.objects
      .find({
        type: 'case-studies',
      })
      .props(['slug'])

    return response.objects.map((caseStudy: { slug: string }) => ({
      slug: caseStudy.slug,
    }))
  } catch (error) {
    console.error('Error generating static params:', error)
    return []
  }
}