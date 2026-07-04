import {
  Logo,
  SocialXIcon,
  SocialLinkedInIcon,
  SocialFacebookIcon,
  SocialYoutubeIcon,
  SocialInstagramIcon,
} from "@/components/icons";
import { FooterScheduleCallButton } from "@/components/schedule/schedule-call-button";

const COLUMNS = [
  {
    heading: "Product",
    className: "lg:w-[172px]",
    links: ["Overview", "Key Features", "Integrations", "Customisation Options", "AI-led Insights"],
  },
  {
    heading: "Academy",
    className: "lg:w-[156px]",
    links: ["Training programme", "Webinars", "Education blog", "FAQs"],
  },
  {
    heading: "Company",
    className: "lg:w-[105px]",
    links: ["Partnerships", "Media + Press", "Contact Us", "About"],
  },
];

const SOCIAL_ICONS = [
  { Icon: SocialXIcon, label: "X (Twitter)" },
  { Icon: SocialLinkedInIcon, label: "LinkedIn" },
  { Icon: SocialFacebookIcon, label: "Facebook" },
  { Icon: SocialYoutubeIcon, label: "YouTube" },
  { Icon: SocialInstagramIcon, label: "Instagram" },
];

function FooterColumn({ heading, links, className }: { heading: string; links: string[]; className?: string }) {
  return (
    <div className={className}>
      <h3 className="font-sans font-bold text-neutral-200">{heading}</h3>
      <ul className="mt-4 flex flex-col gap-4">
        {links.map((link) => (
          <li key={link}>
            <a href="#" className="font-sans text-neutral-200 hover:underline">
              {link}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="w-full rounded-t-[60px] bg-neutral-600 px-8 py-16">
      <div className="mx-auto flex w-full max-w-[864px] flex-col gap-8 lg:flex-row lg:justify-between">
        <div className="flex flex-col gap-8 sm:flex-row sm:gap-8">
          {COLUMNS.slice(0, 2).map((col) => (
            <FooterColumn key={col.heading} {...col} />
          ))}
          <div className="lg:w-[179px]">
            <h3 className="font-sans font-bold text-neutral-200">Support</h3>
            <ul className="mt-4 flex flex-col gap-4">
              <li>
                <a href="#" className="font-sans text-neutral-200 hover:underline">
                  Support Center
                </a>
              </li>
              <li>
                <a href="#" className="font-sans text-neutral-200 hover:underline">
                  Account login
                </a>
              </li>
              <li>
                <FooterScheduleCallButton />
              </li>
            </ul>
          </div>
        </div>

        <FooterColumn {...COLUMNS[2]} />
      </div>

      <div className="mx-auto mt-16 flex w-full max-w-[256px] flex-col items-center gap-8 text-center">
        <div className="flex flex-col items-center gap-4">
          <Logo className="h-[31px] w-auto text-primary-400" />
          <div className="flex items-center gap-4 text-primary-400">
            {SOCIAL_ICONS.map(({ Icon, label }) => (
              <a key={label} href="#" aria-label={label}>
                <Icon className="size-5" />
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-8">
          <a href="#" className="font-sans text-neutral-200 hover:underline">
            Terms of service
          </a>
          <a href="#" className="font-sans text-neutral-200 hover:underline">
            Privacy policy
          </a>
        </div>

        <p className="font-sans text-sm font-bold text-neutral-200">
          © 2024 FlowSpark Digital LLC
        </p>
      </div>
    </footer>
  );
}
