import { useState } from 'react';
import { MotionConfig } from 'framer-motion';
import { AboutSection } from './components/AboutSection';
import { BlogSection } from './components/BlogSection';
import { ContactSection } from './components/ContactSection';
import { FooterSection } from './components/FooterSection';
import { HeaderNav } from './components/HeaderNav';
import { HeroSection } from './components/HeroSection';
import { PortfolioGallery } from './components/PortfolioGallery';
import { PortfolioSpreadModal } from './components/PortfolioSpreadModal';
import { ServicesSection } from './components/ServicesSection';
import type { PortfolioPhoto } from './data/studioData';
import { scrollToSection } from './utils/navigation';

export default function App() {
  const [activePhotoId, setActivePhotoId] = useState<string | null>(null);
  const [inquiryTopic, setInquiryTopic] = useState<string | null>(null);

  const scrollToContact = (serviceTitle?: string) => {
    if (serviceTitle) {
      setInquiryTopic(serviceTitle);
    }
    scrollToSection('#contact');
  };

  const handleSelectPhoto = (photo: PortfolioPhoto) => {
    setActivePhotoId(photo.id);
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-white text-neutral-950 flex flex-col overflow-x-clip">
        <HeaderNav />

        <main className="flex-1 bg-white">
          <HeroSection onStartProject={() => scrollToContact()} />
          <AboutSection onChatClick={() => scrollToContact('Konsultasi Proyek Arsitektur')} />
          <PortfolioGallery onSelectPhoto={handleSelectPhoto} />
          <ServicesSection onStartProject={scrollToContact} />
          <BlogSection />
          <ContactSection prefilledTopic={inquiryTopic} />
        </main>

        <FooterSection />

        <PortfolioSpreadModal
          activePhotoId={activePhotoId}
          onSelectPhotoId={setActivePhotoId}
          onClose={() => setActivePhotoId(null)}
        />
      </div>
    </MotionConfig>
  );
}
