import { Typography } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { Star, ArrowRight, Heart, Smile, AlertTriangle } from "lucide-react";

export function NonsensePage() {
  const [nonsenseText, setNonsenseText] = useState("");
  const [generatedNonsense, setGeneratedNonsense] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [pageStyle, setPageStyle] = useState({});
  const [nonsenseLevel, setNonsenseLevel] = useState(0);

  // Массивы для генерации бессмыслицы
  const nonsenseWords = [
    "бубликус", "хрюмзик", "шлепотень", "пыхтелка", "бормоталка",
    "хихикунчик", "пузырьки", "трямзик", "хрустяшка", "мурлыка",
    "пушистик", "хрюндель", "брызгалка", "пыхтелка", "шуршунчик"
  ];
  
  const nonsenseAdjectives = [
    "мяукающий", "пушистый", "скрипучий", "пузатый", "шлепающий",
    "прыгучий", "блестящий", "хрустящий", "булькающий", "сверкающий",
    "мигающий", "шуршащий", "звенящий", "пыхтящий", "хихикающий"
  ];

  // Эффект для случайного изменения стилей страницы
  useEffect(() => {
    const interval = setInterval(() => {
      setPageStyle({
        transform: `rotate(${Math.random() * 2 - 1}deg)`,
        background: nonsenseLevel > 5 ? `hsl(${Math.random() * 360}, 70%, 90%)` : '',
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [nonsenseLevel]);

  // Функция для генерации бессмыслицы
  const generateNonsense = () => {
    if (buttonDisabled) return;
    
    const userInput = nonsenseText || "бубликус";
    let result = `${nonsenseAdjectives[Math.floor(Math.random() * nonsenseAdjectives.length)]} ${userInput} `;
    
    // Добавляем случайное количество бессмысленных слов
    const wordCount = 3 + Math.floor(Math.random() * 10);
    for (let i = 0; i < wordCount; i++) {
      result += nonsenseWords[Math.floor(Math.random() * nonsenseWords.length)] + " ";
      if (i % 3 === 2) result += ". ";
    }
    
    setGeneratedNonsense(result);
    setNonsenseLevel(nonsenseLevel + 1);
    
    // Делаем кнопку недоступной на 5 секунд
    setButtonDisabled(true);
    setCountdown(5);
    
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setButtonDisabled(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Функция для сброса уровня бессмыслицы
  const resetNonsense = () => {
    setNonsenseLevel(0);
    setGeneratedNonsense("");
    setNonsenseText("");
  };

  return (
    <div className="space-y-12 transition-all duration-500" style={pageStyle}>
      <div className="text-center mb-8">
        <Typography.H1 className="mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Генератор бессмыслицы
        </Typography.H1>
        
        <Typography.Lead>
          Добро пожаловать в мир абсолютной бессмыслицы! Здесь вы можете создавать тексты, которые не имеют никакого смысла.
        </Typography.Lead>
      </div>
      
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-6 w-6 text-foreground" />
            Создайте свою бессмыслицу
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Typography.P>
              Введите любое слово, и мы превратим его в полную бессмыслицу:
            </Typography.P>
            
            <Input 
              placeholder="Введите слово..." 
              value={nonsenseText}
              onChange={(e) => setNonsenseText(e.target.value)}
              className="w-full"
            />
          </div>
          
          <div className="flex justify-between">
            <Button 
              onClick={generateNonsense}
              disabled={buttonDisabled}
              className="text-primary-foreground"
            >
              {buttonDisabled ? `Подождите ${countdown} сек.` : "Сгенерировать бессмыслицу"}
              <ArrowRight className="ml-2 h-5 w-5 text-primary-foreground" />
            </Button>
            
            <Button 
              variant="outline" 
              onClick={resetNonsense}
              className="text-foreground"
            >
              Сбросить
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-start">
          {generatedNonsense && (
            <div className="w-full">
              <Typography.H4 className="mb-2">Ваша бессмыслица:</Typography.H4>
              <div className="p-4 bg-muted rounded-md">
                <Typography.P>{generatedNonsense}</Typography.P>
              </div>
            </div>
          )}
        </CardFooter>
      </Card>
      
      {nonsenseLevel > 3 && (
        <div className="text-center p-4 bg-card rounded-lg text-card-foreground animate-pulse">
          <Typography.H3 className="flex items-center justify-center gap-2">
            <Smile className="h-6 w-6 text-foreground" />
            Уровень бессмыслицы: {nonsenseLevel}/10
          </Typography.H3>
          
          <Typography.P>
            Вы уже сгенерировали {nonsenseLevel} порций бессмыслицы! Продолжайте в том же духе!
          </Typography.P>
        </div>
      )}
      
      {nonsenseLevel > 7 && (
        <div className="p-4 bg-destructive text-destructive-foreground rounded-lg animate-bounce">
          <Typography.H3 className="flex items-center justify-center gap-2">
            <AlertTriangle className="h-6 w-6 text-destructive-foreground" />
            Предупреждение о высоком уровне бессмыслицы!
          </Typography.H3>
          
          <Typography.P>
            Ваш уровень бессмыслицы достиг критической отметки! Страница может начать вести себя непредсказуемо!
          </Typography.P>
          
          <div className="text-center mt-4">
            <Button 
              variant="outline" 
              onClick={resetNonsense}
              className="text-destructive-foreground"
            >
              Сбросить уровень бессмыслицы
              <Heart className="ml-2 h-5 w-5 text-destructive-foreground" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}