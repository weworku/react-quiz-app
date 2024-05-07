import { Container, Typography, Card, CardContent, Button, Slide, Stack } from '@mui/material';
import { useState } from 'react';

// Cardコンポーネントを重ねて表示する実験
const OverlayContent = () => {
  const [zIndex, setReverseZindex] = useState<number>(0);
  const [cardVisible, serCardVisible] = useState<boolean>(true);
  const handleChange = () => {
    serCardVisible(!cardVisible);
  }

  return (
    <>
      <Stack direction="row" spacing={0}>
        <Button onClick={() => setReverseZindex(zIndex === 0 ? 1 : 0)}>Change Z-Index</Button>

        <Container
          style={{
            padding: 0,
          }}
          sx={{
            position: 'relative',
            width: 332,
            height: 332,
          }}>
          {/* position: 'absolute'のカードはスペースを詰めらるため、ダミーのカードを配置 */}
          <Card
            sx={{
              width: 300,
              height: 300,
              margin: 2,
              'background-color': '#242424', //#242424
              'z-Index': '-1',
            }} />
          {/* 以下がスライドさせるカード */}
          <Slide direction='right' in={cardVisible} mountOnEnter unmountOnExit timeout={{ enter: 500, exit: 500 }}>
            <Card
              sx={{
                width: 300,
                height: 300,
                margin: 2,
                'background-color': 'lightblue',
                position: 'absolute',
                top: 0,
                left: 0,
                'z-Index': zIndex,
              }} >
              <CardContent>
                <Typography variant="h5">Card 1</Typography>
                <Typography variant="body2">Ditails Card 1</Typography>
              </CardContent>
            </Card>
          </Slide>
          <Slide direction='left' in={!cardVisible} mountOnEnter unmountOnExit timeout={{ enter: 500, exit: 500 }}>
            <Card
              sx={{
                width: 300,
                height: 300,
                // padding: 2,
                margin: 2,
                'background-color': 'lightgreen',
                position: 'absolute',
                top: 0,
                left: 0,
                'z-index': zIndex === 0 ? 1 : 0,
              }} >
              <CardContent>
                <Typography variant="h5">Card 2</Typography>
                <Typography variant="body2">Ditails Card 2</Typography>
              </CardContent>
            </Card>
          </Slide>
        </Container >
        <Button onClick={handleChange}>Change Card Visible</Button>
      </Stack >
    </>
  );
};

export default OverlayContent;
