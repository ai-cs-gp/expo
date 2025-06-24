import React, { forwardRef, useCallback, useImperativeHandle, useRef, useState } from 'react';
import { BackHandler, StyleSheet } from 'react-native';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetProps,
  BottomSheetScrollView,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { BottomSheetViewProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetView/types';
import { useFocusEffect } from 'expo-router';

export type BSheetRef = BottomSheet;

export type BSheetProps = {
  children?: React.ReactNode;
  className?: string;
  scrollable?: boolean;
  closable?: boolean;
  withBackdrop?: boolean;
  wrapperClassName?: string;
  wrapperProps?: Omit<BottomSheetViewProps, 'className'>;
} & BottomSheetProps;

export const BSheet = forwardRef<BSheetRef, BSheetProps>(
  (
    {
      children,
      closable: _closable = true,
      scrollable = true,
      withBackdrop = false,
      wrapperClassName,
      wrapperProps,
      onChange,
      ...rest
    }: BSheetProps,
    forwardedRef,
  ) => {
    const Wrapper = scrollable ? BottomSheetScrollView : BottomSheetView;

    const [isOpen, setIsOpen] = useState(false);

    const ref = useRef<BSheetRef>(null);

    useImperativeHandle(forwardedRef, () => ref.current as BottomSheet);

    useFocusEffect(
      useCallback(() => {
        const onBackPress = () => {
          // console.log('onBackPress isOpen', isOpen);
          // console.log('onBackPress ref.current', ref.current);

          if (isOpen) {
            ref.current?.collapse();
            return true;
          }

          return false;
        };

        const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);

        return () => subscription.remove();
      }, [isOpen]),
    );

    const renderBackdrop = useCallback(
      (props: BottomSheetBackdropProps) =>
        withBackdrop ? <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} /> : null,
      [withBackdrop],
    );

    return (
      <BottomSheet
        ref={ref}
        backdropComponent={renderBackdrop}
        onChange={(index, position, type) => {
          if (index >= 0) {
            setIsOpen(true);
          } else {
            setIsOpen(false);
          }
          onChange?.(index, position, type);
        }}
        style={{
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 10,
          },
          shadowOpacity: 1,
          shadowRadius: 3.84,
          elevation: 5,
          borderRadius: 30,
          borderWidth: StyleSheet.hairlineWidth,
          borderColor: '#00000020',
          overflow: 'hidden',
        }}
        {...rest}
      >
        <Wrapper className={wrapperClassName} {...wrapperProps}>
          {children}
        </Wrapper>
      </BottomSheet>
    );
  },
);

BSheet.displayName = 'BSheet';
