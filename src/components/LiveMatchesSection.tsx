import React, { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import MatchCard from "./MatchCard";

interface Match {
  id: string;
  teams: [
    {
      id: string;
      name: string;
      logo: string;
      score?: number;
    },
    {
      id: string;
      name: string;
      logo: string;
      score?: number;
    },
  ];
  gameType: string;
  tournament: string;
  startTime: string;
  isLive: boolean;
  streamUrl?: string;
}

interface LiveMatchesSectionProps {
  matches?: Match[];
  title?: string;
  onMatchSelect?: (match: Match) => void;
}

const LiveMatchesSection = ({
  matches = [
    {
      id: "live-1",
      teams: [
        {
          id: "team-1",
          name: "Team Liquid",
          logo: "https://api.dicebear.com/7.x/avataaars/svg?seed=TeamLiquid",
          score: 2,
        },
        {
          id: "team-2",
          name: "Cloud9",
          logo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Cloud9",
          score: 1,
        },
      ],
      gameType: "League of Legends",
      tournament: "LCS Summer Split",
      startTime: new Date().toISOString(),
      isLive: true,
      streamUrl: "https://twitch.tv/riotgames",
    },
    {
      id: "live-2",
      teams: [
        {
          id: "team-3",
          name: "Fnatic",
          logo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Fnatic",
          score: 13,
        },
        {
          id: "team-4",
          name: "G2 Esports",
          logo: "https://api.dicebear.com/7.x/avataaars/svg?seed=G2Esports",
          score: 11,
        },
      ],
      gameType: "CS:GO",
      tournament: "ESL Pro League",
      startTime: new Date().toISOString(),
      isLive: true,
      streamUrl: "https://twitch.tv/esl_csgo",
    },
    {
      id: "live-3",
      teams: [
        {
          id: "team-5",
          name: "T1",
          logo: "https://api.dicebear.com/7.x/avataaars/svg?seed=T1",
          score: 1,
        },
        {
          id: "team-6",
          name: "DRX",
          logo: "https://api.dicebear.com/7.x/avataaars/svg?seed=DRX",
          score: 1,
        },
      ],
      gameType: "League of Legends",
      tournament: "LCK Summer",
      startTime: new Date().toISOString(),
      isLive: true,
      streamUrl: "https://twitch.tv/lck",
    },
    {
      id: "live-4",
      teams: [
        {
          id: "team-7",
          name: "Sentinels",
          logo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sentinels",
          score: 7,
        },
        {
          id: "team-8",
          name: "100 Thieves",
          logo: "https://api.dicebear.com/7.x/avataaars/svg?seed=100Thieves",
          score: 5,
        },
      ],
      gameType: "Valorant",
      tournament: "VCT Americas",
      startTime: new Date().toISOString(),
      isLive: true,
      streamUrl: "https://twitch.tv/valorant",
    },
    {
      id: "live-5",
      teams: [
        {
          id: "team-9",
          name: "OG",
          logo: "https://api.dicebear.com/7.x/avataaars/svg?seed=OG",
          score: 1,
        },
        {
          id: "team-10",
          name: "Team Secret",
          logo: "https://api.dicebear.com/7.x/avataaars/svg?seed=TeamSecret",
          score: 0,
        },
      ],
      gameType: "Dota 2",
      tournament: "The International",
      startTime: new Date().toISOString(),
      isLive: true,
      streamUrl: "https://twitch.tv/dota2ti",
    },
  ],
  title = "Live Matches",
  onMatchSelect = () => {},
}: LiveMatchesSectionProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll);
      // Check initial state
      handleScroll();
      return () => scrollContainer.removeEventListener("scroll", handleScroll);
    }
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const { current: container } = scrollContainerRef;
      const scrollAmount = 370; // Card width + gap
      if (direction === "left") {
        container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      } else {
        container.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    }
  };

  return (
    <div className="w-full bg-card py-8 px-4 md:px-6 rounded-lg dark:bg-gray-900">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-foreground dark:text-white flex items-center">
          <span className="inline-block w-3 h-3 bg-red-500 rounded-full mr-2 animate-pulse"></span>
          Canlı Maçlar
        </h2>
        <div className="flex space-x-2">
          <button
            onClick={() => scroll("left")}
            className={`p-2 rounded-full bg-gray-200 dark:bg-gray-800 text-foreground dark:text-white ${!showLeftArrow ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-300 dark:hover:bg-gray-700"}`}
            disabled={!showLeftArrow}
            aria-label="Scroll left"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => scroll("right")}
            className={`p-2 rounded-full bg-gray-200 dark:bg-gray-800 text-foreground dark:text-white ${!showRightArrow ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-300 dark:hover:bg-gray-700"}`}
            disabled={!showRightArrow}
            aria-label="Scroll right"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div
        ref={scrollContainerRef}
        className="flex space-x-5 overflow-x-auto pb-4 scrollbar-hide"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {matches.length > 0 ? (
          matches.map((match) => (
            <div
              key={match.id}
              onClick={() => onMatchSelect(match)}
              className="flex-shrink-0"
            >
              <MatchCard
                id={match.id}
                teams={match.teams}
                gameType={match.gameType}
                tournament={match.tournament}
                startTime={match.startTime}
                isLive={match.isLive}
                streamUrl={match.streamUrl}
              />
            </div>
          ))
        ) : (
          <div className="w-full text-center py-12 text-gray-600 dark:text-gray-400">
            <p className="text-lg">Şu anda canlı maç yok</p>
            <p className="text-sm mt-2">
              Yaklaşan turnuvalar için daha sonra tekrar kontrol edin
            </p>
          </div>
        )}
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default LiveMatchesSection;
