
import { CardData, QuizResult } from '../../type';
import { Card, Slide, Button, Stack, CardContent, Typography, Container, Box, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';
import ClearIcon from '@mui/icons-material/Clear';
import React from 'react';

type Props = {
  cards: CardData[],
  setCards: React.Dispatch<React.SetStateAction<CardData[]>>,
  position: 'left' | 'right',
  setPosition: React.Dispatch<React.SetStateAction<'left' | 'right'>>,
  activeIndex: number,
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>,
  skipped: Set<number>,
  setSkipped: React.Dispatch<React.SetStateAction<Set<number>>>,
  setFifnished: React.Dispatch<React.SetStateAction<boolean>>,
  setQuizResult: React.Dispatch<React.SetStateAction<QuizResult>>,
  explainMode: boolean,
}

export default function AnimatedCard(
  { cards, setCards, position, setPosition, activeIndex, setActiveIndex,
    skipped, setSkipped, setFifnished, setQuizResult, explainMode = false }: Props) {
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

  const handleCorrectAnswerChenge = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    cards[index].userCorrectAnswer = event.target.value;
    setCards([...cards]);
  }

  const handleFinish = () => {
    // TODO: 終了処理
    // 採点とか
    let correctAnswerCount = 0;
    cards.forEach((card) => {
      if (card.correctAnswer === card.userCorrectAnswer) {
        correctAnswerCount++;
      }
    });
    setQuizResult({ correctAnswerCount });
    setActiveIndex(0);
    // 終了状態にする
    setFifnished(true);
  }

  return (
    <Box>
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
              backgroundColor: 'white',
              zIndex: '-1',
            }} />
          {/* 以下がスライドさせるカード */}
          {cards.map((card, index) => (
            <Slide key={index} direction={index === activeIndex ? position : reversePosition(position)}
              in={hasCurrentIndex(index)} mountOnEnter unmountOnExit timeout={{ enter: 500, exit: 500 }}>
              <Card
                key={index}
                sx={{
                  width: '100%', height: '90%',
                  backgroundColor: 'lightblue',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  overflowY: 'auto',
                  zIndex: 'auto',
                }} >
                <CardContent>
                  <Typography component="h3" variant="h5" mb={1}>{card.title}</Typography>
                  <Typography variant="body1" mb={1.5}>
                    {card.description.split('\n').map((line, index) => (
                      <React.Fragment key={index}>
                        {/* 半角スペースが詰められないようにするための対策 */}
                        {line.split(' ').map((word, wordIndex) => (
                          <React.Fragment key={wordIndex}>
                            {wordIndex > 0 && ' '}
                            {word || '\u00A0'}
                          </React.Fragment>
                        ))}
                        {index < card.description.split('\n').length - 1 && <br />}
                      </React.Fragment>
                    ))}</Typography>
                  {card.imageUrl && (
                    <Stack direction="row" justifyContent={'center'} alignContent={'center'}>
                      <Box
                        component="img"
                        sx={{
                          height: '100%',
                          width: '100%',
                          maxHeight: { xs: 300, md: 300 },
                          maxWidth: { xs: '90%', md: '90%' },
                          objectFit: 'contain',
                          mb: 2,
                        }}
                        alt="question attatched image"
                        src={card.imageUrl}
                      /></Stack>)}
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    name="radio-buttons-group"
                  >
                    {['ア', 'イ', 'ウ', 'エ'].map((value, i) => (
                      <FormControlLabel key={i} value={value} control={<Radio />}
                        sx={{ mb: 1 }}
                        label={
                          card.answers[i].answer_image_url
                            ? <>
                              {value}<img src={card.answers[i].answer_image_url} alt="answer" style={{ width: '100%', height: '100px' }} />
                            </>
                            : card.answers[i].answer_sentence
                        }
                        onChange={(e) => handleCorrectAnswerChenge(e as React.ChangeEvent<HTMLInputElement>, index)}
                        checked={card.userCorrectAnswer === value} disabled={explainMode} />))
                    }
                  </RadioGroup>
                </CardContent>
                {explainMode && (
                  <>
                    <CardContent>
                      <Typography component="h3" variant="h5" mb={1}>解説</Typography>
                      <Typography variant="body1" mb={1.5}>
                        正解: {card.correctAnswer}
                      </Typography>
                      <Typography variant="body1" mb={1.5}>
                        {card.explanation}
                      </Typography>
                    </CardContent>
                    {/* 背景アイコン */}
                    <Box
                      sx={{
                        position: 'absolute',
                        top: '0',
                        left: '0',
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        color: 'rgba(0, 0, 0, 0.1)', // アイコンの色と透過度を設定
                      }}
                    >
                      {card.correctAnswer === card.userCorrectAnswer ?
                        (
                          // 正解
                          <PanoramaFishEyeIcon sx={{ fontSize: 260 }} />
                        ) : (
                          // 不正解
                          <ClearIcon sx={{ fontSize: 300 }} />
                        )}
                    </Box>
                  </>
                )}
              </Card>
            </Slide>
          ))}
        </Container >
        <Stack spacing={2} >
          {(activeIndex === cards.length - 1) ? (
            (!explainMode) && (
              <Button onClick={handleFinish} style={{ margin: 0 }}>
                Finish
              </Button>
            )
          ) : (
            <>
              {!explainMode && (
                // 解説モードではskipボタンは表示しないよ
                <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }} >
                  Skip
                </Button>
              )}
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
