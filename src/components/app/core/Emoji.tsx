import React, { memo } from 'react';
import CountryFlag from 'react-native-country-flag';

type CountryFlagProps = React.ComponentProps<typeof CountryFlag>;

export const Emoji = memo(({ name, ...props }: { name: string } & Partial<CountryFlagProps>) => {
  return <CountryFlag isoCode={name} size={20} {...props} />;
});

Emoji.displayName = 'Emoji';
