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
      <main className="mx-auto w-full max-w-[1280px] flex-1 bg-neutral-300 p-4 sm:p-6 lg:p-8">
        <div className="mx-auto flex w-full max-w-[1216px] flex-col gap-16 rounded-t-[20px] rounded-b-[60px] bg-white pt-4 pb-8 lg:gap-24 lg:pb-0 dark:bg-neutral-800">
          <div className="px-4 sm:px-6 lg:px-0">
            <SiteHeader />
          </div>
          <div className="px-4 sm:px-6 lg:px-0">
            <HeroSection />
          </div>
          <div className="px-4 sm:px-6 lg:px-0">
            <FeaturesSection />
          </div>
          <div className="px-4 sm:px-6 lg:px-0">
            <CtaSection />
          </div>
          <SiteFooter />
        </div>
      </main>
      <ScheduleModal />
    </ScheduleCallProvider>
  );
}
