import React, { useState } from "react";
import GameFilter from "./GameFilter";
import MatchCalendar from "./MatchCalendar";
import MatchCard from "./MatchCard";
import { Button } from "./ui/button";
import { CalendarDays, List } from "lucide-react";

interface UpcomingMatchesSectionProps {
  title?: string;
  description?: string;
  selectedGame?: string | null;
  onGameSelect?: (gameId: string | null) => void;
}

const UpcomingMatchesSection = ({
  title = "Yaklaşan Maçlar",
  description = "Tüm yaklaşan e-spor turnuvaları ve maçları hakkında güncel kalın",
  selectedGame = null,
  onGameSelect = () => {},
}: UpcomingMatchesSectionProps) => {
  const [viewMode, setViewMode] = useState<"calendar" | "list">("calendar");
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  // Sample upcoming matches data
  const upcomingMatches = [
    {
      id: "match-1",
      teams: [
        {
          id: "team-1",
          name: "Team Liquid",
          logo: "https://api.dicebear.com/7.x/avataaars/svg?seed=TeamLiquid",
        },
        {
          id: "team-2",
          name: "Cloud9",
          logo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Cloud9",
        },
      ],
      gameType: "League of Legends",
      tournament: "LCS Summer Split",
      startTime: "2023-06-15T18:00:00Z",
      isLive: false,
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
      gameType: "CS:GO",
      tournament: "ESL Pro League",
      startTime: "2023-06-16T20:30:00Z",
      isLive: false,
    },
    {
      id: "match-3",
      teams: [
        {
          id: "team-5",
          name: "T1",
          logo: "https://api.dicebear.com/7.x/avataaars/svg?seed=T1",
        },
        {
          id: "team-6",
          name: "DRX",
          logo: "https://api.dicebear.com/7.x/avataaars/svg?seed=DRX",
        },
      ],
      gameType: "League of Legends",
      tournament: "LCK Summer",
      startTime: "2023-06-17T15:00:00Z",
      isLive: false,
    },
  ];

  const handleGameSelect = (gameId: string | null) => {
    onGameSelect(gameId);
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };

  const handleMatchSelect = (match: any) => {
    // Handle match selection, e.g., open match detail modal
    console.log("Match selected:", match);
  };

  const filteredMatches = selectedGame
    ? upcomingMatches.filter((match) =>
        match.gameType.toLowerCase().includes(selectedGame.toLowerCase()),
      )
    : upcomingMatches;

  return (
    <section className="w-full bg-card py-8 px-4 md:px-6 rounded-lg dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-white mb-2">
              {title}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl">
              {description}
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-2">
            <Button
              variant={viewMode === "calendar" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("calendar")}
              className="flex items-center"
            >
              <CalendarDays className="mr-2 h-4 w-4" />
              <span
                className={
                  viewMode === "calendar"
                    ? "text-primary-foreground"
                    : "text-foreground"
                }
              >
                Takvim
              </span>
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("list")}
              className="flex items-center"
            >
              <List className="mr-2 h-4 w-4" />
              <span
                className={
                  viewMode === "list"
                    ? "text-primary-foreground"
                    : "text-foreground"
                }
              >
                Liste
              </span>
            </Button>
          </div>
        </div>

        <div className="space-y-6">
          <GameFilter
            selectedGame={selectedGame}
            onSelectGame={handleGameSelect}
          />

          {viewMode === "calendar" ? (
            <MatchCalendar
              selectedDate={selectedDate}
              onDateSelect={handleDateSelect}
              onMatchSelect={handleMatchSelect}
            />
          ) : (
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-4">
                Tüm Yaklaşan Maçlar
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredMatches.length > 0 ? (
                  filteredMatches.map((match) => (
                    <div
                      key={match.id}
                      onClick={() => handleMatchSelect(match)}
                    >
                      <MatchCard
                        id={match.id}
                        teams={match.teams}
                        gameType={match.gameType}
                        tournament={match.tournament}
                        startTime={match.startTime}
                        isLive={match.isLive}
                      />
                    </div>
                  ))
                ) : (
                  <div className="col-span-full text-center py-12 text-gray-600 dark:text-gray-400">
                    <p className="text-lg">Seçilen oyun için maç bulunamadı.</p>
                    <p className="mt-2">
                      Farklı bir oyun seçmeyi deneyin veya daha sonra tekrar
                      kontrol edin.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default UpcomingMatchesSection;
