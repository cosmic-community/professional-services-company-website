import { cosmic } from '@/lib/cosmic'
import { Service } from '@/types'
import Footer from '@/components/Footer'

async function getServices(): Promise<Service[]> {
  try {
    const response = await cosmic.objects.find({ type: 'services' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    return response.objects as Service[]
  } catch (error) {
    if ((error as any).status === 404) {
      return []
    }
    throw error
  }
}

export default async function ServicesPage() {
  const services = await getServices()

  return (
    <main>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Our Services
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Comprehensive solutions to help your business succeed in the digital age
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          {services.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service) => (
                <div
                  key={service.id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  {service.metadata?.service_icon?.imgix_url && (
                    <div className="h-48 bg-gray-100 flex items-center justify-center">
                      <img
                        src={`${service.metadata.service_icon.imgix_url}?w=400&h=300&fit=crop&auto=format,compress`}
                        alt={service.metadata.service_name || service.title}
                        className="w-24 h-24 object-contain"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-3">
                      {service.metadata?.service_name || service.title}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {service.metadata?.short_description}
                    </p>
                    {service.metadata?.starting_price && (
                      <div className="mb-4">
                        <span className="text-2xl font-bold text-blue-600">
                          {service.metadata.starting_price}
                        </span>
                      </div>
                    )}
                    {service.metadata?.key_features && Array.isArray(service.metadata.key_features) && (
                      <div className="mb-6">
                        <h4 className="font-semibold mb-2">Key Features:</h4>
                        <ul className="text-gray-600 space-y-1">
                          {service.metadata.key_features.map((feature, index) => (
                            <li key={index} className="flex items-center">
                              <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {service.metadata?.full_description && (
                      <div className="prose prose-sm max-w-none">
                        <div dangerouslySetInnerHTML={{ __html: service.metadata.full_description }} />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-gray-600 text-lg">No services available at the moment.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Contact us today to discuss your project and see how we can help your business grow.
          </p>
          <a
            href="/contact"
            className="bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 transition-colors duration-300 inline-block"
          >
            Get In Touch
          </a>
        </div>
      </section>

      <Footer />
    </main>
  )
}