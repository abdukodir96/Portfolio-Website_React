import { useTranslation } from "react-i18next";
import { Languages } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { STORAGE_KEY } from "../../i18n";

const LANGUAGES = [
  { code: "ko", label: "한국어" },
  { code: "en", label: "English" },
  { code: "uz", label: "O'zbek" },
  { code: "ru", label: "Русский" },
];

export function LanguageToggle() {
  const { i18n } = useTranslation();

  const changeLanguage = (code: string) => {
    localStorage.setItem(STORAGE_KEY, code);
    i18n.changeLanguage(code);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-9 w-9">
          <Languages className="h-4 w-4" />
          <span className="sr-only">Change language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {LANGUAGES.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => changeLanguage(lang.code)}
            className="cursor-pointer"
          >
            {lang.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
