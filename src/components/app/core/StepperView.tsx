import { ReactNode, useEffect, useState } from 'react';

import { Button, Spacer, View, ViewProps } from '@/components';
import { clx } from '@/utils';

export type StepperViewProps = {
  step: number;
  steps: ReactNode[];
  onFinish?: () => void;
  onStepChange?: (step: number) => void;
  nextButton?: ReactNode;
  prevButton?: ReactNode;
  spacerHeight?: number;
} & ViewProps;

export const StepperView = ({
  step,
  className,
  steps,
  onStepChange,
  onFinish,
  nextButton,
  prevButton,
  spacerHeight = 10,
  ...props
}: StepperViewProps) => {
  const [currentStep, setCurrentStep] = useState(step);
  const isFirstStep = currentStep === 0;

  useEffect(() => {
    onStepChange?.(currentStep);
  }, [currentStep]);

  return (
    <View className={clx('bg-primary py-4 justify-between', className)} {...props}>
      <View>
        <View className="flex-row gap-2">
          {steps.map((_, index) => (
            <View
              key={index}
              className={clx('flex-1 h-1 rounded-full', currentStep === index ? 'bg-white' : 'bg-white/30')}
            />
          ))}
        </View>
        <Spacer height={spacerHeight} />
        {currentStep < steps.length && steps[currentStep]}
        <Spacer height={5} />
      </View>
      <View className="flex-row justify-end gap-2">
        {!isFirstStep &&
          (prevButton || (
            <Button
              title="Previous"
              className="px-4"
              textProps={{ size: 'md', bold: false }}
              onPress={() => currentStep > 0 && setCurrentStep(currentStep - 1)}
            />
          ))}
        {nextButton || (
          <Button
            title={currentStep < steps.length - 1 ? 'Next' : 'Finish'}
            className="px-4 bg-white rounded-full"
            textProps={{ className: 'text-black', size: 'md', bold: false }}
            onPress={() => {
              if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1);
              else if (currentStep == steps.length - 1) onFinish?.();
            }}
          />
        )}
      </View>
    </View>
  );
};
