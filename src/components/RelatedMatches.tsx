import React from "react";
import { ScrollArea } from "./ui/scroll-area";
import { Card, CardHeader, CardTitle } from "./ui/card";
import MatchCard from "./MatchCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
  isLive?: boolean;
  streamUrl?: string;
}

interface RelatedMatchesProps {
  matches?: Match[];
  title?: string;
  description?: string;
}

const RelatedMatches = ({
  matches = [
    {
      id: "match-1",
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
      startTime: "2023-06-15T18:00:00Z",
      isLive: true,
      streamUrl: "https://twitch.tv/riotgames",
    },
    {
      id: "match-2",
      teams: [
        {
          id: "team-3",
          name: "Fnatic",
          logo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Fnatic",
        },
        {
          id: "team-4",
          name: "G2 Esports",
          logo: "https://api.dicebear.com/7.x/avataaars/svg?seed=G2Esports",
        },
      ],
      gameType: "League of Legends",
      tournament: "LEC Summer Split",
      startTime: "2023-06-16T17:00:00Z",
    },
    {
      id: "match-3",
      teams: [
        {
          id: "team-5",
          name: "T1",
          logo: "https://api.dicebear.com/7.x/avataaars/svg?seed=T1",
          score: 0,
        },
        {
          id: "team-6",
          name: "Gen.G",
          logo: "https://api.dicebear.com/7.x/avataaars/svg?seed=GenG",
          score: 1,
        },
      ],
      gameType: "League of Legends",
      tournament: "LCK Summer",
      startTime: "2023-06-15T10:00:00Z",
      isLive: true,
      streamUrl: "https://twitch.tv/lck",
    },
    {
      id: "match-4",
      teams: [
        {
          id: "team-7",
          name: "100 Thieves",
          logo: "https://api.dicebear.com/7.x/avataaars/svg?seed=100Thieves",
        },
        {
          id: "team-8",
          name: "Evil Geniuses",
          logo: "https://api.dicebear.com/7.x/avataaars/svg?seed=EvilGeniuses",
        },
      ],
      gameType: "League of Legends",
      tournament: "LCS Summer Split",
      startTime: "2023-06-17T20:00:00Z",
    },
  ],
  title = "Related Matches",
  description = "Other matches from this tournament or featuring these teams",
}: RelatedMatchesProps) => {
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -380, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 380, behavior: "smooth" });
    }
  };

  return (
    <Card className="w-full bg-card border-border dark:bg-gray-900 dark:border-gray-800">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-xl font-bold text-foreground dark:text-white">
              {title}
            </CardTitle>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {description}
            </p>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={scrollLeft}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-5 w-5 text-gray-700 dark:text-gray-300" />
            </button>
            <button
              onClick={scrollRight}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
              aria-label="Scroll right"
            >
              <ChevronRight className="h-5 w-5 text-gray-700 dark:text-gray-300" />
            </button>
          </div>
        </div>
      </CardHeader>
      <div className="px-6 pb-6">
        <ScrollArea
          ref={scrollRef}
          className="w-full overflow-x-auto"
          orientation="horizontal"
        >
          <div className="flex space-x-4 pb-4">
            {matches.map((match) => (
              <MatchCard key={match.id} {...match} />
            ))}
          </div>
        </ScrollArea>
      </div>
    </Card>
  );
};

export default RelatedMatches;
