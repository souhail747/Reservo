import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Calendar, Users, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { useLanguage } from '@/contexts/LanguageContext';

interface SearchBarProps {
  variant?: 'hero' | 'compact';
  initialDestination?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ variant = 'hero', initialDestination = '' }) => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [destination, setDestination] = useState(initialDestination);
  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();
  const [guests, setGuests] = useState({ adults: 2, children: 0, rooms: 1 });
  const [guestsOpen, setGuestsOpen] = useState(false);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (destination) params.set('destination', destination);
    if (checkIn) params.set('checkIn', checkIn.toISOString());
    if (checkOut) params.set('checkOut', checkOut.toISOString());
    params.set('adults', guests.adults.toString());
    params.set('children', guests.children.toString());
    params.set('rooms', guests.rooms.toString());
    
    navigate(`/search?${params.toString()}`);
  };

  const guestSummary = `${guests.adults} ${guests.adults === 1 ? t.home.adult : t.home.adults}${
    guests.children > 0 ? `, ${guests.children} ${guests.children === 1 ? t.home.child : t.home.children}` : ''
  }, ${guests.rooms} ${guests.rooms === 1 ? t.home.room : t.home.rooms}`;

  if (variant === 'compact') {
    return (
      <div className="flex flex-col lg:flex-row gap-2 p-2 bg-card rounded-lg border border-border shadow-card">
        <div className="flex-1 flex items-center gap-2 px-3">
          <MapPin className="h-5 w-5 text-muted-foreground flex-shrink-0" />
          <Input
            type="text"
            placeholder={t.home.searchPlaceholder}
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="border-0 text-primary h-10 focus-visible:ring-0 px-0"
          />
        </div>

        <div className="flex flex-1 gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="flex-1 justify-start text-left font-normal h-10">
                <Calendar className="mr-2 h-4 w-4" />
                {checkIn ? format(checkIn, 'MMM dd') : t.home.checkIn}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <CalendarComponent
                mode="single"
                selected={checkIn}
                onSelect={setCheckIn}
                disabled={(date) => date < new Date()}
                initialFocus
              />
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="flex-1 justify-start text-left font-normal h-10">
                <Calendar className="mr-2 h-4 w-4" />
                {checkOut ? format(checkOut, 'MMM dd') : t.home.checkOut}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <CalendarComponent
                mode="single"
                selected={checkOut}
                onSelect={setCheckOut}
                disabled={(date) => date < (checkIn || new Date())}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <Button onClick={handleSearch} className="bg-accent text-accent-foreground hover:bg-accent/90 h-10">
          <Search className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-searchbar rounded-lg p-1 shadow-search">
      <div className="flex flex-col lg:flex-row gap-1">
        {/* Destination */}
        <div className="flex-1 text-black flex items-center gap-3 bg-card rounded-md px-4 py-3">
          <MapPin className="h-5 w-5 text-muted-foreground flex-shrink-0" />
          <Input
            type="text"
            placeholder={t.home.searchPlaceholder}
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            onKeyDown={(e)=>{
              if(e.key==='Enter') handleSearch()
            }}
            className="border-0 h-auto p-0 text-base focus-visible:ring-0 bg-transparent"
          />
        </div>

        {/* Check-in */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              className="flex-1 lg:flex-none text-gray-600 justify-start text-left font-normal bg-card rounded-md px-4 py-3 h-auto hover:bg-secondary"
            >
              <Calendar className="mr-3 h-5 w-5 text-muted-foreground" />
              <div className="flex flex-col items-start">
                <span className="text-xs text-muted-foreground">{t.home.checkIn}</span>
                <span className="text-sm font-medium">
                  {checkIn ? format(checkIn, 'EEE, MMM dd') : t.home.addDate  }
                </span>
              </div>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <CalendarComponent
              mode="single"
              selected={checkIn}
              onSelect={setCheckIn}
              disabled={(date) => date < new Date()}
              initialFocus
            />
          </PopoverContent>
        </Popover>

        {/* Check-out */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              className="flex-1 lg:flex-none text-gray-600 justify-start text-left font-normal bg-card rounded-md px-4 py-3 h-auto hover:bg-secondary"
            >
              <Calendar className="mr-3 h-5 w-5 text-muted-foreground" />
              <div className="flex flex-col items-start">
                <span className="text-xs text-muted-foreground">{t.home.checkOut}</span>
                <span className="text-sm font-medium">
                  {checkOut ? format(checkOut, 'EEE, MMM dd') : t.home.addDate}

                </span>
              </div>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto  p-0" align="start">
            <CalendarComponent
              mode="single"
              selected={checkOut}
              onSelect={setCheckOut}
              disabled={(date) => date < (checkIn || new Date())}
              initialFocus
            />
          </PopoverContent>
        </Popover>

        {/* Guests */}
        <Popover open={guestsOpen} onOpenChange={setGuestsOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              className="flex-1 text-gray-600 lg:flex-none justify-start text-left font-normal bg-card rounded-md px-4 py-3 h-auto hover:bg-secondary"
            >
              <Users className="mr-3 h-5 w-5 text-muted-foreground" />
              <div className="flex flex-col items-start flex-1">
                <span className="text-xs text-muted-foreground">{t.home.guests}</span>
                <span className="text-sm font-medium truncate max-w-[180px]">{guestSummary}</span>
              </div>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[280px] p-4" align="start">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-medium">{t.home.adults}</span>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setGuests({ ...guests, adults: Math.max(1, guests.adults - 1) })}
                    disabled={guests.adults <= 1}
                  >
                    -
                  </Button>
                  <span className="w-8 text-center">{guests.adults}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setGuests({ ...guests, adults: guests.adults + 1 })}
                  >
                    +
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">{t.home.children}</span>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setGuests({ ...guests, children: Math.max(0, guests.children - 1) })}
                    disabled={guests.children <= 0}
                  >
                    -
                  </Button>
                  <span className="w-8 text-center">{guests.children}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setGuests({ ...guests, children: guests.children + 1 })}
                  >
                    +
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">{t.home.rooms}</span>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setGuests({ ...guests, rooms: Math.max(1, guests.rooms - 1) })}
                    disabled={guests.rooms <= 1}
                  >
                    -
                  </Button>
                  <span className="w-8 text-center">{guests.rooms}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setGuests({ ...guests, rooms: guests.rooms + 1 })}
                  >
                    +
                  </Button>
                </div>
              </div>
              <Button className="w-full" onClick={() => setGuestsOpen(false)}>
                {t.common.apply}
              </Button>
            </div>
          </PopoverContent>
        </Popover>

       
      </div>
       {/* Search Button */}
        <div className='text-center mt-5'>

        <Button
          onClick={handleSearch}
          size="lg"
          className="bg-primary w-[150px] text-primary-foreground hover:bg-primary/90 px-8 py-3 h-auto rounded-md font-semibold"
          >
          <Search className="h-5 w-5 mr-2" />
          {t.home.search}
        </Button>
          </div>
    </div>
  );
};

export default SearchBar;
