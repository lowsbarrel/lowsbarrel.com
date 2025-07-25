import { useEffect, useRef } from "react";
import Hero from "@/components/Hero";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import BookAppointment from "@/components/BookAppointment";
import SpotifyNowPlaying from "@/components/SpotifyNowPlaying";
import Contact from "@/components/Contact";
import SectionIndicator from "@/components/SectionIndicator";
import { useScrollSnap } from "@/hooks/use-scroll-snap";

const Index = () => {
  const { registerSection, currentSection, totalSections, scrollToSection } = useScrollSnap();

  const heroRef = useRef<HTMLElement>(null);
  const experienceRef = useRef<HTMLElement>(null);
  const skillsRef = useRef<HTMLElement>(null);
  const bookAppointmentRef = useRef<HTMLElement>(null);
  const spotifyRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Register all sections
    if (heroRef.current) registerSection(heroRef.current);
    if (experienceRef.current) registerSection(experienceRef.current);
    if (skillsRef.current) registerSection(skillsRef.current);
    if (bookAppointmentRef.current) registerSection(bookAppointmentRef.current);
    if (spotifyRef.current) registerSection(spotifyRef.current);
    if (contactRef.current) registerSection(contactRef.current);
  }, [registerSection]);

  const sectionNames = ['About', 'Experience', 'Skills', 'Book a Call', 'Music', 'Contact'];

  return (
    <div className="min-h-screen bg-background">
      {/* Section Indicator */}
      <SectionIndicator
        currentSection={currentSection}
        totalSections={totalSections}
        onSectionClick={scrollToSection}
        sectionNames={sectionNames}
      />

      {/* Sections */}
      <Hero ref={heroRef} />
      <Experience ref={experienceRef} />
      <Skills ref={skillsRef} />
      <BookAppointment ref={bookAppointmentRef} />
      <SpotifyNowPlaying ref={spotifyRef} />
      <Contact ref={contactRef} />
    </div>
  );
};

export default Index;
