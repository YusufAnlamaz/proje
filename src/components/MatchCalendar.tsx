import React, { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarIcon, Clock, Trophy } from "lucide-react";

interface Match {
  id: string;
  date: Date;
  teams: {
    team1: {
      name: string;
      logo: string;
    };
    team2: {
      name: string;
      logo: string;
    };
  };
  game: string;
  tournament: string;
  time: string;
}

interface MatchCalendarProps {
  matches?: Match[];
  selectedDate?: Date;
  onDateSelect?: (date: Date) => void;
  onMatchSelect?: (match: Match) => void;
}

const MatchCalendar = ({
  matches = [
    {
      id: "1",
      date: new Date(),
      teams: {
        team1: {
          name: "Team Liquid",
          logo: "https://api.dicebear.com/7.x/avataaars/svg?seed=TeamLiquid",
        },
        team2: {
          name: "Cloud9",
          logo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Cloud9",
        },
      },
      game: "League of Legends",
      tournament: "LCS Summer Split",
      time: "18:00",
    },
    {
      id: "2",
      date: new Date(),
      teams: {
        team1: {
          name: "Fnatic",
          logo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Fnatic",
        },
        team2: {
          name: "G2 Esports",
          logo: "https://api.dicebear.com/7.x/avataaars/svg?seed=G2Esports",
        },
      },
      game: "CS:GO",
      tournament: "ESL Pro League",
      time: "20:30",
    },
    {
      id: "3",
      date: new Date(new Date().setDate(new Date().getDate() + 1)),
      teams: {
        team1: {
          name: "T1",
          logo: "https://api.dicebear.com/7.x/avataaars/svg?seed=T1",
        },
        team2: {
          name: "DRX",
          logo: "https://api.dicebear.com/7.x/avataaars/svg?seed=DRX",
        },
      },
      game: "League of Legends",
      tournament: "LCK Summer",
      time: "15:00",
    },
    {
      id: "4",
      date: new Date(new Date().setDate(new Date().getDate() + 2)),
      teams: {
        team1: {
          name: "Natus Vincere",
          logo: "https://api.dicebear.com/7.x/avataaars/svg?seed=NaVi",
        },
        team2: {
          name: "Astralis",
          logo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Astralis",
        },
      },
      game: "CS:GO",
      tournament: "BLAST Premier",
      time: "19:00",
    },
    {
      id: "5",
      date: new Date(new Date().setDate(new Date().getDate() + 3)),
      teams: {
        team1: {
          name: "OG",
          logo: "https://api.dicebear.com/7.x/avataaars/svg?seed=OG",
        },
        team2: {
          name: "Team Secret",
          logo: "https://api.dicebear.com/7.x/avataaars/svg?seed=TeamSecret",
        },
      },
      game: "Dota 2",
      tournament: "The International",
      time: "16:00",
    },
  ],
  selectedDate = new Date(),
  onDateSelect = () => {},
  onMatchSelect = () => {},
}: MatchCalendarProps) => {
  const [date, setDate] = useState<Date>(selectedDate);
  const [view, setView] = useState<"calendar" | "list">("calendar");

  // Filter matches for the selected date
  const matchesForSelectedDate = matches.filter((match) => {
    const matchDate = new Date(match.date);
    return (
      matchDate.getDate() === date.getDate() &&
      matchDate.getMonth() === date.getMonth() &&
      matchDate.getFullYear() === date.getFullYear()
    );
  });

  // Get unique dates that have matches
  const datesWithMatches = matches.map((match) => {
    const matchDate = new Date(match.date);
    return new Date(
      matchDate.getFullYear(),
      matchDate.getMonth(),
      matchDate.getDate(),
    ).toISOString();
  });

  // Remove duplicates
  const uniqueDatesWithMatches = [...new Set(datesWithMatches)];

  const handleDateSelect = (newDate: Date | undefined) => {
    if (newDate) {
      setDate(newDate);
      onDateSelect(newDate);
    }
  };

  const handleMatchSelect = (match: Match) => {
    onMatchSelect(match);
  };

  return (
    <div className="w-full bg-card rounded-lg p-4 text-foreground dark:bg-gray-900 dark:text-white">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold flex items-center">
          <CalendarIcon className="mr-2" /> Yaklaşan Maçlar
        </h2>
      </div>

      <Tabs
        value={view}
        onValueChange={(value) => setView(value as "calendar" | "list")}
        className="w-full"
      >
        <TabsList>
          <TabsTrigger
            value="calendar"
            className="data-[state=active]:text-primary-foreground data-[state=inactive]:text-foreground"
          >
            Takvim
          </TabsTrigger>
          <TabsTrigger
            value="list"
            className="data-[state=active]:text-primary-foreground data-[state=inactive]:text-foreground"
          >
            Liste
          </TabsTrigger>
        </TabsList>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div className="md:col-span-1 bg-gray-800 rounded-lg p-4">
            <Calendar
              mode="single"
              selected={date}
              onSelect={handleDateSelect}
              className="bg-gray-800 text-white rounded-lg"
              modifiers={{
                hasMatch: (day) => {
                  const dayStr = day.toISOString();
                  return uniqueDatesWithMatches.some((d) =>
                    d.startsWith(dayStr.split("T")[0]),
                  );
                },
              }}
              modifiersStyles={{
                hasMatch: {
                  fontWeight: "bold",
                  border: "2px solid #6366f1",
                  borderRadius: "4px",
                },
              }}
            />
            <div className="mt-4">
              <div className="flex items-center justify-center space-x-2">
                <div className="w-3 h-3 bg-indigo-500 rounded-full"></div>
                <span className="text-sm text-gray-300">Planlanmış maçlar</span>
              </div>
            </div>
          </div>

          <div className="md:col-span-2">
            <TabsContent value="calendar" className="mt-0">
              <div className="bg-gray-800 rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">
                    {date.toLocaleDateString("en-US", {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                    })}
                  </h3>
                  <Badge variant="secondary" className="bg-indigo-600">
                    {matchesForSelectedDate.length} Maç
                  </Badge>
                </div>

                {matchesForSelectedDate.length > 0 ? (
                  <div className="space-y-4">
                    {matchesForSelectedDate.map((match) => (
                      <Card
                        key={match.id}
                        className="bg-gray-700 border-0 hover:bg-gray-600 transition-colors cursor-pointer"
                        onClick={() => handleMatchSelect(match)}
                      >
                        <CardContent className="p-4">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center space-x-2">
                              <Badge
                                variant="outline"
                                className="bg-gray-800 text-xs"
                              >
                                {match.game}
                              </Badge>
                              <div className="flex items-center text-gray-300">
                                <Trophy size={14} className="mr-1" />
                                <span className="text-xs">
                                  {match.tournament}
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center text-gray-300">
                              <Clock size={14} className="mr-1" />
                              <span className="text-xs">{match.time}</span>
                            </div>
                          </div>
                          <div className="flex justify-between items-center mt-3">
                            <div className="flex items-center">
                              <img
                                src={match.teams.team1.logo}
                                alt={match.teams.team1.name}
                                className="w-8 h-8 rounded-full"
                              />
                              <span className="ml-2 font-medium">
                                {match.teams.team1.name}
                              </span>
                            </div>
                            <span className="text-gray-400 mx-2">vs</span>
                            <div className="flex items-center">
                              <span className="mr-2 font-medium">
                                {match.teams.team2.name}
                              </span>
                              <img
                                src={match.teams.team2.logo}
                                alt={match.teams.team2.name}
                                className="w-8 h-8 rounded-full"
                              />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-600 dark:text-gray-400">
                    <CalendarIcon className="mx-auto h-12 w-12 mb-2 opacity-50" />
                    <p>Bu tarih için planlanmış maç yok</p>
                    <p className="text-sm mt-2">
                      Başka bir tarih seçin veya daha sonra tekrar kontrol edin
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="list" className="mt-0">
              <div className="bg-gray-800 rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Tüm Yaklaşan Maçlar</h3>
                  <Badge variant="secondary" className="bg-indigo-600">
                    {matches.length} Toplam
                  </Badge>
                </div>

                <div className="space-y-4">
                  {matches
                    .sort((a, b) => a.date.getTime() - b.date.getTime())
                    .map((match) => (
                      <Card
                        key={match.id}
                        className="bg-gray-700 border-0 hover:bg-gray-600 transition-colors cursor-pointer"
                        onClick={() => handleMatchSelect(match)}
                      >
                        <CardContent className="p-4">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center space-x-2">
                              <Badge
                                variant="outline"
                                className="bg-gray-800 text-xs"
                              >
                                {match.game}
                              </Badge>
                              <div className="flex items-center text-gray-300">
                                <Trophy size={14} className="mr-1" />
                                <span className="text-xs">
                                  {match.tournament}
                                </span>
                              </div>
                            </div>
                            <div className="flex flex-col items-end">
                              <div className="text-xs text-gray-300">
                                {match.date.toLocaleDateString("en-US", {
                                  month: "short",
                                  day: "numeric",
                                })}
                              </div>
                              <div className="flex items-center text-gray-300">
                                <Clock size={14} className="mr-1" />
                                <span className="text-xs">{match.time}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex justify-between items-center mt-3">
                            <div className="flex items-center">
                              <img
                                src={match.teams.team1.logo}
                                alt={match.teams.team1.name}
                                className="w-8 h-8 rounded-full"
                              />
                              <span className="ml-2 font-medium">
                                {match.teams.team1.name}
                              </span>
                            </div>
                            <span className="text-gray-400 mx-2">vs</span>
                            <div className="flex items-center">
                              <span className="mr-2 font-medium">
                                {match.teams.team2.name}
                              </span>
                              <img
                                src={match.teams.team2.logo}
                                alt={match.teams.team2.name}
                                className="w-8 h-8 rounded-full"
                              />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </div>
            </TabsContent>
          </div>
        </div>
      </Tabs>
    </div>
  );
};

export default MatchCalendar;
