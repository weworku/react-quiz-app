import { useState } from 'react';
import { Card, Slide, Button, Stack, CardContent, Typography, Container, Box } from '@mui/material';

export default function AnimatedCard() {
  // TODO:表示制御ではなく、現在のカード番号を表示したい
  // TODO:現在のカード番号を持っておく必要あり
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [position, setPosition] = useState<'left' | 'right'>('right');

  const handleMove = (newIndex: number): void => {
    // 今表示中のカードと次に表示するカードは向きが逆になる
    setPosition(newIndex < activeIndex ? 'right' : 'left');
    setActiveIndex(newIndex);
  }
  const reversePosition = (position: 'left' | 'right'): 'left' | 'right' => {
    if (position === 'left') {
      return 'right';
    } else {
      return 'left';
    }
  }
  const hasCurrentIndex = (index: number): boolean => {
    return activeIndex === index;
  }
  type CardData = {
    title: string;
    description: string;
    color: string;
  }
  // ダミーのJSONデータ
  const cards: CardData[] = [
    { title: 'Card 1', description: 'This is the first card.', color: 'lightblue' },
    { title: 'Card 2', description: 'This is the second card.', color: 'lightgreen' },
    { title: 'Card 3', description: 'This is the third card.', color: 'lightcoral' }
  ];

  return (
    <Box >
      <Stack direction="row" justifyContent="center" alignItems="center" spacing={2}>
        <Button onClick={() => handleMove(Math.max(activeIndex - 1, 0))}>Back</Button>
        {/* <Button onClick={() => setReverseZindex(zIndex === 0 ? 1 : 0)}>Change Z-Index</Button> */}
        {/* TODO:direction, nextボタン押された時はright、backボタンが押された時はleftにしたい */}
        <Container style={{ padding: 0, margin: 0, }}
          sx={{ position: 'relative', width: '50%', height: 332, overflow: 'hidden', }}>
          {/* position: 'absolute'のカードはスペースを詰めらるため、ダミーのカードを配置 */}
          <Card
            sx={{
              width: '100%', height: 300,
              'background-color': '#242424', //#242424
              'z-Index': '-1',
            }} />
          {/* 以下がスライドさせるカード */}
          {cards.map((card, index) => (
            <Slide direction={index === activeIndex ? position : reversePosition(position)}
              in={hasCurrentIndex(index)} mountOnEnter unmountOnExit timeout={{ enter: 500, exit: 500 }}>
              <Card
                key={index}
                sx={{
                  width: '100%', height: 300,
                  'background-color': card.color,
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  'z-Index': 'auto',
                }} >
                <CardContent>
                  <Typography variant="h5">{card.title}</Typography>
                  <Typography variant="body2">{card.description}</Typography>
                </CardContent>
              </Card>
            </Slide>
          ))}
        </Container >
        <Button onClick={() => handleMove(Math.min(activeIndex + 1, cards.length - 1))}
          style={{ margin: 0 }}>Next</Button>

        {/* <Button onClick={handleChange}>Change Card Visible</Button> */}
      </Stack >
    </Box >
  );
}
