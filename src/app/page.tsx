import { SiteHeader } from "@/components/site-header";
import { HeroSection } from "@/components/hero-section";
import { FeaturesSection } from "@/components/features-section";
import { CtaSection } from "@/components/cta-section";
import { SiteFooter } from "@/components/site-footer";
import { ScheduleCallProvider } from "@/components/schedule/schedule-call-context";
import { ScheduleModal } from "@/components/schedule/schedule-modal";

export default function Home() {
  return (
    <ScheduleCallProvider>
      <main className="flex w-full flex-1 flex-col gap-16 pt-4 lg:gap-24">
        <div className="px-4 sm:px-6 lg:px-8">
          <SiteHeader />
        </div>
        <div className="px-4 sm:px-6 lg:px-8">
          <HeroSection />
        </div>
        <div className="px-4 sm:px-6 lg:px-8">
          <FeaturesSection />
        </div>
        <div className="px-4 sm:px-6 lg:px-8">
          <CtaSection />
        </div>
        <div className="px-4 sm:px-6 lg:px-8">
          <SiteFooter />
        </div>
      </main>
      <ScheduleModal />
    </ScheduleCallProvider>
  );
}
