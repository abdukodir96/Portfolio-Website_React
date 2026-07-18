import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "./components/ui/button";
import { Menu, X } from "lucide-react";
import { Hero } from "./components/Hero";
import { Skills } from "./components/Skills";
import { Experience } from "./components/Experience";
import { Projects } from "./components/Projects";
import { Contact } from "./components/Contact";
import { ThemeProvider } from "./components/theme-provider";
import { ThemeToggle } from "./components/theme-toggle";
import { LanguageToggle } from "./components/language-toggle";

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t } = useTranslation();

  const navItems = [
    { label: t("nav.home"), href: "#home" },
    { label: t("nav.skills"), href: "#skills" },
    { label: t("nav.experience"), href: "#experience" },
    { label: t("nav.projects"), href: "#projects" },
    { label: t("nav.contact"), href: "#contact" }
  ];

  return (
    <ThemeProvider defaultTheme="light" storageKey="portfolio-theme">
      <div className="min-h-screen bg-background transition-colors duration-300">
        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b">
          <div className="max-w-[120rem] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="shrink-0">
                <h3 className="tracking-tight font-bold text-lg">Abdukodir Sheraliev</h3>
              </div>
              
              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-4">
                <div className="flex items-baseline space-x-4">
                  {navItems.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      className="text-muted-foreground hover:text-foreground px-3 py-2 text-sm transition-colors"
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
                <LanguageToggle />
                <ThemeToggle />
              </div>

              {/* Mobile menu section */}
              <div className="md:hidden flex items-center space-x-2">
                <LanguageToggle />
                <ThemeToggle />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                  {mobileMenuOpen ? (
                    <X className="h-6 w-6" />
                  ) : (
                    <Menu className="h-6 w-6" />
                  )}
                </Button>
              </div>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-background border-t">
                {navItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="text-muted-foreground hover:text-foreground block px-3 py-2 text-base transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          )}
        </nav>

        {/* Main Content */}
        <main>
          <div id="home">
            <Hero />
          </div>
          <div id="skills">
            <Skills />
          </div>
          <div id="experience">
            <Experience />
          </div>
          <div id="projects">
            <Projects />
          </div>
          <div id="contact">
            <Contact />
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-secondary/10 py-12 px-4">
          <div className="max-w-[84rem] mx-auto text-center">
            <h3 className="mb-4">Abdukodir Sheraliev (Steve)</h3>
            <p className="text-muted-foreground mb-6">
              {t("footer.role")}
            </p>
            <p className="text-sm text-muted-foreground">
              {t("footer.rights")}
            </p>
          </div>
        </footer>
      </div>
    </ThemeProvider>
  );
}