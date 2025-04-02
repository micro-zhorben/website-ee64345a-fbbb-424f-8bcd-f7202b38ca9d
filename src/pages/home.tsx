import { SillyHero } from "@/components/silly-hero";
import { SillyCard } from "@/components/silly-card";
import { Typography } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { ArrowRight, Smile, Frown, Star } from "lucide-react";

export function Home() {
  const [cardsVisible, setCardsVisible] = useState(false);
  const [buttonText, setButtonText] = useState("Показать карточки");
  const [buttonRotation, setButtonRotation] = useState(0);

  // Эффект для вращения кнопки каждые 3 секунды
  useEffect(() => {
    const interval = setInterval(() => {
      setButtonRotation(Math.floor(Math.random() * 20) - 10);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Функция для переключения видимости карточек
  const toggleCards = () => {
    setCardsVisible(!cardsVisible);
    setButtonText(cardsVisible ? "Показать карточки" : "Спрятать карточки");
  };

  return (
    <div className="space-y-12">
      <SillyHero />
      
      <div className="text-center">
        <Button 
          size="lg" 
          className="text-primary-foreground"
          onClick={toggleCards}
          style={{ transform: `rotate(${buttonRotation}deg)` }}
        >
          {buttonText}
          <ArrowRight className="ml-2 h-5 w-5 text-primary-foreground" />
        </Button>
      </div>
      
      {cardsVisible && (
        <div>
          <Typography.H2 className="text-center mb-8 animate-pulse">
            Коллекция бессмысленных карточек
          </Typography.H2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <SillyCard 
              title="Карточка абсурда" 
              content="Эта карточка содержит абсолютно бессмысленную информацию, которая никак не поможет вам в жизни."
              footer="Нажми, если не боишься!"
              image="https://picsum.photos/300/200?random=1"
            />
            
            <SillyCard 
              title="Карточка глупости" 
              content="Если ты читаешь это, значит ты тратишь своё время на чтение бессмысленного текста. Поздравляем!"
              footer="Эта кнопка ничего не делает!"
              image="https://picsum.photos/300/200?random=2"
            />
            
            <SillyCard 
              title="Карточка ерунды" 
              content="Знаете ли вы, что эта карточка была создана исключительно для того, чтобы занять место на странице?"
              footer="Нажми для получения ничего!"
              image="https://picsum.photos/300/200?random=3"
            />
          </div>
        </div>
      )}
      
      <div className="bg-card p-8 rounded-lg text-card-foreground">
        <Typography.H3 className="mb-4 flex items-center gap-2">
          <Star className="h-6 w-6 text-foreground" />
          Почему наш сайт самый глупый?
        </Typography.H3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <Typography.H4 className="mb-2 flex items-center gap-2">
              <Smile className="h-5 w-5 text-foreground" />
              Преимущества:
            </Typography.H4>
            <Typography.List>
              <li>Абсолютно бесполезная информация</li>
              <li>Случайно перемещающиеся элементы</li>
              <li>Кнопки, которые делают странные вещи</li>
              <li>Непредсказуемое поведение интерфейса</li>
              <li>Яркие кричащие цвета, которые не сочетаются</li>
            </Typography.List>
          </div>
          
          <div>
            <Typography.H4 className="mb-2 flex items-center gap-2">
              <Frown className="h-5 w-5 text-foreground" />
              Недостатки:
            </Typography.H4>
            <Typography.List>
              <li>Всё то же самое, что и в преимуществах</li>
              <li>Сайт не несёт никакой полезной информации</li>
              <li>Вы тратите своё время впустую</li>
              <li>Возможно, вы потеряете несколько IQ-пунктов</li>
              <li>Ваши друзья будут смеяться над вами</li>
            </Typography.List>
          </div>
        </div>
      </div>
    </div>
  );
}