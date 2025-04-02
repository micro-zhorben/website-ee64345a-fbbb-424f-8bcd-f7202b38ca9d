import { Typography } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Heart, Coffee, Star, Award, Smile } from "lucide-react";

export function SillyFooter() {
  const [clickCount, setClickCount] = useState(0);
  const [showSecret, setShowSecret] = useState(false);
  const [footerHeight, setFooterHeight] = useState("auto");
  
  // Функция для обработки клика на "секретную" кнопку
  const handleSecretClick = () => {
    setClickCount(prev => prev + 1);
    
    if (clickCount >= 4) {
      setShowSecret(true);
      setTimeout(() => {
        setShowSecret(false);
        setClickCount(0);
      }, 3000);
    }
  };
  
  // Функция для изменения высоты футера при наведении
  const handleMouseEnter = () => {
    const heights = ["auto", "150px", "100px", "200px"];
    setFooterHeight(heights[Math.floor(Math.random() * heights.length)]);
  };
  
  // Функция для восстановления высоты футера
  const handleMouseLeave = () => {
    setFooterHeight("auto");
  };

  return (
    <footer 
      className="mt-12 py-8 px-4 bg-card rounded-t-lg text-card-foreground transition-all duration-300"
      style={{ height: footerHeight }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="text-center md:text-left">
          <Typography.H3 className="mb-4 flex items-center justify-center md:justify-start gap-2">
            <Smile className="h-6 w-6 text-foreground" />
            Глупый Сайт
          </Typography.H3>
          <Typography.P>
            Самый бессмысленный сайт, который вы когда-либо видели. Мы гордимся нашей бесполезностью!
          </Typography.P>
        </div>
        
        <div className="text-center">
          <Typography.H4 className="mb-4">Глупые ссылки</Typography.H4>
          <div className="flex flex-col gap-2">
            <Button variant="link" className="text-foreground" onClick={() => alert("Эта ссылка никуда не ведет!")}>
              Никуда
            </Button>
            <Button variant="link" className="text-foreground" onClick={() => alert("И эта тоже!")}>
              В пустоту
            </Button>
            <Button variant="link" className="text-foreground" onClick={() => alert("Вы действительно думали, что это сработает?")}>
              В бездну
            </Button>
          </div>
        </div>
        
        <div className="text-center md:text-right">
          <Typography.H4 className="mb-4 flex items-center justify-center md:justify-end gap-2">
            <Award className="h-6 w-6 text-foreground" />
            Наши достижения
          </Typography.H4>
          <Typography.P>
            • Самый бесполезный сайт 2023 года<br />
            • Премия "Зря потраченное время"<br />
            • Орден Цифровой Бессмыслицы
          </Typography.P>
          
          <div className="mt-4">
            <Button 
              variant="ghost" 
              size="sm"
              className="text-foreground"
              onClick={handleSecretClick}
            >
              <Coffee className="h-4 w-4 text-foreground mr-2" />
              {clickCount === 0 && "Нажми меня"}
              {clickCount === 1 && "Еще раз"}
              {clickCount === 2 && "Продолжай"}
              {clickCount === 3 && "Почти..."}
              {clickCount === 4 && "Готово!"}
            </Button>
          </div>
        </div>
      </div>
      
      {showSecret && (
        <div className="mt-8 p-4 bg-accent text-accent-foreground rounded-lg animate-bounce text-center">
          <Typography.H3 className="flex items-center justify-center gap-2">
            <Star className="h-6 w-6 text-accent-foreground" />
            Вы нашли секрет!
          </Typography.H3>
          <Typography.P>
            Но он такой же бессмысленный, как и весь сайт!
          </Typography.P>
        </div>
      )}
      
      <div className="mt-8 text-center border-t pt-4 border-border">
        <Typography.Small className="flex items-center justify-center gap-1">
          Сделано с 
          <Heart className="h-4 w-4 text-destructive" /> 
          и полным отсутствием здравого смысла
        </Typography.Small>
      </div>
    </footer>
  );
}