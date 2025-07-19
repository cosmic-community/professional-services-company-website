import { Testimonial } from '@/types'

interface TestimonialsProps {
  testimonials: Testimonial[]
}

export default function Testimonials({ testimonials }: TestimonialsProps) {
  if (!testimonials || testimonials.length === 0) {
    return null
  }

  // Show featured testimonials first, then others
  const sortedTestimonials = [...testimonials].sort((a, b) => {
    if (a.metadata.featured && !b.metadata.featured) return -1
    if (!a.metadata.featured && b.metadata.featured) return 1
    return 0
  })

  const renderStars = (rating: string) => {
    const numStars = parseInt(rating)
    return Array.from({ length: 5 }, (_, i) => (
      <svg
        key={i}
        className={`w-5 h-5 ${i < numStars ? 'text-yellow-400' : 'text-gray-300'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Clients Say</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Don't just take our word for it - hear from the businesses we've helped succeed
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedTestimonials.map((testimonial) => (
            <div 
              key={testimonial.id} 
              className={`bg-white rounded-lg shadow-lg p-6 relative ${
                testimonial.metadata.featured ? 'ring-2 ring-blue-500 ring-opacity-50' : ''
              }`}
            >
              {testimonial.metadata.featured && (
                <div className="absolute -top-3 left-4 bg-blue-500 text-white px-3 py-1 rounded text-sm font-medium">
                  Featured
                </div>
              )}
              
              <div className="flex items-center mb-4">
                {testimonial.metadata.rating && (
                  <div className="flex mr-2">
                    {renderStars(testimonial.metadata.rating.key)}
                  </div>
                )}
              </div>
              
              <blockquote className="text-gray-700 mb-6 italic">
                "{testimonial.metadata.testimonial_text}"
              </blockquote>
              
              <div className="flex items-center">
                {testimonial.metadata.client_photo && (
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4 flex-shrink-0">
                    <img
                      src={`${testimonial.metadata.client_photo.imgix_url}?w=100&h=100&fit=crop&auto=format,compress`}
                      alt={testimonial.metadata.client_name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                
                <div>
                  <div className="font-medium text-gray-900">
                    {testimonial.metadata.client_name}
                  </div>
                  <div className="text-sm text-gray-600">
                    {testimonial.metadata.position}
                    {testimonial.metadata.company && (
                      <span> at {testimonial.metadata.company}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}