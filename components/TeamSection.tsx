import { TeamMember } from '@/types'

interface TeamSectionProps {
  teamMembers: TeamMember[]
}

export default function TeamSection({ teamMembers }: TeamSectionProps) {
  if (!teamMembers || teamMembers.length === 0) {
    return null
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our experienced professionals are dedicated to delivering exceptional results for your business
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {teamMembers.map((member) => (
            <div key={member.id} className="text-center group">
              {member.metadata.profile_photo && (
                <div className="relative mb-6 mx-auto w-48 h-48 overflow-hidden rounded-full">
                  <img
                    src={`${member.metadata.profile_photo.imgix_url}?w=300&h=300&fit=crop&auto=format,compress`}
                    alt={member.metadata.full_name || member.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {member.metadata.full_name || member.title}
              </h3>
              
              <p className="text-blue-600 font-medium mb-3">
                {member.metadata.job_title}
              </p>
              
              {member.metadata.years_experience && (
                <p className="text-sm text-gray-500 mb-4">
                  {member.metadata.years_experience} years experience
                </p>
              )}
              
              {member.metadata.bio && (
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {member.metadata.bio}
                </p>
              )}
              
              <div className="flex justify-center gap-4">
                {member.metadata.email && (
                  <a 
                    href={`mailto:${member.metadata.email}`}
                    className="text-gray-400 hover:text-blue-600 transition-colors duration-300"
                  >
                    <span className="sr-only">Email</span>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </a>
                )}
                
                {member.metadata.linkedin_url && (
                  <a 
                    href={member.metadata.linkedin_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-blue-600 transition-colors duration-300"
                  >
                    <span className="sr-only">LinkedIn</span>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
                    </svg>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}