import { useTheme } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export function ModeToggle() {
  const { setTheme, theme } = useTheme();
  const [rotation, setRotation] = useState(0);

  // Функция для случайного вращения кнопки при наведении
  const handleMouseEnter = () => {
    setRotation(Math.floor(Math.random() * 360));
  };

  // Эффект для изменения позиции кнопки каждые 5 секунд
  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(Math.floor(Math.random() * 360));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Button
      variant="outline"
      size="icon"
      className="relative transition-all duration-300 text-foreground"
      style={{ transform: `rotate(${rotation}deg)` }}
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      onMouseEnter={handleMouseEnter}
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Переключить тему</span>
    </Button>
  );
}