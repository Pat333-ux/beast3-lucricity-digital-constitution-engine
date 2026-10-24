import Link from "next/link";
import { footerNav } from "@/config/navigation";
import { siteConfig } from "@/config/site";

export function Footer() {
  return (
    <footer className="w-full border-t border-border bg-background">
      <div className="container px-4 py-10 md:px-8 md:py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-3 md:col-span-2">
            <span className="font-bold text-base tracking-tight text-foreground">
              {siteConfig.name}
            </span>
            <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
              {siteConfig.description}
            </p>
            <div className="text-xs text-muted-foreground pt-2">
              <span>Jurisdiction: </span>
              <strong className="text-foreground font-medium">
                {siteConfig.governance.city}, {siteConfig.governance.county}, {siteConfig.governance.region}
              </strong>
            </div>
          </div>

          {footerNav.map((section) => (
            <div key={section.title} className="space-y-3">
              <h4 className="text-sm font-semibold tracking-wide text-foreground uppercase">
                {section.title}
              </h4>
              <ul className="space-y-2 text-sm">
                {section.items.map((item) => (
                  <li key={item.title}>
                    {item.external ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noreferrer"
                        className="text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {item.title}
                      </a>
                    ) : (
                      <Link
                        href={item.href}
                        className="text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {item.title}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} LUCRICITY Digital Constitution Engine. All rights reserved.
          </p>
          <div className="flex items-center space-x-4">
            <span>Version {siteConfig.governance.version}</span>
            <span>&bull;</span>
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
              className="hover:underline"
            >
              GitHub Repository
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
