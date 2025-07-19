import { CaseStudy } from '@/types'

interface CaseStudiesProps {
  caseStudies: CaseStudy[]
}

export default function CaseStudies({ caseStudies }: CaseStudiesProps) {
  if (!caseStudies || caseStudies.length === 0) {
    return null
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Case Studies</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover how we've helped businesses achieve their goals with innovative solutions
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {caseStudies.map((caseStudy) => (
            <div key={caseStudy.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              {caseStudy.metadata.featured_image && (
                <div className="h-48 overflow-hidden">
                  <img
                    src={`${caseStudy.metadata.featured_image.imgix_url}?w=600&h=300&fit=crop&auto=format,compress`}
                    alt={caseStudy.metadata.project_title || caseStudy.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-sm font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded">
                    {caseStudy.metadata.industry}
                  </span>
                  {caseStudy.metadata.project_duration && (
                    <span className="text-sm text-gray-500">
                      {caseStudy.metadata.project_duration}
                    </span>
                  )}
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {caseStudy.metadata.project_title || caseStudy.title}
                </h3>
                
                <p className="text-gray-600 mb-4">
                  {caseStudy.metadata.client}
                </p>
                
                <p className="text-gray-700 mb-4 line-clamp-3">
                  {caseStudy.metadata.project_summary}
                </p>
                
                {caseStudy.metadata.services_used && caseStudy.metadata.services_used.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {caseStudy.metadata.services_used.slice(0, 3).map((service, index) => (
                      <span 
                        key={service.id || index}
                        className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                      >
                        {service.metadata?.service_name || service.title}
                      </span>
                    ))}
                  </div>
                )}
                
                <button className="text-blue-600 font-medium hover:text-blue-700 transition-colors duration-300">
                  View Case Study →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}