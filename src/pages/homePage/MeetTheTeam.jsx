import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import teamMembers from '../../components/data/teamMembers';

const MeetTheTeam = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const sectionElement = sectionRef.current;

    // Set up IntersectionObserver for the section
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target === sectionElement) {
              // Animate Heading
              gsap.fromTo(
                '.team-heading',
                { opacity: 0, y: -50 },
                { opacity: 1, y: 0, duration: 1.5, ease: 'power3.out' }
              );

              // Animate Cards
              gsap.fromTo(
                '.team-card',
                { opacity: 0, y: 50 },
                { opacity: 1, y: 0, stagger: 0.2, duration: 1.5, ease: 'power3.out' }
              );
            }
          }
        });
      },
      { threshold: 0.2 }
    );

    // Start observing the section element
    if (sectionElement) observer.observe(sectionElement);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="meet-the-team"
      className="relative bg-gradient-to-b bg-amber-100 py-20 flex flex-col justify-start items-center text-center px-6 md:px-12 lg:px-20"
      ref={sectionRef}
    >
      {/* Heading */}
      <h2 className="team-heading text-4xl md:text-5xl font-bold text-green-800 mb-20">
        Meet the Team
      </h2>

      {/* Cards */}
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12 lg:gap-16">
        {teamMembers.map((member, index) => (
          <div
            key={index}
            className="team-card bg-white rounded-xl shadow-lg p-8 relative hover:shadow-2xl transition transform hover:-translate-y-2"
          >
            {/* Profile Picture */}
            <div className="w-32 h-32 rounded-full overflow-hidden mx-auto -mt-20 border-4 border-white shadow-lg">
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content */}
            <div className="mt-8">
              <h3 className="text-2xl font-semibold text-green-900 mb-2">
                {member.name}
              </h3>
              <p className="text-md text-green-700 font-medium mb-4">
                {member.role}
              </p>
              <p className="text-green-600 text-sm leading-relaxed">
                {member.bio}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MeetTheTeam;