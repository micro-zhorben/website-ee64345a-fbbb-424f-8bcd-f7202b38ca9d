import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { Typography } from "@/components/ui/typography";
import { useState, useEffect } from "react";
import { Home, Smile, Star, Frown, Heart } from "lucide-react";

export function SillyNavbar() {
  const [bouncing, setBouncing] = useState(false);
  const [navItems, setNavItems] = useState([
    { path: "/", label: "Главная", icon: Home },
    { path: "/silly", label: "Глупости", icon: Smile },
    { path: "/nonsense", label: "Бессмыслица", icon: Star },
  ]);

  // Эффект для перемешивания пунктов меню каждые 10 секунд
  useEffect(() => {
    const interval = setInterval(() => {
      setNavItems((prev) => [...prev].sort(() => Math.random() - 0.5));
      setBouncing(true);
      setTimeout(() => setBouncing(false), 1000);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  // Функция для случайного изменения текста при наведении
  const handleMouseEnter = (index: number) => {
    const sillyTexts = ["Упс!", "Ой-ой!", "Хи-хи!", "Ха-ха!", "Вау!"];
    const randomText = sillyTexts[Math.floor(Math.random() * sillyTexts.length)];
    
    setNavItems((prev) => 
      prev.map((item, i) => 
        i === index ? { ...item, label: randomText } : item
      )
    );
  };

  // Функция для восстановления текста при уходе мыши
  const handleMouseLeave = (index: number, originalLabel: string) => {
    setNavItems((prev) => 
      prev.map((item, i) => 
        i === index ? { ...item, label: originalLabel } : item
      )
    );
  };

  const originalLabels = ["Главная", "Глупости", "Бессмыслица"];

  return (
    <nav className={`flex justify-between items-center p-4 bg-card rounded-lg mb-8 ${bouncing ? 'animate-bounce' : ''}`}>
      <div className="flex items-center gap-2">
        <Frown className="h-8 w-8 text-primary animate-spin" />
        <Typography.H2 className="text-primary font-bold">
          Глупый Сайт
        </Typography.H2>
      </div>
      
      <div className="flex items-center gap-4">
        {navItems.map((item, index) => (
          <Link 
            key={index} 
            to={item.path}
            className="text-foreground"
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={() => handleMouseLeave(index, originalLabels[index])}
          >
            <Button 
              variant="ghost" 
              className="text-foreground flex items-center gap-2 hover:animate-pulse"
            >
              <item.icon className="h-5 w-5 text-foreground" />
              {item.label}
            </Button>
          </Link>
        ))}
        <ModeToggle />
      </div>
    </nav>
  );
}