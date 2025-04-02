import { Typography } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { ArrowRight, Star, Heart, Smile, Frown } from "lucide-react";

export function SillyHero() {
  const [titleIndex, setTitleIndex] = useState(0);
  const [subtitleIndex, setSubtitleIndex] = useState(0);
  const [isWobbling, setIsWobbling] = useState(false);
  const [buttonText, setButtonText] = useState("Начать глупость");
  
  const titles = [
    "Самый глупый сайт в мире",
    "Абсолютно бессмысленный ресурс",
    "Сайт, который ничего не делает",
    "Коллекция цифровой ерунды",
    "Интернет-портал в никуда"
  ];
  
  const subtitles = [
    "Мы гордимся тем, что не имеем никакой ценности!",
    "Потратьте здесь своё время и ничего не получите взамен!",
    "Гарантированно бесполезно для всех возрастов!",
    "Наша миссия - заставить вас улыбнуться от абсурда!",
    "Добро пожаловать в царство цифровой бессмыслицы!"
  ];

  // Эффект для изменения заголовка каждые 5 секунд
  useEffect(() => {
    const interval = setInterval(() => {
      setTitleIndex((prev) => (prev + 1) % titles.length);
      setSubtitleIndex((prev) => (prev + 1) % subtitles.length);
      setIsWobbling(true);
      
      setTimeout(() => {
        setIsWobbling(false);
      }, 1000);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Функция для изменения текста кнопки при наведении
  const handleMouseEnter = () => {
    const sillyButtonTexts = [
      "Нет, не нажимай!",
      "Беги, пока можешь!",
      "Это ловушка!",
      "Ты уверен?",
      "Лучше уходи!"
    ];
    
    setButtonText(sillyButtonTexts[Math.floor(Math.random() * sillyButtonTexts.length)]);
  };

  // Функция для восстановления текста кнопки
  const handleMouseLeave = () => {
    setButtonText("Начать глупость");
  };

  return (
    <div className="relative flex flex-col items-center justify-center text-center py-20 px-4 overflow-hidden bg-background rounded-lg mb-12">
      {/* Плавающие иконки в фоне */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => {
          const icons = [Star, Heart, Smile, Frown];
          const Icon = icons[i % icons.length];
          const size = 20 + Math.random() * 30;
          const left = Math.random() * 100;
          const top = Math.random() * 100;
          const animationDuration = 10 + Math.random() * 20;
          
          return (
            <Icon
              key={i}
              className="absolute text-muted opacity-20"
              style={{
                left: `${left}%`,
                top: `${top}%`,
                width: size,
                height: size,
                animation: `float ${animationDuration}s infinite ease-in-out ${i}s`
              }}
            />
          );
        })}
      </div>
      
      <div 
        className={`max-w-3xl mx-auto transition-all duration-500 ${isWobbling ? 'animate-wiggle' : ''}`}
        style={{
          animation: isWobbling ? 'wiggle 0.5s ease-in-out' : 'none'
        }}
      >
        <Typography.H1 className="text-4xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          {titles[titleIndex]}
        </Typography.H1>
        
        <Typography.Lead className="mb-8 text-xl md:text-2xl">
          {subtitles[subtitleIndex]}
        </Typography.Lead>
        
        <Button 
          size="lg"
          className="text-primary-foreground animate-pulse hover:animate-none group relative overflow-hidden"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={() => alert("Поздравляем! Вы официально потратили своё время на ничто!")}
        >
          {buttonText}
          <ArrowRight className="ml-2 h-5 w-5 text-primary-foreground group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
      
      {/* Добавляем немного CSS-анимации */}
      <style jsx>{`
        @keyframes wiggle {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-5deg); }
          75% { transform: rotate(5deg); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
      `}</style>
    </div>
  );
}