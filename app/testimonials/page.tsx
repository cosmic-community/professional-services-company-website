import { cosmic } from '@/lib/cosmic'
import { Testimonial } from '@/types'
import Footer from '@/components/Footer'

async function getTestimonials(): Promise<Testimonial[]> {
  try {
    const response = await cosmic.objects.find({ type: 'testimonials' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    return response.objects as Testimonial[]
  } catch (error) {
    if ((error as any).status === 404) {
      return []
    }
    throw error
  }
}

export default async function TestimonialsPage() {
  const testimonials = await getTestimonials()

  const renderStars = (rating: string | number) => {
    const numStars = typeof rating === 'string' ? parseInt(rating) : rating
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
    <main>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Client Testimonials
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Hear what our clients have to say about working with us
          </p>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          {testimonials.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="flex mb-4">
                    {renderStars(testimonial.metadata?.rating?.key || 5)}
                  </div>
                  <blockquote className="text-gray-600 mb-6 italic">
                    "{testimonial.metadata?.testimonial_text}"
                  </blockquote>
                  <div className="flex items-center">
                    {testimonial.metadata?.client_photo?.imgix_url && (
                      <img
                        src={`${testimonial.metadata.client_photo.imgix_url}?w=120&h=120&fit=crop&auto=format,compress`}
                        alt={testimonial.metadata.client_name}
                        className="w-12 h-12 rounded-full object-cover mr-4"
                      />
                    )}
                    <div>
                      <div className="font-semibold text-gray-900">
                        {testimonial.metadata?.client_name}
                      </div>
                      {testimonial.metadata?.position && testimonial.metadata?.company && (
                        <div className="text-gray-600 text-sm">
                          {testimonial.metadata.position} at {testimonial.metadata.company}
                        </div>
                      )}
                    </div>
                  </div>
                  {testimonial.metadata?.featured && (
                    <div className="mt-4">
                      <span className="inline-block bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-1 rounded-full">
                        Featured
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-gray-600 text-lg">No testimonials available at the moment.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Join Our Happy Clients</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Ready to experience the same level of service and results? Let's get started on your project today.
          </p>
          <a
            href="/contact"
            className="bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 transition-colors duration-300 inline-block"
          >
            Get Started
          </a>
        </div>
      </section>

      <Footer />
    </main>
  )
}