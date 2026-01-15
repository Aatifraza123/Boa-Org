import { Layout } from '@/components/layout/Layout';
import { SeminarPopup } from '@/components/home/SeminarPopup';
import { HeroSection } from '@/components/home/HeroSection';
import { UpcomingEventsCarousel } from '@/components/home/UpcomingEventsCarousel';
import { SeminarsSection } from '@/components/home/SeminarsSection';
import { CommitteeSection } from '@/components/home/CommitteeSection';

const Index = () => {
  return (
    <Layout>
      <SeminarPopup />
      <HeroSection />
      <UpcomingEventsCarousel />
      <CommitteeSection />
      <SeminarsSection />
    </Layout>
  );
};

export default Index;
