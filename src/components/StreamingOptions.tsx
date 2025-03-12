import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../components/ui/tooltip";
import { ExternalLink, Twitch, Youtube, Globe, Users } from "lucide-react";

interface StreamingPlatform {
  id: string;
  name: string;
  url: string;
  viewers?: number;
  isOfficial: boolean;
  icon: React.ReactNode;
}

interface StreamingOptionsProps {
  platforms?: StreamingPlatform[];
  matchTitle?: string;
}

const StreamingOptions = ({
  platforms = [
    {
      id: "1",
      name: "Twitch Official",
      url: "https://twitch.tv/officialchannel",
      viewers: 145000,
      isOfficial: true,
      icon: <Twitch className="h-4 w-4 mr-2" />,
    },
    {
      id: "2",
      name: "YouTube Gaming",
      url: "https://youtube.com/gaming/channel",
      viewers: 98500,
      isOfficial: true,
      icon: <Youtube className="h-4 w-4 mr-2" />,
    },
    {
      id: "3",
      name: "Official Website",
      url: "https://esports.example.com/live",
      viewers: 42300,
      isOfficial: true,
      icon: <Globe className="h-4 w-4 mr-2" />,
    },
    {
      id: "4",
      name: "Community Stream",
      url: "https://twitch.tv/community_streamer",
      viewers: 12800,
      isOfficial: false,
      icon: <Users className="h-4 w-4 mr-2" />,
    },
  ],
  matchTitle = "Team Liquid vs. Cloud9 - Championship Finals",
}: StreamingOptionsProps) => {
  const handleStreamClick = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const totalViewers = platforms.reduce(
    (sum, platform) => sum + (platform.viewers || 0),
    0,
  );

  return (
    <Card className="w-full max-w-md bg-card shadow-lg border-border">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-bold">Watch Live</CardTitle>
        <CardDescription>
          {totalViewers.toLocaleString()} viewers watching this match
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {platforms.map((platform) => (
            <div
              key={platform.id}
              className={`flex items-center justify-between p-3 rounded-md ${platform.isOfficial ? "bg-primary/10" : "bg-muted"}`}
            >
              <div className="flex items-center">
                {platform.icon}
                <span className="font-medium">{platform.name}</span>
                {platform.isOfficial && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="ml-2 px-1.5 py-0.5 text-xs bg-primary text-primary-foreground rounded-sm">
                          Official
                        </span>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Official broadcast stream</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </div>
              <div className="flex items-center gap-3">
                {platform.viewers && (
                  <span className="text-sm text-muted-foreground">
                    {platform.viewers.toLocaleString()}
                  </span>
                )}
                <Button
                  size="sm"
                  variant="outline"
                  className="flex items-center gap-1"
                  onClick={() => handleStreamClick(platform.url)}
                >
                  Watch
                  <ExternalLink className="h-3 w-3" />
                </Button>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 text-xs text-center text-muted-foreground">
          Watching: {matchTitle}
        </div>
      </CardContent>
    </Card>
  );
};

export default StreamingOptions;
