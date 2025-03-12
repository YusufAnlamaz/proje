import React, { useState } from "react";
import Header from "./Header";
import LiveMatchesSection from "./LiveMatchesSection";
import UpcomingMatchesSection from "./UpcomingMatchesSection";
import SearchResults from "./SearchResults";
import MatchDetailModal from "./MatchDetailModal";
import AdBanner from "./AdBanner";
import MobileAppPromo from "./MobileAppPromo";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  const [selectedMatch, setSelectedMatch] = useState<any>(null);
  const [showMatchDetail, setShowMatchDetail] = useState(false);

  // Sample search results
  const searchResults = [
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
  ];

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setShowSearchResults(!!query);
  };

  const handleGameSelect = (gameId: string | null) => {
    setSelectedGame(gameId);
  };

  const handleMatchSelect = (match: any) => {
    setSelectedMatch(match);
    setShowMatchDetail(true);
  };

  const handleAddToFavorites = () => {
    // Implementation for adding match to favorites would go here
    console.log("Added to favorites:", selectedMatch?.id);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header onSearch={handleSearch} />

      <AdBanner
        position="top"
        height="90px"
        className="container mx-auto px-4 mt-4"
      />

      <main className="container mx-auto px-4 py-8 space-y-8">
        {showSearchResults ? (
          <SearchResults
            searchQuery={searchQuery}
            results={searchResults}
            onSearch={handleSearch}
            onFilterChange={() => {}}
          />
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-3/4 space-y-8">
              <LiveMatchesSection onMatchSelect={handleMatchSelect} />

              <AdBanner position="inline" height="120px" className="my-8" />

              <MobileAppPromo className="my-8" />

              <UpcomingMatchesSection
                selectedGame={selectedGame}
                onGameSelect={handleGameSelect}
              />
            </div>

            <div className="lg:w-1/4 space-y-6">
              <AdBanner
                position="sidebar"
                height="600px"
                className="sticky top-24"
              />
            </div>
          </div>
        )}
      </main>

      {/* Match Detail Modal */}
      <MatchDetailModal
        match={selectedMatch}
        open={showMatchDetail}
        onOpenChange={setShowMatchDetail}
        onAddToFavorites={handleAddToFavorites}
      />

      <AdBanner
        position="footer"
        height="120px"
        className="container mx-auto px-4 my-8"
      />

      <footer className="bg-gray-200 dark:bg-gray-900 border-t border-gray-300 dark:border-gray-800 py-6 mt-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-bold flex items-center text-foreground dark:text-white">
                <span className="text-indigo-600 dark:text-indigo-500 mr-2">
                  E-Spor
                </span>{" "}
                Merkezi
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                E-spor maçları ve turnuvaları için tek durağınız
              </p>
            </div>
            <div className="flex space-x-6">
              <a
                href="#"
                className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
              >
                Hakkında
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
              >
                İletişim
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
              >
                Gizlilik
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
              >
                Koşullar
              </a>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-gray-300 dark:border-gray-800 text-center text-gray-600 dark:text-gray-500 text-sm">
            © {new Date().getFullYear()} E-Spor Merkezi. Tüm hakları saklıdır.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
