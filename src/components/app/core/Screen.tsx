import React, { ReactNode } from 'react';
import { ActivityIndicator, KeyboardAvoidingView, Platform, ScrollViewProps, ViewProps, ViewStyle } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AuthHeader, View } from '@/components';
import { clx } from '@/utils';

type Props = {
  disableStatusBarPadding?: boolean;
  loading?: boolean;
  header?: ReactNode;
  footer?: ReactNode;
  topContent?: ReactNode;
  authHeader?: boolean;
  background?: ReactNode;
  paddingTop?: number;
  padding?: number;
  padded?: boolean;
  rounded?: boolean;
  scroll?: boolean;
  bounceBackground?: ViewStyle['backgroundColor'];
  containerProps?: ViewProps;
  scrollViewProps?: ScrollViewProps;
  wrapperProps?: ViewProps;
} & ViewProps;

export const Screen = ({
  disableStatusBarPadding = false,
  loading,
  header,
  footer,
  topContent,
  authHeader,
  padded = true,
  rounded = true,
  scroll = true,
  bounceBackground,
  scrollViewProps,
  wrapperProps: { className: wrapperClassName, ...wrapperProps } = {},
  // view props
  containerProps: { className: containerClassName, ...containerProps } = {},
  className,
  ...props
}: Props) => {
  const insets = useSafeAreaInsets();
  const isIOS = Platform.OS === 'ios';

  if (authHeader) header = <AuthHeader />;

  const childrenWrapper = <View className={clx('flex-1', { 'p-5 pt-8': padded }, className)} {...props} />;

  return (
    <View className={clx('flex-1', containerClassName)} {...containerProps}>
      {!disableStatusBarPadding && <View style={{ height: insets.top }} />}
      {header}

      {loading && (
        <View className="absolute top-0 bottom-0 left-0 right-0 z-50 bg-white/40 center">
          <ActivityIndicator size="large" color={'orange'} />
        </View>
      )}

      <View
        className={clx('flex-1 overflow-hidden', { 'rounded-t-[30]': rounded }, wrapperClassName)}
        {...wrapperProps}
      >
        {topContent}

        {scroll ? (
          <KeyboardAvoidingView
            behavior={isIOS ? 'padding' : 'height'}
            keyboardVerticalOffset={isIOS ? 64 : 0}
            className={clx('flex-1', wrapperClassName)}
          >
            <ScrollView showsVerticalScrollIndicator={false} scrollEventThrottle={30} {...scrollViewProps}>
              {/* background color for IOS scroll bounce */}
              {isIOS && bounceBackground && (
                <View
                  style={{
                    backgroundColor: bounceBackground,
                    height: 1000,
                    position: 'absolute',
                    top: -1000,
                    left: 0,
                    right: 0,
                  }}
                />
              )}

              {childrenWrapper}
              {/* extra space to cover the bottom bar position */}
              <View className="h-32" style={{ marginBottom: insets.bottom }} />
            </ScrollView>
          </KeyboardAvoidingView>
        ) : (
          childrenWrapper
        )}
      </View>

      {footer}
    </View>
  );
};
