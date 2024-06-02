import { useState } from 'react';
import { CardData } from '../../type';
import { Card, Slide, Button, Stack, CardContent, Typography, Container, Box, RadioGroup, FormControlLabel, Radio } from '@mui/material';

export default function AnimatedCard({ cards }: { cards: CardData[] }) {
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

  return (
    <Box >
      <Stack direction="row" justifyContent="center" alignItems="center" spacing={2}>
        <Button onClick={() => handleMove(Math.max(activeIndex - 1, 0))}>Back</Button>
        <Container style={{ padding: 0, margin: 0, }}
          sx={{ position: 'relative', width: '50%', height: 332, overflow: 'hidden', }}>
          {/* position: 'absolute'のカードはスペースを詰めらるため、ダミーのカードを配置 */}
          <Card
            sx={{
              width: '100%', height: 300,
              'background-color': 'white',
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
                  <Typography component="h3" variant="h5" mb={1}>{card.title}</Typography>
                  <Typography variant="body1" mb={1.5}>{card.description}</Typography>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    name="radio-buttons-group"
                  >
                    <FormControlLabel value='ア' control={<Radio />} label={card.answer1} />
                    <FormControlLabel value='イ' control={<Radio />} label={card.answer2} />
                    <FormControlLabel value='ウ' control={<Radio />} label={card.answer3} />
                    <FormControlLabel value='エ' control={<Radio />} label={card.answer4} />
                  </RadioGroup>
                </CardContent>
              </Card>
            </Slide>
          ))}
        </Container >
        <Button onClick={() => handleMove(Math.min(activeIndex + 1, cards.length - 1))}
          style={{ margin: 0 }}>Next</Button>
      </Stack >
    </Box >
  );
}
