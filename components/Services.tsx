import { Service } from '@/types'
import { ExternalLink } from 'lucide-react'

interface ServicesProps {
  services: Service[]
}

export default function Services({ services }: ServicesProps) {
  if (!services || services.length === 0) {
    return (
      <section id="services" className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-8">Our Services</h2>
          <p className="text-gray-600">Services will be displayed here once content is added.</p>
        </div>
      </section>
    )
  }

  return (
    <section id="services" className="py-20 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We offer comprehensive solutions to help your business succeed in today's competitive landscape.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div key={service.id} className="card p-8 hover:scale-105 transition-transform duration-200">
              {service.metadata?.service_icon && (
                <div className="mb-6">
                  <img 
                    src={`${service.metadata.service_icon.imgix_url}?w=80&h=80&fit=crop&auto=format,compress`}
                    alt={service.metadata?.service_name || service.title}
                    width={80}
                    height={80}
                    className="rounded-lg"
                  />
                </div>
              )}
              
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {service.metadata?.service_name || service.title}
              </h3>
              
              <p className="text-gray-600 mb-6 leading-relaxed">
                {service.metadata?.short_description || 'Professional service offering'}
              </p>
              
              {service.metadata?.starting_price && (
                <div className="mb-6">
                  <span className="text-2xl font-bold text-primary-600">
                    {service.metadata.starting_price}
                  </span>
                </div>
              )}
              
              {service.metadata?.key_features && Array.isArray(service.metadata.key_features) && (
                <ul className="text-sm text-gray-600 mb-6 space-y-2">
                  {service.metadata.key_features.slice(0, 4).map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-primary-600 rounded-full"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              )}
              
              <a 
                href={`/services/${service.slug}`}
                className="inline-flex items-center gap-2 text-primary-600 font-medium hover:text-primary-700 transition-colors"
              >
                Learn More
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}