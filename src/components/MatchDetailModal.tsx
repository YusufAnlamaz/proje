import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Separator } from "./ui/separator";
import {
  ExternalLink,
  Heart,
  Calendar,
  Clock,
  Trophy,
  Users,
  Video,
} from "lucide-react";

interface Player {
  id: string;
  name: string;
  avatar: string;
  role?: string;
}

interface Team {
  id: string;
  name: string;
  logo: string;
  score?: number;
  players: Player[];
}

interface Stream {
  platform: string;
  url: string;
  language: string;
}

interface MatchDetailModalProps {
  match?: {
    id: string;
    teams: [Team, Team];
    gameType: string;
    tournament: string;
    tournamentStage?: string;
    startTime: string;
    isLive?: boolean;
    streams?: Stream[];
    maps?: string[];
    bestOf?: number;
  };
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onAddToFavorites?: () => void;
}

const MatchDetailModal = ({
  match = {
    id: "match-1",
    teams: [
      {
        id: "team-1",
        name: "Team Liquid",
        logo: "https://api.dicebear.com/7.x/avataaars/svg?seed=TeamLiquid",
        score: 2,
        players: [
          {
            id: "player-1",
            name: "Bjergsen",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Bjergsen",
            role: "Mid",
          },
          {
            id: "player-2",
            name: "CoreJJ",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=CoreJJ",
            role: "Support",
          },
          {
            id: "player-3",
            name: "Hans Sama",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=HansSama",
            role: "ADC",
          },
          {
            id: "player-4",
            name: "Santorin",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Santorin",
            role: "Jungle",
          },
          {
            id: "player-5",
            name: "Bwipo",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Bwipo",
            role: "Top",
          },
        ],
      },
      {
        id: "team-2",
        name: "Cloud9",
        logo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Cloud9",
        score: 1,
        players: [
          {
            id: "player-6",
            name: "Fudge",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Fudge",
            role: "Top",
          },
          {
            id: "player-7",
            name: "Blaber",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Blaber",
            role: "Jungle",
          },
          {
            id: "player-8",
            name: "Jensen",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jensen",
            role: "Mid",
          },
          {
            id: "player-9",
            name: "Berserker",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Berserker",
            role: "ADC",
          },
          {
            id: "player-10",
            name: "Zven",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Zven",
            role: "Support",
          },
        ],
      },
    ],
    gameType: "League of Legends",
    tournament: "LCS Summer Split",
    tournamentStage: "Semifinals",
    startTime: "2023-06-15T18:00:00Z",
    isLive: true,
    streams: [
      {
        platform: "Twitch",
        url: "https://twitch.tv/riotgames",
        language: "English",
      },
      {
        platform: "YouTube",
        url: "https://youtube.com/lolesports",
        language: "English",
      },
      {
        platform: "Twitch",
        url: "https://twitch.tv/lcs_espanol",
        language: "Spanish",
      },
    ],
    maps: ["Summoner's Rift"],
    bestOf: 5,
  },
  open = true,
  onOpenChange = () => {},
  onAddToFavorites = () => {},
}: MatchDetailModalProps) => {
  // Format the date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    }).format(date);
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }).format(date);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-gray-900 text-white border-gray-800 max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <Badge
              variant={match?.isLive ? "destructive" : "secondary"}
              className={`${match?.isLive ? "bg-red-600" : "bg-gray-700"} text-white`}
            >
              {match?.isLive ? "CANLI YAYIN" : "YAKLAŞAN"}
            </Badge>
            <Badge variant="outline" className="bg-gray-800 text-gray-300">
              {match?.gameType}
            </Badge>
          </div>
          <DialogTitle className="text-2xl font-bold mt-2">
            {match?.teams?.[0]?.name} vs {match?.teams?.[1]?.name}
          </DialogTitle>
          <DialogDescription className="text-gray-400 flex items-center">
            <Trophy className="h-4 w-4 mr-1" />
            {match?.tournament} - {match?.tournamentStage} (Bo{match?.bestOf})
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4">
          <Tabs defaultValue="overview">
            <TabsList className="grid grid-cols-3 bg-gray-800">
              <TabsTrigger
                value="overview"
                className="data-[state=active]:text-primary-foreground data-[state=inactive]:text-foreground"
              >
                Genel Bakış
              </TabsTrigger>
              <TabsTrigger
                value="teams"
                className="data-[state=active]:text-primary-foreground data-[state=inactive]:text-foreground"
              >
                Takımlar
              </TabsTrigger>
              <TabsTrigger
                value="streams"
                className="data-[state=active]:text-primary-foreground data-[state=inactive]:text-foreground"
              >
                Yayınlar
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-4">
              <div className="bg-gray-800 rounded-lg p-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="flex flex-col items-center">
                    <img
                      src={match?.teams?.[0]?.logo}
                      alt={match?.teams?.[0]?.name}
                      className="w-24 h-24 rounded-full bg-gray-700 p-1"
                    />
                    <h3 className="text-lg font-bold mt-2">
                      {match?.teams?.[0]?.name}
                    </h3>
                  </div>

                  {match?.isLive ? (
                    <div className="flex flex-col items-center">
                      <div className="text-4xl font-bold text-white flex items-center gap-4">
                        <span>{match?.teams?.[0]?.score}</span>
                        <span className="text-gray-500">-</span>
                        <span>{match?.teams?.[1]?.score}</span>
                      </div>
                      <Badge className="mt-2 bg-red-600">CANLI</Badge>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <div className="text-2xl font-bold text-white">VS</div>
                      <div className="flex items-center mt-2 text-gray-400">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span className="text-sm">
                          {match?.startTime ? formatDate(match.startTime) : ""}
                        </span>
                      </div>
                      <div className="flex items-center mt-1 text-gray-400">
                        <Clock className="h-4 w-4 mr-1" />
                        <span className="text-sm">
                          {match?.startTime ? formatTime(match.startTime) : ""}
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="flex flex-col items-center">
                    <img
                      src={match?.teams?.[1]?.logo}
                      alt={match?.teams?.[1]?.name}
                      className="w-24 h-24 rounded-full bg-gray-700 p-1"
                    />
                    <h3 className="text-lg font-bold mt-2">
                      {match?.teams?.[1]?.name}
                    </h3>
                  </div>
                </div>

                <Separator className="my-6 bg-gray-700" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-700 p-4 rounded-lg">
                    <h4 className="font-medium mb-2 flex items-center">
                      <Trophy className="h-4 w-4 mr-1" /> Turnuva Bilgisi
                    </h4>
                    <p className="text-sm text-gray-300">{match?.tournament}</p>
                    <p className="text-sm text-gray-300">
                      {match?.tournamentStage}
                    </p>
                    <p className="text-sm text-gray-300">
                      En iyi {match?.bestOf}
                    </p>
                  </div>

                  <div className="bg-gray-700 p-4 rounded-lg">
                    <h4 className="font-medium mb-2 flex items-center">
                      <Calendar className="h-4 w-4 mr-1" /> Program
                    </h4>
                    <p className="text-sm text-gray-300">
                      {match?.startTime ? formatDate(match.startTime) : ""}
                    </p>
                    <p className="text-sm text-gray-300">
                      {match?.startTime ? formatTime(match.startTime) : ""}
                    </p>
                  </div>
                </div>

                {match?.maps && match.maps.length > 0 && (
                  <div className="mt-4 bg-gray-700 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Haritalar</h4>
                    <div className="flex flex-wrap gap-2">
                      {match.maps.map((map, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="bg-gray-800"
                        >
                          {map}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="teams" className="mt-4">
              <div className="space-y-6">
                {match?.teams?.map((team) => (
                  <div key={team.id} className="bg-gray-800 rounded-lg p-4">
                    <div className="flex items-center mb-4">
                      <img
                        src={team.logo}
                        alt={team.name}
                        className="w-12 h-12 rounded-full bg-gray-700 p-1"
                      />
                      <h3 className="text-lg font-bold ml-3">{team.name}</h3>
                    </div>

                    <h4 className="text-sm font-medium text-gray-400 mb-3 flex items-center">
                      <Users className="h-4 w-4 mr-1" /> Kadro
                    </h4>

                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                      {team.players.map((player) => (
                        <div
                          key={player.id}
                          className="flex flex-col items-center bg-gray-700 p-3 rounded-lg"
                        >
                          <Avatar className="h-16 w-16 mb-2">
                            <AvatarImage
                              src={player.avatar}
                              alt={player.name}
                            />
                            <AvatarFallback className="bg-gray-600">
                              {player.name.substring(0, 2)}
                            </AvatarFallback>
                          </Avatar>
                          <p className="font-medium text-sm">{player.name}</p>
                          {player.role && (
                            <Badge
                              variant="outline"
                              className="mt-1 text-xs bg-gray-600"
                            >
                              {player.role}
                            </Badge>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="streams" className="mt-4">
              <div className="bg-gray-800 rounded-lg p-4">
                <h3 className="text-lg font-medium mb-4 flex items-center">
                  <Video className="h-5 w-5 mr-2" /> Mevcut Yayınlar
                </h3>

                {match?.streams && match.streams.length > 0 ? (
                  <div className="space-y-3">
                    {match.streams.map((stream, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between bg-gray-700 p-3 rounded-lg"
                      >
                        <div className="flex items-center">
                          <Badge
                            variant="outline"
                            className={`${stream.platform === "Twitch" ? "bg-purple-900" : "bg-red-900"} border-0`}
                          >
                            {stream.platform}
                          </Badge>
                          <span className="ml-3 text-sm">
                            {stream.language}
                          </span>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="bg-gray-800 hover:bg-gray-700"
                          onClick={() => window.open(stream.url, "_blank")}
                        >
                          <ExternalLink className="h-4 w-4 mr-1" /> İzle
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-400 text-center py-6">
                    Bu maç için henüz yayın bulunmuyor.
                  </p>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <DialogFooter className="flex flex-col sm:flex-row sm:justify-between gap-2 mt-4">
          <Button
            variant="outline"
            className="bg-gray-800 hover:bg-gray-700 border-gray-700"
            onClick={onAddToFavorites}
          >
            <Heart className="h-4 w-4 mr-2" /> Favorilere Ekle
          </Button>

          {match?.isLive && match?.streams && match.streams.length > 0 && (
            <Button
              className="bg-red-600 hover:bg-red-700"
              onClick={() => window.open(match.streams[0].url, "_blank")}
            >
              <Video className="h-4 w-4 mr-2" /> Canlı İzle
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MatchDetailModal;
