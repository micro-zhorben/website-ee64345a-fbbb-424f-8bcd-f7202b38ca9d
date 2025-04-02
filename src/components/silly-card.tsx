import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Typography } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Heart, ThumbsUp, ThumbsDown, Star, AlertTriangle } from "lucide-react";

interface SillyCardProps {
  title?: string;
  content?: string;
  footer?: string;
  image?: string;
}

export function SillyCard({ 
  title = "Очень глупая карточка", 
  content = "Эта карточка не имеет никакого смысла, но она очень старается быть забавной!",
  footer = "Нажми на кнопку, если осмелишься!",
  image = "https://picsum.photos/300/200"
}: SillyCardProps) {
  const [rotation, setRotation] = useState(0);
  const [scale, setScale] = useState(1);
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [showWarning, setShowWarning] = useState(false);
  const [cardTitle, setCardTitle] = useState(title);
  const [cardContent, setCardContent] = useState(content);

  // Эффект для случайного вращения и масштабирования карточки
  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(Math.floor(Math.random() * 10) - 5);
      setScale(0.95 + Math.random() * 0.1);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Функция для обработки нажатия на кнопку
  const handleClick = () => {
    const sillyTitles = [
      "Ой, что это было?",
      "Зачем ты нажал?",
      "Я же просил не нажимать!",
      "Теперь ты попал в ловушку!",
      "Поздравляю! Ты выиграл ничего!"
    ];
    
    const sillyContents = [
      "Теперь эта карточка будет преследовать тебя в кошмарах!",
      "Ты только что активировал секретный протокол глупости!",
      "Продолжай нажимать, может быть, что-то произойдет... или нет!",
      "Эта карточка теперь считает тебя своим лучшим другом!",
      "Внимание! Уровень бессмыслицы повышается!"
    ];
    
    setCardTitle(sillyTitles[Math.floor(Math.random() * sillyTitles.length)]);
    setCardContent(sillyContents[Math.floor(Math.random() * sillyContents.length)]);
    setShowWarning(true);
    
    setTimeout(() => {
      setShowWarning(false);
    }, 2000);
  };

  return (
    <Card 
      className="w-full max-w-md overflow-hidden transition-all duration-300"
      style={{ 
        transform: `rotate(${rotation}deg) scale(${scale})`,
      }}
    >
      <CardHeader className="relative">
        <img 
          src={image} 
          alt="Случайное изображение"
          className="w-full h-40 object-cover mb-2 rounded-t-md"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "https://picsum.photos/300/200?random=" + Math.random();
          }}
        />
        {showWarning && (
          <div className="absolute top-2 right-2 bg-destructive text-destructive-foreground p-2 rounded-md animate-bounce flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-destructive-foreground" />
            <span>Предупреждал же!</span>
          </div>
        )}
        <CardTitle className="text-xl font-bold">{cardTitle}</CardTitle>
      </CardHeader>
      <CardContent>
        <Typography.P>{cardContent}</Typography.P>
        
        <div className="flex justify-center gap-4 my-4">
          <Button 
            variant="outline" 
            className="text-foreground"
            onClick={() => setLikes(likes + Math.floor(Math.random() * 10) + 1)}
          >
            <ThumbsUp className="mr-2 h-4 w-4 text-foreground" />
            {likes}
          </Button>
          <Button 
            variant="outline"
            className="text-foreground"
            onClick={() => setDislikes(dislikes + Math.floor(Math.random() * 10) + 1)}
          >
            <ThumbsDown className="mr-2 h-4 w-4 text-foreground" />
            {dislikes}
          </Button>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Typography.Small>{footer}</Typography.Small>
        <Button 
          variant="destructive"
          onClick={handleClick}
          className="group"
        >
          <span className="group-hover:hidden">Нажми меня</span>
          <span className="hidden group-hover:inline">Не нажимай!</span>
          <Heart className="ml-2 h-4 w-4 text-destructive-foreground" />
        </Button>
      </CardFooter>
    </Card>
  );
}