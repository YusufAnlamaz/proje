import React, { useState } from "react";
import { Badge } from "./ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

interface Game {
  id: string;
  name: string;
  icon: string;
  color: string;
}

interface GameFilterProps {
  games?: Game[];
  selectedGame?: string | null;
  onSelectGame?: (gameId: string | null) => void;
}

const GameFilter = ({
  games = [
    {
      id: "lol",
      name: "League of Legends",
      icon: "https://static.wikia.nocookie.net/leagueoflegends/images/8/86/League_of_Legends_Cover.jpg/revision/latest?cb=20191018222445&w=300&q=80",
      color: "bg-blue-500",
    },
    {
      id: "dota2",
      name: "Dota 2",
      icon: "https://cdn.cloudflare.steamstatic.com/steam/apps/570/header.jpg?w=300&q=80",
      color: "bg-red-500",
    },
    {
      id: "csgo",
      name: "CS:GO",
      icon: "https://cdn.cloudflare.steamstatic.com/steam/apps/730/header.jpg?w=300&q=80",
      color: "bg-yellow-500",
    },
    {
      id: "valorant",
      name: "Valorant",
      icon: "https://images.contentstack.io/v3/assets/bltb6530b271fddd0b1/blt3f072336e3f3ade4/63096d7be4a8c30e088e7720/Valorant_2022_E5A2_PlayVALORANT_ContentStackThumbnail_1200x625_MB01.png?w=300&q=80",
      color: "bg-pink-500",
    },
    {
      id: "overwatch",
      name: "Overwatch",
      icon: "https://blz-contentstack-images.akamaized.net/v3/assets/blt9c12f249ac15c7ec/blt4d790c3da3e704c9/63368a7910b66a50b0e1d3e2/OW2-Keyart_Boxart-Tall_Launch_MB01.jpg?w=300&q=80",
      color: "bg-orange-500",
    },
    {
      id: "fortnite",
      name: "Fortnite",
      icon: "https://cdn2.unrealengine.com/fortnite-chapter-4-season-og-3840x2160-a7e56e1a86bb.jpg?w=300&q=80",
      color: "bg-purple-500",
    },
    {
      id: "rocketleague",
      name: "Rocket League",
      icon: "https://cdn1.epicgames.com/offer/9773aa1aa54f4f7b80e44bef04986cea/EGS_RocketLeague_PsyonixLLC_S1_2560x1440-d9a4c90f0b2a9ad57e7c0c56bb22a5db?w=300&q=80",
      color: "bg-green-500",
    },
    {
      id: "apexlegends",
      name: "Apex Legends",
      icon: "https://media.contentapi.ea.com/content/dam/apex-legends/images/2019/01/apex-featured-image-16x9.jpg.adapt.crop16x9.1023w.jpg?w=300&q=80",
      color: "bg-red-400",
    },
  ],
  selectedGame = null,
  onSelectGame = () => {},
}: GameFilterProps) => {
  const [selected, setSelected] = useState<string | null>(selectedGame);

  const handleGameSelect = (gameId: string) => {
    const newSelected = selected === gameId ? null : gameId;
    setSelected(newSelected);
    onSelectGame(newSelected);
  };

  return (
    <div className="w-full bg-card p-4 rounded-lg shadow-md dark:bg-gray-900">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground dark:text-white">
          Oyuna Göre Filtrele
        </h3>
        {selected && (
          <Badge
            variant="outline"
            className="cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-700 text-foreground dark:text-white"
            onClick={() => handleGameSelect(selected)}
          >
            Filtreyi Temizle
          </Badge>
        )}
      </div>

      <div className="flex flex-wrap gap-3 items-center">
        {games.map((game) => (
          <TooltipProvider key={game.id}>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={() => handleGameSelect(game.id)}
                  className={`flex items-center justify-center w-12 h-12 rounded-full ${selected === game.id ? "ring-2 ring-white" : "opacity-80 hover:opacity-100"} transition-all overflow-hidden`}
                  aria-label={game.name}
                >
                  <img
                    src={game.icon}
                    alt={game.name}
                    className="w-full h-full object-cover"
                  />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{game.name}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>
    </div>
  );
};

export default GameFilter;
