
import { CardData } from '../../type';
import { Card, Slide, Button, Stack, CardContent, Typography, Container, Box, RadioGroup, FormControlLabel, Radio } from '@mui/material';

type Props = {
  cards: CardData[],
  position: 'left' | 'right',
  setPosition: React.Dispatch<React.SetStateAction<'left' | 'right'>>,
  activeIndex: number,
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>,
  skipped: Set<number>,
  setSkipped: React.Dispatch<React.SetStateAction<Set<number>>>,
}

export default function AnimatedCard({ cards, position, setPosition, activeIndex, setActiveIndex, skipped, setSkipped }: Props) {
  const handleMove = (newIndex: number): void => {
    // 今表示中のカードと次に表示するカードは向きが逆になる
    setPosition(newIndex < activeIndex ? 'right' : 'left');
    setActiveIndex(newIndex);

    let newSkipped = skipped;
    newSkipped = new Set(newSkipped.values());
    newSkipped.delete(activeIndex);
    setSkipped(newSkipped);
  }
  const reversePosition = (position: 'left' | 'right'): 'left' | 'right' => {
    if (position === 'left') {
      return 'right';
    } else {
      return 'left';
    }
  }
  // ** 今表示中のカードかどうかを判定する関数
  // activeではなくなったカードはfalseに更新されスライドアウトする
  // @param index - カードのインデックス
  const hasCurrentIndex = (index: number): boolean => {
    return activeIndex === index;
  }

  const handleSkip = () => {
    // Skipボタン押されたら次の問題へ
    setActiveIndex((prevActiveIndex) => prevActiveIndex + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeIndex); // 現在のIndexをスキップリストに追加
      return newSkipped;
    });
  };

  const handleFinish = () => {
    // TODO: 終了処理
  }

  return (
    <Box >
      <Stack direction="row" justifyContent="center" alignItems="center" spacing={2}>
        <Button
          onClick={() => handleMove(Math.max(activeIndex - 1, 0))}
          disabled={activeIndex === 0} // 1枚目のカードの時は戻るボタンを無効にする
        >
          Back
        </Button>
        <Container style={{ padding: 0, margin: 0, }}
          sx={{ position: 'relative', width: '50%', height: 450, overflow: 'hidden', }}>
          {/* position: 'absolute'のカードはスペースを詰めらるため、ダミーのカードを配置 */}
          <Card
            sx={{
              width: '100%', height: '90%',
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
                  width: '100%', height: '90%',
                  'background-color': card.color,
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  overflowY: 'auto',
                  'z-Index': 'auto',
                }} >
                <CardContent>
                  <Typography component="h3" variant="h5" mb={1}>{card.title}</Typography>
                  <Typography variant="body1" mb={1.5}>{card.description}</Typography>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    name="radio-buttons-group"
                  >
                    <FormControlLabel value='ア' control={<Radio />} label={card.answers[0].answer_sentence} />
                    <FormControlLabel value='イ' control={<Radio />} label={card.answers[1].answer_sentence} />
                    <FormControlLabel value='ウ' control={<Radio />} label={card.answers[2].answer_sentence} />
                    <FormControlLabel value='エ' control={<Radio />} label={card.answers[3].answer_sentence} />
                  </RadioGroup>
                </CardContent>
              </Card>
            </Slide>
          ))}
        </Container >
        <Stack spacing={2} >
          {activeIndex === cards.length - 1 ? (
            <Button onClick={handleFinish}
              style={{ margin: 0 }}>
              Finish
            </Button>
          ) : (
            <>
              <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }} >
                Skip
              </Button>
              <Button onClick={() => handleMove(Math.min(activeIndex + 1, cards.length - 1))}
                style={{ margin: 0 }}>
                Next
              </Button>
            </>
          )}
        </Stack>
      </Stack >
    </Box >
  );
}
