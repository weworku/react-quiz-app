import { Container, Typography, Card, CardContent, Button, Slide } from '@mui/material';
import { useState } from 'react';

// Cardコンポーネントを重ねて表示する実験
const OverlayContent = () => {
  const [zIndex, setReverseZindex] = useState<number>(0);
  const [card1Visible, serCard1Visible] = useState<boolean>(true);
  const [card2Visible, serCard2Visible] = useState<boolean>(true);
  const handleChange = (target: number) => {
    if (target === 0) {
      serCard1Visible(!card1Visible);
    } else {
      serCard2Visible(!card2Visible);
    }
  }

  return (
    <>
      <Button onClick={() => setReverseZindex(zIndex === 0 ? 1 : 0)}>Change Z-Index</Button>
      <Button onClick={() => handleChange(0)}>Change Card1 Visible</Button>
      <Button onClick={() => handleChange(1)}>Change Card2 Visible</Button>
      <Container maxWidth="sm" style={{ position: 'relative', height: '400px', justifyContent: 'center', alignItems: 'center' }}>
        <Slide direction='right' in={card1Visible} mountOnEnter unmountOnExit>
          <Card
            sx={{
              width: 300,
              height: 300,
              padding: 2,
              margin: 2,
              'background-color': 'lightblue',
              position: 'absolute',
              top: 0,
              left: 0,
              'z-Index': zIndex,
              transform: 'translate(-50%, 0%)',
            }} >
            <CardContent>
              <Typography variant="h5">Card 1</Typography>
              <Typography variant="body2">Ditails Card 1</Typography>
            </CardContent>
          </Card>
        </Slide>
        <Slide direction='right' in={card2Visible} mountOnEnter unmountOnExit>
          <Card
            sx={{
              width: 350,
              height: 350,
              padding: 2,
              margin: 2,
              'background-color': 'lightgreen',
              position: 'absolute',
              top: 0,
              left: 0,
              'z-index': zIndex === 0 ? 1 : 0,
              transform: 'translate(-50%, 0%)',
            }} >
            <CardContent>
              <Typography variant="h5">Card 2</Typography>
              <Typography variant="body2">Ditails Card 2</Typography>
            </CardContent>
          </Card>
        </Slide>
      </Container >
    </>
  );
};

export default OverlayContent;
