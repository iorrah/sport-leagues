import { memo } from "react";
import { Shield, ShieldOff, Loader2, AlertCircle, Eye, EyeOff } from "lucide-react";
import type { League } from "@/types";
import { useLeagueBadge } from "@/hooks/useLeagueBadge";

interface Props {
  league: League;
  searchTerm: string;
  isRevealed: boolean;
  onReveal: (leagueId: string, leagueName: string) => void;
  onHide: (leagueId: string) => void;
}

const escapeRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const faceStyle = {
  backfaceVisibility: "hidden" as const,
  WebkitBackfaceVisibility: "hidden" as const,
};

const backFaceStyle = {
  ...faceStyle,
  transform: "rotateY(180deg)",
};

const HighlightedText = memo(({ text, highlight }: { text: string; highlight: string }) => {
  if (!highlight.trim()) {
    return <span>{text}</span>;
  }

  const regex = new RegExp(`(${escapeRegExp(highlight)})`, "gi");
  const parts = text.split(regex);

  return (
    <span>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <mark key={i} className="rounded-sm bg-primary/20 px-0.5 font-semibold text-foreground">
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </span>
  );
});

HighlightedText.displayName = "HighlightedText";

const LeagueInfo = memo(({ league, searchTerm }: { league: League; searchTerm: string }) => (
  <div className="px-8 text-center">
    <h3 className="mb-2 text-lg font-semibold text-card-foreground">
      <HighlightedText text={league.strLeague} highlight={searchTerm} />
    </h3>

    <div className="flex flex-wrap justify-center gap-2">
      <span className="rounded-full bg-neutral-200 px-3 py-1 font-mono text-xs font-medium text-neutral-500">
        #{league.idLeague}
      </span>

      <span className="rounded-full bg-neutral-200 px-3 py-1 font-mono text-xs font-medium text-neutral-500">
        {league.strSport}
      </span>
    </div>
  </div>
));

LeagueInfo.displayName = "LeagueInfo";

const LeagueCardComponent = ({ league, searchTerm, isRevealed, onReveal, onHide }: Props) => {
  const {
    data: badgeUrl,
    isLoading,
    isError,
    refetch,
  } = useLeagueBadge(league.idLeague, isRevealed);

  const handleReveal = () => {
    onReveal(league.idLeague, league.strLeague);
  };

  const handleHide = () => {
    onHide(league.idLeague);
  };

  const cardStyle = {
    transformStyle: "preserve-3d" as const,
    WebkitTransformStyle: "preserve-3d" as const,
    transition: "transform 600ms cubic-bezier(0.4, 0, 0.2, 1)",
    transform: isRevealed ? "rotateY(180deg)" : "rotateY(0deg)",
  };

  return (
    <div
      className="group h-[480px] w-full perspective-[1000px]"
      data-testid={`league-card-${league.idLeague}`}
    >
      <div className="relative h-full w-full will-change-transform" style={cardStyle}>
        {/* FRONT */}
        <div
          className="absolute inset-0 flex h-full w-full flex-col overflow-hidden rounded-xl bg-white shadow-md"
          style={faceStyle}
        >
          <div className="p-12" />

          <div className="flex flex-1 flex-col items-center justify-center bg-muted/5 p-6">
            <div className="relative flex h-24 w-20 items-center justify-center">
              <Shield className="h-16 w-16 text-muted-foreground/30" strokeWidth={1} />

              <span className="absolute top-7 text-4xl font-light">?</span>
            </div>
          </div>

          <LeagueInfo league={league} searchTerm={searchTerm} />

          <div className="p-12">
            <button
              data-testid={`reveal-button-${league.idLeague}`}
              onClick={handleReveal}
              className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-primary px-6 py-4 font-medium text-white transition-all hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              <Eye />
              Reveal badge
            </button>
          </div>
        </div>

        {/* BACK */}
        <div
          className="absolute inset-0 flex h-full w-full flex-col overflow-hidden rounded-xl bg-white shadow-md"
          style={backFaceStyle}
        >
          <div className="p-12" />

          <div className="flex flex-1 flex-col items-center justify-center bg-muted/5 p-6">
            {isLoading && (
              <div className="flex flex-col items-center text-muted-foreground">
                <Loader2 className="mb-3 h-8 w-8 animate-spin" />

                <span className="text-sm">Loading badge...</span>
              </div>
            )}

            {isError && (
              <div className="flex flex-col items-center text-center">
                <AlertCircle className="mb-3 h-10 w-10 text-destructive" />

                <p className="mb-4 text-sm text-muted-foreground">Couldn't load badge</p>

                <button
                  onClick={() => {
                    void refetch();
                  }}
                  className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-95"
                >
                  Retry
                </button>
              </div>
            )}

            {!isLoading && !isError && badgeUrl === null && (
              <div className="flex flex-col items-center pt-8 text-center">
                <ShieldOff className="mb-3 h-16 w-16 text-muted-foreground/30" strokeWidth={1} />

                <p className="text-sm font-medium">No badge available</p>
              </div>
            )}

            {!isLoading && !isError && badgeUrl && (
              <div className="flex h-24 w-20 items-center justify-center">
                <img
                  src={badgeUrl}
                  alt={`${league.strLeague} badge`}
                  loading="lazy"
                  className="animate-in fade-in zoom-in-95 max-h-full max-w-full object-contain drop-shadow-md duration-500"
                />
              </div>
            )}
          </div>

          <LeagueInfo league={league} searchTerm={searchTerm} />

          <div className="p-12">
            <button
              onClick={handleHide}
              className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-primary px-6 py-4 font-medium text-white transition-all hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              <EyeOff />
              Hide badge
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

LeagueCardComponent.displayName = "LeagueCard";

export const LeagueCard = memo(LeagueCardComponent);

LeagueCard.displayName = "LeagueCard";
