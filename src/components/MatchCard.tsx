import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";
import { Clock, Trophy } from "lucide-react";

interface Team {
  id: string;
  name: string;
  logo: string;
  score?: number;
}

interface MatchCardProps {
  id: string;
  teams: [Team, Team];
  gameType: string;
  tournament: string;
  startTime: string;
  isLive?: boolean;
  streamUrl?: string;
}

const MatchCard = ({
  id = "match-1",
  teams = [
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
  gameType = "League of Legends",
  tournament = "LCS Summer Split",
  startTime = "2023-06-15T18:00:00Z",
  isLive = false,
  streamUrl = "https://twitch.tv/riotgames",
}: MatchCardProps) => {
  // Format the date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }).format(date);
  };

  return (
    <Card className="w-[350px] h-[300px] overflow-hidden bg-card border-border hover:border-primary/50 transition-all duration-300 cursor-pointer dark:bg-gray-900 dark:border-gray-800">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <Badge
            variant={isLive ? "destructive" : "secondary"}
            className={`${isLive ? "bg-red-600" : "bg-gray-700 dark:bg-gray-700"} text-white`}
          >
            {isLive ? "CANLI YAYIN" : "YAKLAŞAN"}
          </Badge>
          <Badge
            variant="outline"
            className="bg-gray-800 dark:bg-gray-800 text-white dark:text-gray-300"
          >
            {gameType}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex flex-col items-center space-y-2 w-2/5">
            <img
              src={teams[0].logo}
              alt={teams[0].name}
              className="w-16 h-16 rounded-full bg-gray-800 dark:bg-gray-800 p-1"
            />
            <p className="text-sm font-medium text-foreground dark:text-white text-center">
              {teams[0].name}
            </p>
          </div>

          {isLive ? (
            <div className="flex items-center justify-center space-x-2 text-xl font-bold text-foreground dark:text-white">
              <span>{teams[0].score}</span>
              <span className="text-gray-600 dark:text-gray-500">-</span>
              <span>{teams[1].score}</span>
            </div>
          ) : (
            <div className="flex items-center justify-center">
              <span className="text-gray-600 dark:text-gray-400 font-medium">
                VS
              </span>
            </div>
          )}

          <div className="flex flex-col items-center space-y-2 w-2/5">
            <img
              src={teams[1].logo}
              alt={teams[1].name}
              className="w-16 h-16 rounded-full bg-gray-800 dark:bg-gray-800 p-1"
            />
            <p className="text-sm font-medium text-foreground dark:text-white text-center">
              {teams[1].name}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-center space-x-2 text-gray-600 dark:text-gray-400">
          <Trophy size={16} />
          <span className="text-sm">{tournament}</span>
        </div>
      </CardContent>

      <CardFooter className="border-t border-gray-600 dark:border-gray-800 pt-3">
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center space-x-1 text-gray-600 dark:text-gray-400">
            <Clock size={14} />
            <span className="text-xs">{formatDate(startTime)}</span>
          </div>

          {isLive && (
            <a
              href={streamUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-red-600 hover:text-red-500 dark:text-red-400 dark:hover:text-red-300 transition-colors"
            >
              Yayını İzle
            </a>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default MatchCard;
