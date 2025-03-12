import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Badge } from "../components/ui/badge";
import { Separator } from "../components/ui/separator";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { Progress } from "../components/ui/progress";
import {
  Trophy,
  Clock,
  Users,
  Activity,
  Flame,
  Shield,
  Sword,
} from "lucide-react";

interface TeamType {
  id: string;
  name: string;
  logo: string;
  score: number;
  players: PlayerType[];
}

interface PlayerType {
  id: string;
  name: string;
  avatar: string;
  role: string;
  stats: {
    kills?: number;
    deaths?: number;
    assists?: number;
    cs?: number;
    gold?: number;
    damage?: number;
  };
}

interface MatchDetailsProps {
  matchId?: string;
  tournament?: {
    name: string;
    logo: string;
    stage: string;
  };
  teams?: [TeamType, TeamType];
  status?: "upcoming" | "live" | "completed";
  gameType?: string;
  bestOf?: number;
  currentMap?: string;
  startTime?: string;
  duration?: string;
  stats?: {
    [key: string]: any;
  };
}

const MatchDetails = ({
  matchId = "match-123",
  tournament = {
    name: "World Championship 2023",
    logo: "https://api.dicebear.com/7.x/avataaars/svg?seed=tournament",
    stage: "Quarter Finals",
  },
  teams = [
    {
      id: "team1",
      name: "Dragon Esports",
      logo: "https://api.dicebear.com/7.x/avataaars/svg?seed=dragon",
      score: 2,
      players: [
        {
          id: "p1",
          name: "DragonSlayer",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=player1",
          role: "Top",
          stats: {
            kills: 5,
            deaths: 2,
            assists: 7,
            cs: 210,
            gold: 12500,
            damage: 18500,
          },
        },
        {
          id: "p2",
          name: "JungleKing",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=player2",
          role: "Jungle",
          stats: {
            kills: 3,
            deaths: 1,
            assists: 12,
            cs: 180,
            gold: 11200,
            damage: 12300,
          },
        },
        {
          id: "p3",
          name: "MidMaster",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=player3",
          role: "Mid",
          stats: {
            kills: 8,
            deaths: 3,
            assists: 6,
            cs: 230,
            gold: 14500,
            damage: 22000,
          },
        },
        {
          id: "p4",
          name: "ADCarry",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=player4",
          role: "ADC",
          stats: {
            kills: 10,
            deaths: 2,
            assists: 5,
            cs: 250,
            gold: 15800,
            damage: 25000,
          },
        },
        {
          id: "p5",
          name: "SupportHero",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=player5",
          role: "Support",
          stats: {
            kills: 1,
            deaths: 4,
            assists: 18,
            cs: 40,
            gold: 8500,
            damage: 5200,
          },
        },
      ],
    },
    {
      id: "team2",
      name: "Phoenix Gaming",
      logo: "https://api.dicebear.com/7.x/avataaars/svg?seed=phoenix",
      score: 1,
      players: [
        {
          id: "p6",
          name: "PhoenixRiser",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=player6",
          role: "Top",
          stats: {
            kills: 3,
            deaths: 4,
            assists: 2,
            cs: 190,
            gold: 10500,
            damage: 15000,
          },
        },
        {
          id: "p7",
          name: "ForestWalker",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=player7",
          role: "Jungle",
          stats: {
            kills: 2,
            deaths: 5,
            assists: 9,
            cs: 160,
            gold: 9800,
            damage: 10200,
          },
        },
        {
          id: "p8",
          name: "MidLegend",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=player8",
          role: "Mid",
          stats: {
            kills: 5,
            deaths: 6,
            assists: 4,
            cs: 210,
            gold: 12000,
            damage: 18000,
          },
        },
        {
          id: "p9",
          name: "CarryPro",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=player9",
          role: "ADC",
          stats: {
            kills: 7,
            deaths: 3,
            assists: 3,
            cs: 230,
            gold: 13500,
            damage: 20000,
          },
        },
        {
          id: "p10",
          name: "GuardianAngel",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=player10",
          role: "Support",
          stats: {
            kills: 0,
            deaths: 5,
            assists: 15,
            cs: 30,
            gold: 7500,
            damage: 4500,
          },
        },
      ],
    },
  ],
  status = "live",
  gameType = "League of Legends",
  bestOf = 5,
  currentMap = "Summoner's Rift",
  startTime = "2023-10-15T18:00:00Z",
  duration = "01:45:23",
  stats = {
    totalKills: 47,
    totalGold: 125000,
    objectives: {
      dragons: { team1: 3, team2: 1 },
      barons: { team1: 1, team2: 0 },
      towers: { team1: 8, team2: 4 },
    },
  },
}: MatchDetailsProps) => {
  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Get status badge color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "live":
        return "bg-red-500";
      case "upcoming":
        return "bg-blue-500";
      case "completed":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto bg-gray-900 text-white p-6 rounded-lg shadow-lg">
      {/* Tournament Info */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Avatar className="h-10 w-10 border border-gray-700">
            <AvatarImage src={tournament.logo} alt={tournament.name} />
            <AvatarFallback>{tournament.name.substring(0, 2)}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-lg font-semibold">{tournament.name}</h3>
            <p className="text-sm text-gray-400">{tournament.stage}</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Badge className={`${getStatusColor(status)} text-white`}>
            {status.toUpperCase()}
          </Badge>
          <div className="text-sm text-gray-400">
            <div className="flex items-center">
              <Trophy className="h-4 w-4 mr-1" />
              <span>Best of {bestOf}</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              {status === "upcoming" ? formatDate(startTime) : duration}
            </div>
          </div>
        </div>
      </div>

      {/* Teams Score */}
      <Card className="bg-gray-800 border-gray-700 mb-6">
        <CardContent className="p-6">
          <div className="flex justify-between items-center">
            <div className="flex-1 flex flex-col items-center">
              <Avatar className="h-24 w-24 mb-3 border-2 border-blue-500">
                <AvatarImage src={teams[0].logo} alt={teams[0].name} />
                <AvatarFallback>{teams[0].name.substring(0, 2)}</AvatarFallback>
              </Avatar>
              <h2 className="text-2xl font-bold">{teams[0].name}</h2>
            </div>

            <div className="flex-1 flex justify-center items-center">
              <div className="text-center px-8 py-4 bg-gray-700 rounded-lg">
                <div className="text-5xl font-bold mb-2">
                  {teams[0].score} - {teams[1].score}
                </div>
                <Badge
                  variant="outline"
                  className="text-gray-300 border-gray-600"
                >
                  {gameType}
                </Badge>
              </div>
            </div>

            <div className="flex-1 flex flex-col items-center">
              <Avatar className="h-24 w-24 mb-3 border-2 border-red-500">
                <AvatarImage src={teams[1].logo} alt={teams[1].name} />
                <AvatarFallback>{teams[1].name.substring(0, 2)}</AvatarFallback>
              </Avatar>
              <h2 className="text-2xl font-bold">{teams[1].name}</h2>
            </div>
          </div>

          {status === "live" && (
            <div className="mt-6 pt-4 border-t border-gray-700">
              <div className="flex justify-between items-center text-sm text-gray-400 mb-2">
                <span>Current Map: {currentMap}</span>
                <span className="flex items-center">
                  <Activity className="h-4 w-4 mr-1 text-red-500" />
                  LIVE
                </span>
              </div>
              <div className="grid grid-cols-3 gap-4 mt-3">
                <div className="bg-gray-700 p-3 rounded-md text-center">
                  <div className="flex justify-center items-center mb-1">
                    <Shield className="h-5 w-5 mr-1 text-blue-400" />
                  </div>
                  <div className="text-xs text-gray-400">Dragons</div>
                  <div className="text-lg font-semibold">
                    {stats.objectives.dragons.team1} -{" "}
                    {stats.objectives.dragons.team2}
                  </div>
                </div>
                <div className="bg-gray-700 p-3 rounded-md text-center">
                  <div className="flex justify-center items-center mb-1">
                    <Flame className="h-5 w-5 mr-1 text-purple-400" />
                  </div>
                  <div className="text-xs text-gray-400">Barons</div>
                  <div className="text-lg font-semibold">
                    {stats.objectives.barons.team1} -{" "}
                    {stats.objectives.barons.team2}
                  </div>
                </div>
                <div className="bg-gray-700 p-3 rounded-md text-center">
                  <div className="flex justify-center items-center mb-1">
                    <Sword className="h-5 w-5 mr-1 text-yellow-400" />
                  </div>
                  <div className="text-xs text-gray-400">Towers</div>
                  <div className="text-lg font-semibold">
                    {stats.objectives.towers.team1} -{" "}
                    {stats.objectives.towers.team2}
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Match Details Tabs */}
      <Tabs defaultValue="players" className="w-full">
        <TabsList className="grid grid-cols-3 mb-6 bg-gray-800">
          <TabsTrigger
            value="players"
            className="data-[state=active]:bg-gray-700"
          >
            <Users className="h-4 w-4 mr-2" /> Players
          </TabsTrigger>
          <TabsTrigger
            value="stats"
            className="data-[state=active]:bg-gray-700"
          >
            <Activity className="h-4 w-4 mr-2" /> Match Stats
          </TabsTrigger>
          <TabsTrigger
            value="history"
            className="data-[state=active]:bg-gray-700"
          >
            <Clock className="h-4 w-4 mr-2" /> Head to Head
          </TabsTrigger>
        </TabsList>

        <TabsContent value="players" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Team 1 Players */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl flex items-center">
                  <div className="w-6 h-6 mr-2 rounded-full bg-blue-500" />
                  {teams[0].name} Roster
                </CardTitle>
              </CardHeader>
              <CardContent>
                {teams[0].players.map((player) => (
                  <div
                    key={player.id}
                    className="flex items-center py-3 border-b border-gray-700 last:border-0"
                  >
                    <Avatar className="h-10 w-10 mr-3">
                      <AvatarImage src={player.avatar} alt={player.name} />
                      <AvatarFallback>
                        {player.name.substring(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <div>
                          <p className="font-medium">{player.name}</p>
                          <p className="text-sm text-gray-400">{player.role}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">
                            {player.stats.kills}/{player.stats.deaths}/
                            {player.stats.assists}
                          </p>
                          <p className="text-sm text-gray-400">KDA</p>
                        </div>
                      </div>
                      <div className="mt-2">
                        <Progress
                          value={
                            ((player.stats.kills + player.stats.assists) /
                              (player.stats.deaths || 1)) *
                            10
                          }
                          className="h-1 bg-gray-700"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Team 2 Players */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl flex items-center">
                  <div className="w-6 h-6 mr-2 rounded-full bg-red-500" />
                  {teams[1].name} Roster
                </CardTitle>
              </CardHeader>
              <CardContent>
                {teams[1].players.map((player) => (
                  <div
                    key={player.id}
                    className="flex items-center py-3 border-b border-gray-700 last:border-0"
                  >
                    <Avatar className="h-10 w-10 mr-3">
                      <AvatarImage src={player.avatar} alt={player.name} />
                      <AvatarFallback>
                        {player.name.substring(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <div>
                          <p className="font-medium">{player.name}</p>
                          <p className="text-sm text-gray-400">{player.role}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">
                            {player.stats.kills}/{player.stats.deaths}/
                            {player.stats.assists}
                          </p>
                          <p className="text-sm text-gray-400">KDA</p>
                        </div>
                      </div>
                      <div className="mt-2">
                        <Progress
                          value={
                            ((player.stats.kills + player.stats.assists) /
                              (player.stats.deaths || 1)) *
                            10
                          }
                          className="h-1 bg-gray-700"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="stats" className="mt-0">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle>Match Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Gold Distribution */}
                <div>
                  <h3 className="text-lg font-medium mb-2">
                    Gold Distribution
                  </h3>
                  <div className="flex items-center">
                    <div className="w-24 text-right pr-3 text-blue-400">
                      {teams[0].name}
                    </div>
                    <div className="flex-1 h-6 bg-gray-700 rounded-md overflow-hidden">
                      <div
                        className="h-full bg-blue-500"
                        style={{
                          width: `${(teams[0].players.reduce((acc, p) => acc + (p.stats.gold || 0), 0) / stats.totalGold) * 100}%`,
                        }}
                      />
                    </div>
                    <div className="w-24 text-left pl-3 text-red-400">
                      {teams[1].name}
                    </div>
                  </div>
                </div>

                {/* Team Comparison */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-700 p-4 rounded-md">
                    <h4 className="text-center mb-3 font-medium">Team Kills</h4>
                    <div className="flex justify-around text-2xl font-bold">
                      <span className="text-blue-400">
                        {teams[0].players.reduce(
                          (acc, p) => acc + (p.stats.kills || 0),
                          0,
                        )}
                      </span>
                      <span className="text-gray-400">vs</span>
                      <span className="text-red-400">
                        {teams[1].players.reduce(
                          (acc, p) => acc + (p.stats.kills || 0),
                          0,
                        )}
                      </span>
                    </div>
                  </div>
                  <div className="bg-gray-700 p-4 rounded-md">
                    <h4 className="text-center mb-3 font-medium">Team CS</h4>
                    <div className="flex justify-around text-2xl font-bold">
                      <span className="text-blue-400">
                        {teams[0].players.reduce(
                          (acc, p) => acc + (p.stats.cs || 0),
                          0,
                        )}
                      </span>
                      <span className="text-gray-400">vs</span>
                      <span className="text-red-400">
                        {teams[1].players.reduce(
                          (acc, p) => acc + (p.stats.cs || 0),
                          0,
                        )}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Damage Chart */}
                <div>
                  <h3 className="text-lg font-medium mb-2">Damage Dealt</h3>
                  <div className="space-y-3">
                    {teams
                      .flatMap((team) => team.players)
                      .map((player) => (
                        <div key={player.id} className="flex items-center">
                          <div className="w-32 flex items-center">
                            <Avatar className="h-6 w-6 mr-2">
                              <AvatarImage
                                src={player.avatar}
                                alt={player.name}
                              />
                              <AvatarFallback>
                                {player.name.substring(0, 2)}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-sm truncate">
                              {player.name}
                            </span>
                          </div>
                          <div className="flex-1 h-5 bg-gray-700 rounded-md overflow-hidden">
                            <div
                              className={`h-full ${player.id.startsWith("p1") ? "bg-blue-500" : "bg-red-500"}`}
                              style={{
                                width: `${(player.stats.damage / 25000) * 100}%`,
                              }}
                            />
                          </div>
                          <div className="w-20 text-right text-sm">
                            {player.stats.damage.toLocaleString()}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="mt-0">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle>Head to Head History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <h3 className="text-2xl font-bold mb-4">
                  {teams[0].name} vs {teams[1].name}
                </h3>
                <div className="flex justify-center items-center space-x-8 mb-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-blue-400">5</div>
                    <div className="text-sm text-gray-400">Wins</div>
                  </div>
                  <Separator
                    orientation="vertical"
                    className="h-12 bg-gray-700"
                  />
                  <div className="text-center">
                    <div className="text-4xl font-bold text-gray-400">2</div>
                    <div className="text-sm text-gray-400">Draws</div>
                  </div>
                  <Separator
                    orientation="vertical"
                    className="h-12 bg-gray-700"
                  />
                  <div className="text-center">
                    <div className="text-4xl font-bold text-red-400">3</div>
                    <div className="text-sm text-gray-400">Wins</div>
                  </div>
                </div>

                <div className="bg-gray-700 p-4 rounded-md inline-block">
                  <div className="text-sm text-gray-400 mb-2">
                    Last 5 Matches
                  </div>
                  <div className="flex space-x-2">
                    <Badge className="bg-blue-500">W</Badge>
                    <Badge className="bg-red-500">L</Badge>
                    <Badge className="bg-blue-500">W</Badge>
                    <Badge className="bg-gray-500">D</Badge>
                    <Badge className="bg-blue-500">W</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MatchDetails;
