import { cosmic } from '@/lib/cosmic'
import { CaseStudy } from '@/types'
import Footer from '@/components/Footer'

async function getCaseStudies(): Promise<CaseStudy[]> {
  try {
    const response = await cosmic.objects.find({ type: 'case-studies' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    return response.objects as CaseStudy[]
  } catch (error) {
    if ((error as any).status === 404) {
      return []
    }
    throw error
  }
}

export default async function CaseStudiesPage() {
  const caseStudies = await getCaseStudies()

  return (
    <main>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Case Studies
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Real results for real businesses - see how we've helped our clients succeed
          </p>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          {caseStudies.length > 0 ? (
            <div className="space-y-12">
              {caseStudies.map((caseStudy, index) => (
                <div
                  key={caseStudy.id}
                  className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 items-center`}
                >
                  {caseStudy.metadata?.featured_image?.imgix_url && (
                    <div className="w-full lg:w-1/2">
                      <img
                        src={`${caseStudy.metadata.featured_image.imgix_url}?w=800&h=600&fit=crop&auto=format,compress`}
                        alt={caseStudy.metadata.project_title || caseStudy.title}
                        className="w-full h-80 object-cover rounded-lg shadow-lg"
                      />
                    </div>
                  )}
                  <div className="w-full lg:w-1/2">
                    <div className="mb-4">
                      <span className="inline-block bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                        {caseStudy.metadata?.industry}
                      </span>
                    </div>
                    <h2 className="text-3xl font-bold mb-4">
                      {caseStudy.metadata?.project_title || caseStudy.title}
                    </h2>
                    <p className="text-lg text-gray-600 mb-4">
                      <strong>Client:</strong> {caseStudy.metadata?.client}
                    </p>
                    <p className="text-gray-600 mb-6">
                      {caseStudy.metadata?.project_summary}
                    </p>
                    {caseStudy.metadata?.project_duration && (
                      <p className="text-gray-600 mb-4">
                        <strong>Duration:</strong> {caseStudy.metadata.project_duration}
                      </p>
                    )}
                    {caseStudy.metadata?.services_used && Array.isArray(caseStudy.metadata.services_used) && (
                      <div className="mb-6">
                        <h4 className="font-semibold mb-2">Services Used:</h4>
                        <div className="flex flex-wrap gap-2">
                          {caseStudy.metadata.services_used.map((service, index) => (
                            <span
                              key={index}
                              className="inline-block bg-gray-100 text-gray-700 text-sm font-medium px-3 py-1 rounded-full"
                            >
                              {service.metadata?.service_name || service.title}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-gray-600 text-lg">No case studies available at the moment.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Create Your Success Story?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Let's discuss your project and see how we can help you achieve similar results.
          </p>
          <a
            href="/contact"
            className="bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 transition-colors duration-300 inline-block"
          >
            Start Your Project
          </a>
        </div>
      </section>

      <Footer />
    </main>
  )
}