import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container-main py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link onClick={()=>{window.scrollTo({top:0,behavior:"smooth"})}} to="/" className="flex items-center gap-2">
              <div className="text-2xl font-bold tracking-tight">
                RESE<span className="text-accent">RVO</span>
              </div>
            </Link>
            <p className="text-sm text-primary-foreground/70">
              Find the perfect accommodation for your next adventure.
            </p>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Company</h3>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li>
                <Link
                  to="/about"
                  className="hover:text-accent transition-colors"
                >
                  {t.footer.aboutUs}
                </Link>
              </li>
              <li>
                <Link
                  to="/careers"
                  className="hover:text-accent transition-colors"
                >
                  {t.footer.careers}
                </Link>
              </li>
              <li>
                <Link
                  to="/press"
                  className="hover:text-accent transition-colors"
                >
                  {t.footer.press}
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">{t.footer.help}</h3>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li>
                <Link to="/faq" className="hover:text-accent transition-colors">
                  {t.footer.faq}
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-accent transition-colors"
                >
                  {t.footer.contactUs}
                </Link>
              </li>
              <li>
                <Link
                  to="/support"
                  className="hover:text-accent transition-colors"
                >
                  {t.nav.support}
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Legal</h3>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li>
                <Link
                  to="/terms"
                  className="hover:text-accent transition-colors"
                >
                  {t.footer.terms}
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="hover:text-accent transition-colors"
                >
                  {t.footer.privacy}
                </Link>
              </li>
              <li>
                <Link
                  to="/cookies"
                  className="hover:text-accent transition-colors"
                >
                  {t.footer.cookies}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-white text-lg ">
            © 2026 Reservo. All rights reserved.{" "}
            <Link
              to="https://benhamedsouhailportfolio.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold hover:cursor-pointer text-orange-500"
            >
              by Souhail
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
