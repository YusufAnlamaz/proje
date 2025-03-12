import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Search, Filter } from "lucide-react";
import MatchCard from "./MatchCard";
import { Badge } from "./ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";

interface Team {
  id: string;
  name: string;
  logo: string;
  score?: number;
}

interface Match {
  id: string;
  teams: [Team, Team];
  gameType: string;
  tournament: string;
  startTime: string;
  isLive?: boolean;
  streamUrl?: string;
}

interface SearchResultsProps {
  searchQuery?: string;
  results?: Match[];
  isLoading?: boolean;
  onSearch?: (query: string) => void;
  onFilterChange?: (filters: SearchFilters) => void;
}

interface SearchFilters {
  gameType?: string;
  tournament?: string;
  teamName?: string;
  liveOnly?: boolean;
}

const SearchResults = ({
  searchQuery = "",
  results = [
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
      gameType: "CS:GO",
      tournament: "ESL Pro League",
      startTime: "2023-06-16T20:30:00Z",
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
    },
  ],
  isLoading = false,
  onSearch = () => {},
  onFilterChange = () => {},
}: SearchResultsProps) => {
  const [query, setQuery] = useState<string>(searchQuery);
  const [filters, setFilters] = useState<SearchFilters>({});
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("all");

  // Get unique game types and tournaments for filters
  const gameTypes = [...new Set(results.map((match) => match.gameType))];
  const tournaments = [...new Set(results.map((match) => match.tournament))];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  const handleFilterChange = (newFilters: Partial<SearchFilters>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const clearFilters = () => {
    setFilters({});
    onFilterChange({});
  };

  // Filter results based on active tab
  const filteredResults = results.filter((match) => {
    if (activeTab === "live") return match.isLive;
    if (activeTab === "upcoming") return !match.isLive;
    return true; // "all" tab
  });

  return (
    <div className="w-full bg-card rounded-lg p-6 text-foreground dark:bg-gray-900 dark:text-white">
      <div className="mb-6">
        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="relative flex-1">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
            <Input
              type="text"
              placeholder="Takımları, turnuvaları veya oyunları ara..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10 bg-gray-800 border-gray-700 text-white w-full"
            />
          </div>
          <Button
            type="submit"
            variant="default"
            className="bg-indigo-600 hover:bg-indigo-700"
          >
            Ara
          </Button>
          <Button
            type="button"
            variant="outline"
            className="border-gray-700 text-gray-300"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter size={18} />
          </Button>
        </form>

        {showFilters && (
          <div className="mt-4 p-4 bg-gray-800 rounded-lg">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-medium">Filtreler</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="text-gray-400 hover:text-white"
              >
                Tümünü Temizle
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Oyun</label>
                <div className="flex flex-wrap gap-2">
                  {gameTypes.map((game) => (
                    <Badge
                      key={game}
                      variant={
                        filters.gameType === game ? "default" : "outline"
                      }
                      className={`cursor-pointer ${filters.gameType === game ? "bg-indigo-600" : "bg-gray-700 hover:bg-gray-600"}`}
                      onClick={() =>
                        handleFilterChange({
                          gameType:
                            filters.gameType === game ? undefined : game,
                        })
                      }
                    >
                      {game}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  Turnuva
                </label>
                <div className="flex flex-wrap gap-2">
                  {tournaments.map((tournament) => (
                    <Badge
                      key={tournament}
                      variant={
                        filters.tournament === tournament
                          ? "default"
                          : "outline"
                      }
                      className={`cursor-pointer ${filters.tournament === tournament ? "bg-indigo-600" : "bg-gray-700 hover:bg-gray-600"}`}
                      onClick={() =>
                        handleFilterChange({
                          tournament:
                            filters.tournament === tournament
                              ? undefined
                              : tournament,
                        })
                      }
                    >
                      {tournament}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  Durum
                </label>
                <div className="flex gap-2">
                  <Badge
                    variant={filters.liveOnly ? "default" : "outline"}
                    className={`cursor-pointer ${filters.liveOnly ? "bg-red-600" : "bg-gray-700 hover:bg-gray-600"}`}
                    onClick={() =>
                      handleFilterChange({ liveOnly: !filters.liveOnly })
                    }
                  >
                    Sadece Canlı
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="mb-4">
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <div className="flex justify-between items-center">
            <TabsList className="bg-gray-800">
              <TabsTrigger
                value="all"
                className="data-[state=active]:bg-gray-700 data-[state=active]:text-primary-foreground data-[state=inactive]:text-foreground"
              >
                Tüm Maçlar
              </TabsTrigger>
              <TabsTrigger
                value="live"
                className="data-[state=active]:bg-gray-700 data-[state=active]:text-primary-foreground data-[state=inactive]:text-foreground"
              >
                Canlı Yayın
              </TabsTrigger>
              <TabsTrigger
                value="upcoming"
                className="data-[state=active]:bg-gray-700 data-[state=active]:text-primary-foreground data-[state=inactive]:text-foreground"
              >
                Yaklaşan
              </TabsTrigger>
            </TabsList>
            <div className="text-sm text-gray-400">
              {filteredResults.length} maç bulundu
            </div>
          </div>

          <TabsContent value="all" className="mt-4">
            {renderResults(filteredResults, isLoading)}
          </TabsContent>
          <TabsContent value="live" className="mt-4">
            {renderResults(filteredResults, isLoading)}
          </TabsContent>
          <TabsContent value="upcoming" className="mt-4">
            {renderResults(filteredResults, isLoading)}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

// Helper function to render results
const renderResults = (results: Match[], isLoading: boolean) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-200 dark:bg-gray-800 rounded-lg">
        <Search className="mx-auto h-12 w-12 text-gray-600 dark:text-gray-500 mb-3" />
        <h3 className="text-xl font-medium mb-2 text-foreground dark:text-white">
          Maç bulunamadı
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Arama kriterlerinizi veya filtrelerinizi ayarlamayı deneyin
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {results.map((match) => (
        <MatchCard key={match.id} {...match} />
      ))}
    </div>
  );
};

export default SearchResults;
