import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Globe, Menu, Heart } from "lucide-react";
import { properties } from "@/data/mockData";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useLanguage } from "@/contexts/LanguageContext";
import { Language, languageNames } from "@/i18n/translations";

const Header: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const languages: Language[] = ["en", "fr", "ar", "es"];

  const getSavedProperties = (): string[] =>
    JSON.parse(localStorage.getItem("savedProperties") || "[]");
  const [savedProps, setSavedProps] = useState<typeof properties>([]);

  useEffect(() => {
    const savedIds = getSavedProperties();
    const savedList = properties.filter((p) => savedIds.includes(p.id));
    setSavedProps(savedList);
  }, [savedProps]);

  // Get saved property IDs
  const savedIds = getSavedProperties();

  // Number of saved properties
  const numberOfSaved = savedIds.length;

  // Full list of navbar elements
  const navbarLinks = [
    { label: t.nav.properties, to: "/search" },
    { label: t.nav.flights, to: "/searcg" },
    { label: t.nav.carRentals, to: "/search" },
    { label: t.nav.experiences, to: "/search" },
    { label: t.nav.deals, to: "/search" },
    { label: t.nav.support, to: "/search" },
  ];

  return (
    <header
      style={{
        direction: "ltr",
        textAlign: "left",
      }}
      className="bg-primary text-primary-foreground sticky top-0 z-50 shadow-sm"
    >
      <div className="container-main">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="text-2xl font-bold tracking-tight">
              RESE<span className="text-accent">RVO</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navbarLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-sm font-medium hover:text-accent transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {/* Language Selector */}
            {/* List Property CTA */}
            <Link to="/list-property" className="group">
              <Button
                variant="ghost"
                size="icon"
                className="relative"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                <Heart className="h-5 w-5" />
                {numberOfSaved > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-accent text-primary-foreground text-xs flex items-center justify-center font-medium transition-colors duration-300 group-hover:bg-accent group-hover:text-black">
                    {numberOfSaved}
                  </span>
                )}
              </Button>
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-primary-foreground "
                >
                  <Globe className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="min-w-[150px]">
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang}
                    onClick={() => setLanguage(lang)}
                    className={language === lang ? "bg-secondary" : ""}
                  >
                    {languageNames[lang]}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Auth Buttons */}
            <div className="hidden sm:flex items-center gap-2">
              <Button
                variant="ghost"
                className="text-primary-foreground hover:bg-primary-foreground/10"
                asChild
              >
                <Link to="/auth">{t.nav.register}</Link>
              </Button>
              <Button
                className="bg-accent text-accent-foreground hover:bg-accent/90"
                asChild
              >
                <Link to="/auth">{t.nav.signIn}</Link>
              </Button>
            </div>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild className="md:hidden">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-primary-foreground hover:bg-primary-foreground/10"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px]">
                <nav className="flex flex-col gap-4 mt-8">
                  {navbarLinks.map((link) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      className="text-lg font-medium hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                  <hr className="my-4" />
                  <Link to="/auth">
                    <Button className="w-full">{t.nav.signIn}</Button>
                  </Link>
                  <Link to="/auth">
                    <Button variant="outline" className="w-full">
                      {t.nav.register}
                    </Button>
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
