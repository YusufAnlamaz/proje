import React, { useState } from "react";
import { Calendar, CalendarCheck, Plus } from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

interface CalendarIntegrationProps {
  matchId?: string;
  matchTitle?: string;
  matchDate?: Date;
  matchTime?: string;
  isOpen?: boolean;
}

const CalendarIntegration = ({
  matchId = "123456",
  matchTitle = "Team Liquid vs Cloud9 - LCS Summer Split",
  matchDate = new Date(),
  matchTime = "18:00",
  isOpen = false,
}: CalendarIntegrationProps) => {
  const [dialogOpen, setDialogOpen] = useState(isOpen);
  const [addedToCalendar, setAddedToCalendar] = useState(false);

  const calendarOptions = [
    {
      name: "Google Calendar",
      icon: "https://upload.wikimedia.org/wikipedia/commons/a/a5/Google_Calendar_icon_%282020%29.svg",
    },
    {
      name: "Apple Calendar",
      icon: "https://upload.wikimedia.org/wikipedia/commons/5/5e/ICloud_logo.svg",
    },
    {
      name: "Outlook",
      icon: "https://upload.wikimedia.org/wikipedia/commons/d/df/Microsoft_Office_Outlook_%282018%E2%80%93present%29.svg",
    },
  ];

  const handleAddToCalendar = (calendarType: string) => {
    // In a real implementation, this would generate the appropriate calendar link
    console.log(`Adding match ${matchId} to ${calendarType}`);
    setAddedToCalendar(true);

    // Close dialog after a short delay
    setTimeout(() => {
      setDialogOpen(false);
      // Reset state after dialog closes
      setTimeout(() => setAddedToCalendar(false), 300);
    }, 1500);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="bg-gray-900 p-4 rounded-lg w-full max-w-sm">
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="w-full flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-700 text-white border-gray-700"
          >
            <Calendar className="h-4 w-4" />
            <span>Add to Calendar</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="bg-gray-800 text-white border-gray-700">
          <DialogHeader>
            <DialogTitle className="text-xl">Add to Calendar</DialogTitle>
            <DialogDescription className="text-gray-300">
              {addedToCalendar ? (
                <div className="flex flex-col items-center py-4">
                  <CalendarCheck className="h-16 w-16 text-green-500 mb-2" />
                  <p>Successfully added to calendar!</p>
                </div>
              ) : (
                <>
                  <p>
                    Add this match to your calendar to get notified when it
                    starts.
                  </p>
                  <div className="mt-2 p-3 bg-gray-700 rounded-md">
                    <h3 className="font-semibold">{matchTitle}</h3>
                    <p className="text-sm text-gray-300">
                      {formatDate(matchDate)} at {matchTime}
                    </p>
                  </div>
                </>
              )}
            </DialogDescription>
          </DialogHeader>

          {!addedToCalendar && (
            <div className="grid grid-cols-1 gap-3 py-2">
              {calendarOptions.map((option) => (
                <Button
                  key={option.name}
                  variant="outline"
                  className="flex justify-between items-center bg-gray-700 hover:bg-gray-600 border-gray-600 text-white"
                  onClick={() => handleAddToCalendar(option.name)}
                >
                  <span>{option.name}</span>
                  <img
                    src={option.icon}
                    alt={option.name}
                    className="h-5 w-5"
                  />
                </Button>
              ))}
            </div>
          )}

          {!addedToCalendar && (
            <DialogFooter>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="ghost"
                    className="text-gray-300 hover:text-white hover:bg-gray-700"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    More Options
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="bg-gray-800 text-white border-gray-700">
                  <div className="grid gap-2">
                    <div className="flex flex-col space-y-1">
                      <h4 className="font-medium">Reminder Settings</h4>
                      <p className="text-sm text-gray-300">
                        Set custom reminders for this match
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        variant="outline"
                        className="bg-gray-700 hover:bg-gray-600 border-gray-600 text-white"
                      >
                        30 min before
                      </Button>
                      <Button
                        variant="outline"
                        className="bg-gray-700 hover:bg-gray-600 border-gray-600 text-white"
                      >
                        1 hour before
                      </Button>
                      <Button
                        variant="outline"
                        className="bg-gray-700 hover:bg-gray-600 border-gray-600 text-white"
                      >
                        1 day before
                      </Button>
                      <Button
                        variant="outline"
                        className="bg-gray-700 hover:bg-gray-600 border-gray-600 text-white"
                      >
                        Custom...
                      </Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </DialogFooter>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CalendarIntegration;
