import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Search, Bell, Menu, X, Twitch, Youtube, Trophy } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Badge } from "./ui/badge";

interface HeaderProps {
  onSearch?: (query: string) => void;
  notifications?: Array<{
    id: string;
    title: string;
    message: string;
    isRead: boolean;
  }>;
}

const Header = ({
  onSearch = () => {},
  notifications = [
    {
      id: "1",
      title: "Maç Yakında Başlıyor",
      message: "Team Liquid vs Cloud9 15 dakika içinde başlıyor",
      isRead: false,
    },
    {
      id: "2",
      title: "Turnuva Güncellemesi",
      message: "ESL Pro League Sezon 16 eşleşmeleri güncellendi",
      isRead: true,
    },
    {
      id: "3",
      title: "Canlı Yayın",
      message: "T1 vs DRX şu anda Twitch'te canlı yayında",
      isRead: false,
    },
  ],
}: HeaderProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const unreadNotifications = notifications.filter(
    (notification) => !notification.isRead,
  ).length;

  const navLinks = [
    { name: "Ana Sayfa", href: "/" },
    { name: "Canlı Maçlar", href: "/live" },
    { name: "Program", href: "/schedule" },
    { name: "Takımlar", href: "/teams" },
    { name: "Turnuvalar", href: "/tournaments" },
    { name: "Mobil Uygulama", href: "/mobile-app" },
  ];

  return (
    <header className="w-full h-20 bg-background border-b border-border px-4 md:px-6 flex items-center justify-between sticky top-0 z-50 dark:bg-gray-900 dark:border-gray-800">
      <div className="flex items-center">
        <div className="flex items-center mr-6">
          <Trophy className="h-8 w-8 text-indigo-500 mr-2" />
          <span className="text-white font-bold text-xl hidden sm:inline-block">
            E-Spor Merkezi
          </span>
        </div>

        <nav className="hidden md:flex space-x-6">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-gray-300 hover:text-white transition-colors"
            >
              {link.name}
            </a>
          ))}
        </nav>
      </div>

      <div className="flex items-center space-x-4">
        <form
          onSubmit={handleSearch}
          className="relative hidden md:flex items-center"
        >
          <Input
            type="search"
            placeholder="Maçları, takımları ara..."
            className="w-64 bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 focus-visible:ring-indigo-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button
            type="submit"
            variant="ghost"
            size="icon"
            className="absolute right-0 text-gray-400 hover:text-white"
          >
            <Search className="h-4 w-4" />
          </Button>
        </form>

        <div className="flex items-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5 text-gray-300" />
                {unreadNotifications > 0 && (
                  <Badge
                    className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-red-500 text-white text-xs"
                    variant="destructive"
                  >
                    {unreadNotifications}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-80 bg-gray-800 text-white border-gray-700"
            >
              <div className="p-2 border-b border-gray-700 flex justify-between items-center">
                <h3 className="font-medium">Bildirimler</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs text-gray-400 hover:text-white"
                >
                  Tümünü Okundu İşaretle
                </Button>
              </div>
              {notifications.length > 0 ? (
                <div className="max-h-80 overflow-y-auto">
                  {notifications.map((notification) => (
                    <DropdownMenuItem
                      key={notification.id}
                      className={`p-3 border-b border-gray-700 last:border-0 cursor-pointer ${!notification.isRead ? "bg-gray-700/50" : ""}`}
                    >
                      <div className="w-full">
                        <div className="flex justify-between items-start">
                          <h4 className="font-medium text-sm">
                            {notification.title}
                          </h4>
                          {!notification.isRead && (
                            <Badge
                              className="bg-indigo-500 text-xs"
                              variant="secondary"
                            >
                              Yeni
                            </Badge>
                          )}
                        </div>
                        <p className="text-gray-400 text-xs mt-1">
                          {notification.message}
                        </p>
                      </div>
                    </DropdownMenuItem>
                  ))}
                </div>
              ) : (
                <div className="p-4 text-center text-gray-400">
                  <p>Bildirim yok</p>
                </div>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="flex items-center ml-2 space-x-2">
            <a
              href="https://twitch.tv"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-purple-400 transition-colors"
            >
              <Twitch className="h-5 w-5" />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-red-500 transition-colors"
            >
              <Youtube className="h-5 w-5" />
            </a>
            <ThemeToggle />
          </div>

          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden ml-2">
                <Menu className="h-6 w-6 text-gray-300" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[80%] sm:w-[350px] bg-gray-900 text-white border-gray-800"
            >
              <SheetHeader>
                <SheetTitle className="text-white flex items-center">
                  <Trophy className="h-6 w-6 text-indigo-500 mr-2" />
                  E-Spor Merkezi
                </SheetTitle>
              </SheetHeader>
              <div className="py-6">
                <form
                  onSubmit={handleSearch}
                  className="relative flex items-center mb-6"
                >
                  <Input
                    type="search"
                    placeholder="Maçları, takımları ara..."
                    className="w-full bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 focus-visible:ring-indigo-500"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Button
                    type="submit"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 text-gray-400 hover:text-white"
                  >
                    <Search className="h-4 w-4" />
                  </Button>
                </form>

                <nav className="space-y-4">
                  {navLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      className="block py-2 text-gray-300 hover:text-white transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.name}
                    </a>
                  ))}
                </nav>

                <div className="mt-8 pt-6 border-t border-gray-800">
                  <p className="text-sm text-gray-400 mb-4">Yayınları İzle</p>
                  <div className="flex space-x-4">
                    <a
                      href="https://twitch.tv"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-gray-300 hover:text-purple-400 transition-colors"
                    >
                      <Twitch className="h-5 w-5 mr-2" />
                      Twitch
                    </a>
                    <a
                      href="https://youtube.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-gray-300 hover:text-red-500 transition-colors"
                    >
                      <Youtube className="h-5 w-5 mr-2" />
                      YouTube
                    </a>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
