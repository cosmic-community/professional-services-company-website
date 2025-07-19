import { cosmic } from '@/lib/cosmic'
import { TeamMember } from '@/types'
import Footer from '@/components/Footer'

async function getTeamMembers(): Promise<TeamMember[]> {
  try {
    const response = await cosmic.objects.find({ type: 'team-members' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    return response.objects as TeamMember[]
  } catch (error) {
    if ((error as any).status === 404) {
      return []
    }
    throw error
  }
}

export default async function TeamPage() {
  const teamMembers = await getTeamMembers()

  return (
    <main>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Meet Our Team
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            The talented professionals behind our success
          </p>
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          {teamMembers.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map((member) => (
                <div
                  key={member.id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  {member.metadata?.profile_photo?.imgix_url && (
                    <div className="h-64 bg-gray-100">
                      <img
                        src={`${member.metadata.profile_photo.imgix_url}?w=400&h=512&fit=crop&auto=format,compress`}
                        alt={member.metadata.full_name || member.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">
                      {member.metadata?.full_name || member.title}
                    </h3>
                    <p className="text-blue-600 font-medium mb-3">
                      {member.metadata?.job_title}
                    </p>
                    {member.metadata?.bio && (
                      <p className="text-gray-600 mb-4">
                        {member.metadata.bio}
                      </p>
                    )}
                    {member.metadata?.years_experience && (
                      <div className="mb-4">
                        <span className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
                          {member.metadata.years_experience} years experience
                        </span>
                      </div>
                    )}
                    <div className="flex space-x-4">
                      {member.metadata?.email && (
                        <a
                          href={`mailto:${member.metadata.email}`}
                          className="text-gray-400 hover:text-blue-600 transition-colors duration-300"
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M24 4.557c0-1.088-.884-1.978-1.972-1.978H1.972C.884 2.579 0 3.469 0 4.557v14.886c0 1.088.884 1.978 1.972 1.978h20.056c1.088 0 1.972-.89 1.972-1.978V4.557zm-1.972 0L12 11.196 1.972 4.557h20.056zm-20.056.891l9.145 6.533a1.003 1.003 0 001.766 0l9.145-6.533v13.995H1.972V5.448z"/>
                          </svg>
                        </a>
                      )}
                      {member.metadata?.linkedin_url && (
                        <a
                          href={member.metadata.linkedin_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-blue-600 transition-colors duration-300"
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-gray-600 text-lg">No team members available at the moment.</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}