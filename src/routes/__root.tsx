import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Nav } from "../components/site/Nav";
import { Footer } from "../components/site/Footer";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <div className="eyebrow">Error · 404</div>
        <h1 className="mt-4 font-display text-6xl font-semibold text-foreground">Off course</h1>
        <p className="mt-4 text-sm text-muted-foreground">
          The page you're looking for isn't in our flight plan.
        </p>
        <div className="mt-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-sm bg-signal px-5 py-3 text-xs font-mono uppercase tracking-widest text-signal-foreground hover:brightness-110"
          >
            Return to base
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <div className="eyebrow">System · Fault</div>
        <h1 className="mt-4 font-display text-3xl font-semibold text-foreground">
          This page didn't load
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Something went wrong on our end. Try again or return home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="inline-flex items-center rounded-sm bg-signal px-4 py-2 text-xs font-mono uppercase tracking-widest text-signal-foreground hover:brightness-110"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center rounded-sm border border-border px-4 py-2 text-xs font-mono uppercase tracking-widest text-foreground hover:border-signal"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "author", content: "The Rockhill Group, Inc." },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "The Rockhill Group" },
      { title: "The Rockhill Group — Aircrew Training, Air Transportation & Technical Services" },
      { property: "og:title", content: "The Rockhill Group — Aircrew Training, Air Transportation & Technical Services" },
      { name: "twitter:title", content: "The Rockhill Group — Aircrew Training, Air Transportation & Technical Services" },
      { name: "description", content: "TRG delivers aircrew training, air transportation, and professional, scientific & technical services to DoD, NOAA and the FAA with exceptional past performance." },
      { property: "og:description", content: "TRG delivers aircrew training, air transportation, and professional, scientific & technical services to DoD, NOAA and the FAA with exceptional past performance." },
      { name: "twitter:description", content: "TRG delivers aircrew training, air transportation, and professional, scientific & technical services to DoD, NOAA and the FAA with exceptional past performance." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/d3744112-9a07-4a1c-978e-52f534e7dca2/id-preview-40d4a472--f9aca3e9-b54c-491e-ab15-f7061e05652d.lovable.app-1784815541474.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/d3744112-9a07-4a1c-978e-52f534e7dca2/id-preview-40d4a472--f9aca3e9-b54c-491e-ab15-f7061e05652d.lovable.app-1784815541474.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/x-icon", href: "/favicon.webp" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Space+Grotesk:wght@400;500;600;700&family=Playfair+Display:wght@600;700;800&family=JetBrains+Mono:wght@400;500&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <Nav />
      <main>
        <Outlet />
      </main>
      <Footer />
    </QueryClientProvider>
  );
}
