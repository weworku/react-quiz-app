import React from 'react';
import { Card, Slide, Button, Stack, CardContent, Typography } from '@mui/material';

export default function AnimatedCard() {
  // TODO:表示制御ではなく、現在のカード番号を表示したい
  // TODO:現在のカード番号を持っておく必要あり
  const [activeIndex, setActiveIndex] = React.useState<number>(0);
  const [position, setPosition] = React.useState<'left' | 'right'>('left');

  const handleMove = (newIndex: number): void => {
    // 今表示中のカードと次に表示するカードは向きが逆になる
    setPosition(newIndex > activeIndex ? 'left' : 'right');
    setActiveIndex(newIndex);
  }
  const hasCurrentIndex = (index: number): boolean => {
    return activeIndex === index;
  }

  type CardData = {
    title: string;
    description: string;
  }
  // ダミーのJSONデータ
  const cards: CardData[] = [
    { title: 'Card 1', description: 'This is the first card.' },
    { title: 'Card 2', description: 'This is the second card.' },
    { title: 'Card 3', description: 'This is the third card.' }
  ];
  return (
    <div>
      <Stack direction="row" spacing={2}>
        <Button onClick={() => handleMove(Math.max(activeIndex - 1, 0))}>Back</Button>
        {/* TODO:direction, nextボタン押された時はright、backボタンが押された時はleftにしたい */}
        {cards.map((card, index) => (
          <Slide direction={hasCurrentIndex(index) ? position === 'left' ? 'right' : 'left' : position}
            in={hasCurrentIndex(index)} mountOnEnter unmountOnExit timeout={{ enter: 500, exit: 500 }}>
            <Card key={card.title} sx={{ width: 300, height: 300, padding: 2, margin: 2 }}>
              <CardContent>
                <Typography variant="h5">{card.title}</Typography>
                <Typography variant="body2">{card.description}</Typography>
              </CardContent>
            </Card>
          </Slide>
        ))}
        <Button onClick={() => handleMove(Math.min(activeIndex + 1, cards.length - 1))}>Next</Button>
      </Stack>
    </div >
  );
}
