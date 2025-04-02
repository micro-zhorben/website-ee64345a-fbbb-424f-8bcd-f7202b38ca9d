import { Typography } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { SillyCard } from "@/components/silly-card";
import { useState, useEffect } from "react";
import { Smile, Frown, ArrowRight, ArrowLeft } from "lucide-react";

export function SillyPage() {
  const [pageTitle, setPageTitle] = useState("Страница глупостей");
  const [titleSize, setTitleSize] = useState(4);
  const [showContent, setShowContent] = useState(true);
  const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0 });
  const [funFacts, setFunFacts] = useState([
    "Коровы не могут спускаться по лестнице",
    "Утки-селезни не крякают",
    "Жирафы могут чистить уши языком",
    "Ленивцы могут поворачивать голову на 270 градусов",
    "Бананы растут вверх ногами"
  ]);

  // Эффект для изменения размера заголовка каждые 2 секунды
  useEffect(() => {
    const interval = setInterval(() => {
      setTitleSize(2 + Math.floor(Math.random() * 6));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // Функция для перемешивания фактов
  const shuffleFacts = () => {
    setFunFacts([...funFacts].sort(() => Math.random() - 0.5));
  };

  // Функция для изменения заголовка при наведении
  const handleTitleHover = () => {
    const sillyTitles = [
      "Страница бессмыслицы",
      "Коллекция ерунды",
      "Хранилище глупостей",
      "Портал в никуда",
      "Музей абсурда"
    ];
    
    setPageTitle(sillyTitles[Math.floor(Math.random() * sillyTitles.length)]);
  };

  // Функция для "убегающей" кнопки
  const handleButtonMouseEnter = () => {
    setButtonPosition({
      x: Math.floor(Math.random() * 300) - 150,
      y: Math.floor(Math.random() * 200) - 100
    });
  };

  return (
    <div className="space-y-12">
      <div className="text-center mb-12">
        <Typography.H1 
          className="transition-all duration-300"
          style={{ fontSize: `${titleSize}rem` }}
          onMouseEnter={handleTitleHover}
        >
          {pageTitle}
        </Typography.H1>
        
        <Typography.Lead className="mt-4">
          Добро пожаловать на страницу, которая существует только для того, чтобы вас запутать!
        </Typography.Lead>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-card p-6 rounded-lg text-card-foreground">
          <Typography.H3 className="mb-4 flex items-center gap-2">
            <Smile className="h-6 w-6 text-foreground" />
            Бесполезные факты
          </Typography.H3>
          
          <Button 
            className="mb-4 text-primary-foreground"
            onClick={shuffleFacts}
          >
            Перемешать факты
            <ArrowRight className="ml-2 h-5 w-5 text-primary-foreground" />
          </Button>
          
          <Typography.List>
            {funFacts.map((fact, index) => (
              <li key={index} className="animate-pulse" style={{ animationDelay: `${index * 0.2}s` }}>
                {fact}
              </li>
            ))}
          </Typography.List>
        </div>
        
        <div className="bg-card p-6 rounded-lg text-card-foreground">
          <Typography.H3 className="mb-4 flex items-center gap-2">
            <Frown className="h-6 w-6 text-foreground" />
            Интерактивная глупость
          </Typography.H3>
          
          <div className="flex justify-between mb-6">
            <Button 
              variant="outline" 
              className="text-foreground"
              onClick={() => setShowContent(!showContent)}
            >
              {showContent ? "Скрыть контент" : "Показать контент"}
              {showContent ? 
                <ArrowLeft className="ml-2 h-5 w-5 text-foreground" /> : 
                <ArrowRight className="ml-2 h-5 w-5 text-foreground" />
              }
            </Button>
            
            <div className="relative h-10">
              <Button 
                className="absolute transition-all duration-300 text-primary-foreground"
                style={{ 
                  transform: `translate(${buttonPosition.x}px, ${buttonPosition.y}px)` 
                }}
                onMouseEnter={handleButtonMouseEnter}
              >
                Попробуй нажать
              </Button>
            </div>
          </div>
          
          {showContent ? (
            <div className="space-y-4">
              <Typography.P>
                Этот контент появляется и исчезает по вашему желанию. Удивительно, правда?
              </Typography.P>
              
              <Typography.P>
                Вы когда-нибудь задумывались, сколько времени вы тратите на просмотр бессмысленных веб-страниц?
                Что ж, теперь вы можете добавить эту страницу в свой список!
              </Typography.P>
            </div>
          ) : (
            <Typography.P className="italic text-center">
              Контент скрыт. Нажмите кнопку, чтобы увидеть больше бессмыслицы!
            </Typography.P>
          )}
        </div>
      </div>
      
      <SillyCard 
        title="Специальная глупая карточка" 
        content="Эта карточка специально создана для страницы глупостей. Она ещё глупее обычных карточек!"
        footer="Нажми для получения дополнительной глупости!"
        image="https://picsum.photos/300/200?random=4"
      />
    </div>
  );
}