import { ExternalLink } from "lucide-react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-neutral-200 bg-card text-neutral-500">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="space-y-4">
            <h3 className="font-semibold">Sport Leagues</h3>

            <p className="text-sm leading-6 text-muted-foreground">
              A modern React application that explores sports leagues using The Sports DB API. Built
              as a frontend engineering coding challenge with a focus on performance, accessibility
              and clean architecture.
            </p>
          </div>

          <div>
            <h4 className="mb-4 font-semibold">Project</h4>

            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <a
                  href="https://github.com/iorrah/sport-leagues"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 transition-colors"
                >
                  Source Code
                  <ExternalLink size={16} />
                </a>
              </li>

              <li>
                <a
                  href="https://www.thesportsdb.com/free_sports_api"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 transition-colors"
                >
                  Sports DB API
                  <ExternalLink size={16} />
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-semibold">Built With</h4>

            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>React 19</li>
              <li>TypeScript</li>
              <li>TanStack Query</li>
              <li>Tailwind CSS</li>
              <li>Vite</li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-semibold">Highlights</h4>

            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>Search by league</li>
              <li>Filter by sport</li>
              <li>Cached badge requests</li>
              <li>Responsive layout</li>
              <li>Accessible interactions</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-neutral-200 pt-6 text-sm text-muted-foreground md:flex-row">
          <p>© {currentYear} Sport Leagues. The home of all sport leagues</p>

          <p>
            Designed & developed by{" "}
            <a
              href="https://github.com/iorrah"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium transition-colors hover:underline"
            >
              @iorrah
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};
