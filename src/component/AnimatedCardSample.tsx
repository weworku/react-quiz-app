import React from 'react';
import { Card, Slide, Button, Stack, CardContent, Typography } from '@mui/material';

export default function AnimatedCard() {
  // TODO:表示制御ではなく、現在のカード番号を表示したい
  // TODO:現在のカード番号を持っておく必要あり
  const [visible, setVisible] = React.useState<boolean>(true);

  const handleMove = (): void => {
    // 今表示中のカードと次に表示するカードは向きが逆になる
    setVisible(!visible);
  }

  type CardData = {
    title: string;
    description: string;
    color: string;
  }
  // ダミーのJSONデータ
  const cards: CardData[] = [
    { title: 'Card 1', description: 'This is the first card.', color: 'red' },
    { title: 'Card 2', description: 'This is the second card.', color: 'blue' },
    { title: 'Card 3', description: 'This is the third card.', color: 'green' }
  ];
  return (
    <div>
      <Stack direction="row" spacing={2}>
        <Button onClick={handleMove}>Back</Button>
        {/* TODO:direction, nextボタン押された時はright、backボタンが押された時はleftにしたい */}

        {/* Slideコンポーネント内にCardコンポーネントを３つ配置した場合の挙動確認 */}
        <Slide direction={'left'}
          in={visible} mountOnEnter unmountOnExit timeout={{ enter: 500, exit: 500 }}>
          <>
            {cards.map((card, index) => (
              <Card key={card.title} sx={{ minWidth: 300, height: 300, padding: 2, margin: 2, 'background-color': card.color }} >
                <CardContent>
                  <Typography variant="h5">{card.title}</Typography>
                  <Typography variant="body2">{card.description}</Typography>
                </CardContent>
              </Card>
            ))}
          </>
        </Slide>


        <Button onClick={handleMove}>Next</Button>
      </Stack >
    </div >
  );
}
