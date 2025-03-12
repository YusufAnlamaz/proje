import React from "react";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Separator } from "../components/ui/separator";
import { Clock, Trophy, Flag, Star } from "lucide-react";

interface MatchEvent {
  id: string;
  time: string;
  type: "kill" | "objective" | "gameStart" | "gameEnd" | "highlight";
  description: string;
  team: "team1" | "team2" | "neutral";
}

interface MatchTimelineProps {
  isLive?: boolean;
  isUpcoming?: boolean;
  matchStartTime?: string;
  currentGameTime?: string;
  events?: MatchEvent[];
  matchDuration?: string;
}

const MatchTimeline = ({
  isLive = false,
  isUpcoming = false,
  matchStartTime = "2023-06-15T18:00:00Z",
  currentGameTime = "00:32:45",
  matchDuration = "01:45:30",
  events = [
    {
      id: "1",
      time: "00:00:00",
      type: "gameStart",
      description: "Game started",
      team: "neutral",
    },
    {
      id: "2",
      time: "00:05:23",
      type: "objective",
      description: "First Blood",
      team: "team1",
    },
    {
      id: "3",
      time: "00:12:45",
      type: "objective",
      description: "Dragon secured",
      team: "team2",
    },
    {
      id: "4",
      time: "00:18:30",
      type: "highlight",
      description: "Triple kill by Faker",
      team: "team1",
    },
    {
      id: "5",
      time: "00:25:10",
      type: "objective",
      description: "Baron Nashor secured",
      team: "team1",
    },
    {
      id: "6",
      time: "00:32:45",
      type: "highlight",
      description: "Team fight at Dragon pit",
      team: "team2",
    },
  ],
}: MatchTimelineProps) => {
  // Format the date for display
  const formatMatchDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  // Calculate time remaining for upcoming matches
  const getTimeRemaining = () => {
    const now = new Date();
    const matchTime = new Date(matchStartTime);
    const diffMs = matchTime.getTime() - now.getTime();

    if (diffMs <= 0) return "Starting soon";

    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffHrs = Math.floor(
      (diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
    const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

    if (diffDays > 0) {
      return `${diffDays}d ${diffHrs}h ${diffMins}m`;
    } else if (diffHrs > 0) {
      return `${diffHrs}h ${diffMins}m`;
    } else {
      return `${diffMins}m`;
    }
  };

  // Get appropriate icon for event type
  const getEventIcon = (type: MatchEvent["type"]) => {
    switch (type) {
      case "kill":
        return <Flag className="h-4 w-4" />;
      case "objective":
        return <Trophy className="h-4 w-4" />;
      case "highlight":
        return <Star className="h-4 w-4" />;
      case "gameStart":
      case "gameEnd":
        return <Clock className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  // Get appropriate color for team
  const getTeamColor = (team: MatchEvent["team"]) => {
    switch (team) {
      case "team1":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20";
      case "team2":
        return "bg-red-500/10 text-red-500 border-red-500/20";
      case "neutral":
      default:
        return "bg-gray-500/10 text-gray-500 border-gray-500/20";
    }
  };

  return (
    <Card className="w-full bg-gray-900 border-gray-800 shadow-lg">
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-white">Match Timeline</h3>
          {isLive ? (
            <Badge variant="destructive" className="animate-pulse">
              LIVE NOW
            </Badge>
          ) : isUpcoming ? (
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-gray-400" />
              <span className="text-sm text-gray-400">
                Starts in {getTimeRemaining()}
              </span>
            </div>
          ) : (
            <span className="text-sm text-gray-400">
              Match Duration: {matchDuration}
            </span>
          )}
        </div>

        {isUpcoming ? (
          <div className="flex flex-col items-center justify-center py-6">
            <Clock className="h-12 w-12 text-gray-500 mb-2" />
            <p className="text-gray-400 text-center">
              Match scheduled for {formatMatchDate(matchStartTime)}
            </p>
            <Badge variant="outline" className="mt-4">
              {getTimeRemaining()} until match starts
            </Badge>
          </div>
        ) : (
          <>
            {/* Timeline track */}
            <div className="relative">
              {/* Current time indicator for live matches */}
              {isLive && (
                <div className="absolute top-0 left-0 w-full flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1">
                    <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse"></div>
                    <span className="text-xs text-gray-400">
                      Current: {currentGameTime}
                    </span>
                  </div>
                </div>
              )}

              {/* Timeline events */}
              <div className="mt-6 space-y-4">
                {events.map((event, index) => (
                  <div key={event.id} className="relative">
                    {/* Connector line */}
                    {index < events.length - 1 && (
                      <div className="absolute left-[9px] top-6 w-[2px] h-[calc(100%-12px)] bg-gray-700"></div>
                    )}

                    <div className="flex items-start gap-3">
                      {/* Event dot */}
                      <div
                        className={`flex-shrink-0 h-5 w-5 rounded-full border ${getTeamColor(event.team)} flex items-center justify-center mt-0.5`}
                      >
                        {getEventIcon(event.type)}
                      </div>

                      {/* Event content */}
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <span className="font-medium text-white">
                            {event.description}
                          </span>
                          <span className="text-xs text-gray-400">
                            {event.time}
                          </span>
                        </div>
                        <Badge
                          variant="outline"
                          className={`mt-1 text-xs ${getTeamColor(event.team)}`}
                        >
                          {event.type === "gameStart"
                            ? "Game Start"
                            : event.type === "gameEnd"
                              ? "Game End"
                              : event.type === "kill"
                                ? "Kill"
                                : event.type === "objective"
                                  ? "Objective"
                                  : "Highlight"}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default MatchTimeline;
