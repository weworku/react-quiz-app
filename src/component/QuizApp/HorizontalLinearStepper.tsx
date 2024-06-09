import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

const steps = Array.from({ length: 10 }, () => '');

type Props = {
  activeStep: number,
  skipped: Set<number>,
}

export default function HorizontalLinearStepper({ activeStep, skipped }: Props) {
  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" >
      <Box sx={{ width: '50%', mb: 1.5 }}>
        <Stepper activeStep={activeStep}>
          {/* TODO:labelとindexが同じ値なので、どちらかにしたい */}
          {steps.map((label, index) => {
            const stepProps: { completed?: boolean } = {};
            const labelProps: {
              optional?: React.ReactNode;
            } = {};
            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }
            return (
              <Step key={index} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
      </Box>
    </Box>
  );
}