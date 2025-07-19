import { Service } from '@/types'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { ArrowLeft, CheckCircle, ExternalLink } from 'lucide-react'

interface ServiceDetailProps {
  service: Service
  relatedServices: Service[]
}

export default function ServiceDetail({ service, relatedServices }: ServiceDetailProps) {
  return (
    <main>
      {/* Navigation */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Services
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            {service.metadata?.service_icon?.imgix_url && (
              <div className="mb-8 flex justify-center">
                <img
                  src={`${service.metadata.service_icon.imgix_url}?w=160&h=160&fit=crop&auto=format,compress`}
                  alt={service.metadata.service_name || service.title}
                  className="w-20 h-20 bg-white/10 rounded-lg p-4"
                />
              </div>
            )}
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {service.metadata?.service_name || service.title}
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              {service.metadata?.short_description}
            </p>
            {service.metadata?.starting_price && (
              <div className="text-3xl font-bold">
                Starting at {service.metadata.starting_price}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Service Details */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-2">
                {service.metadata?.full_description && (
                  <div className="mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">
                      Service Overview
                    </h2>
                    <div 
                      className="prose prose-lg max-w-none text-gray-600 leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: service.metadata.full_description }}
                    />
                  </div>
                )}

                {service.metadata?.key_features && Array.isArray(service.metadata.key_features) && (
                  <div className="mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">
                      What's Included
                    </h2>
                    <div className="grid md:grid-cols-2 gap-4">
                      {service.metadata.key_features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-gray-50 rounded-lg p-6 sticky top-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Get Started Today
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Ready to take your business to the next level? Contact us to discuss your project.
                  </p>
                  <div className="space-y-3">
                    <Link
                      href="/contact"
                      className="w-full bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors duration-300 text-center block"
                    >
                      Start Your Project
                    </Link>
                    <Link
                      href="/contact"
                      className="w-full border border-blue-600 text-blue-600 px-6 py-3 rounded-md hover:bg-blue-50 transition-colors duration-300 text-center block"
                    >
                      Get a Quote
                    </Link>
                  </div>
                  {service.metadata?.starting_price && (
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <div className="text-sm text-gray-500 mb-1">Starting Price</div>
                      <div className="text-2xl font-bold text-gray-900">
                        {service.metadata.starting_price}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Services */}
      {relatedServices.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                Other Services You Might Like
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                {relatedServices.map((relatedService) => (
                  <div
                    key={relatedService.id}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                  >
                    {relatedService.metadata?.service_icon?.imgix_url && (
                      <div className="h-32 bg-gray-100 flex items-center justify-center">
                        <img
                          src={`${relatedService.metadata.service_icon.imgix_url}?w=200&h=150&fit=crop&auto=format,compress`}
                          alt={relatedService.metadata.service_name || relatedService.title}
                          className="w-16 h-16 object-contain"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-3">
                        {relatedService.metadata?.service_name || relatedService.title}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {relatedService.metadata?.short_description}
                      </p>
                      {relatedService.metadata?.starting_price && (
                        <div className="text-lg font-semibold text-blue-600 mb-4">
                          {relatedService.metadata.starting_price}
                        </div>
                      )}
                      <Link
                        href={`/services/${relatedService.slug}`}
                        className="inline-flex items-center gap-2 text-blue-600 font-medium hover:text-blue-700 transition-colors"
                      >
                        Learn More
                        <ExternalLink className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Get Started with {service.metadata?.service_name || service.title}?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Let's discuss how we can help you achieve your business goals with our professional services.
          </p>
          <Link
            href="/contact"
            className="bg-white text-blue-600 px-8 py-3 rounded-md hover:bg-gray-100 transition-colors duration-300 inline-block font-semibold"
          >
            Contact Us Today
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}