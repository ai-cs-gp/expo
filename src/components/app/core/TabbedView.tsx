import { ReactNode, useCallback, useState } from 'react';
import { TouchableOpacity } from 'react-native';

import { Text, View, ViewProps } from '@/components';
import { clx } from '@/utils';

export type TabbedViewProps = {
  tabs: {
    id: string;
    label: string;
    iconName: string;
    onSelect?: () => void;
    renderContent: () => ReactNode;
  }[];
  selectedTabId?: string;
  onTabChange?: (tabId: string) => void;
} & ViewProps;

export const TabbedView = ({
  tabs,
  className,
  selectedTabId: defaultSelectedTabId,
  onTabChange,
  ...props
}: TabbedViewProps) => {
  if (!tabs.length) throw new Error('tabs are required');

  const [selectedTabId, setSelectedTabId] = useState(defaultSelectedTabId ?? tabs[0].id);

  const onChange = useCallback((tabId: string) => onTabChange?.(tabId), [selectedTabId, onTabChange]);

  return (
    <View className={clx('gap-2 size-full flex-1', className)} {...props}>
      <View className="w-full">
        <View className="flex-row w-full p-1 mx-auto bg-gray-300 rounded-lg">
          {tabs.map((tab) => {
            const isSelected = selectedTabId === tab.id;
            return (
              <TouchableOpacity
                key={tab.id}
                className="flex-1 min-h-[40]"
                activeOpacity={0.8}
                onPress={() => {
                  tab.onSelect?.();
                  setSelectedTabId(tab.id);
                  onChange(tab.id);
                }}
              >
                <View
                  className={clx('p-2 center flex-1', {
                    'bg-primary rounded-lg': isSelected,
                  })}
                >
                  <Text
                    size="sm"
                    bold={isSelected}
                    className={clx({ 'text-white': isSelected, 'text-gray-600': !isSelected })}
                  >
                    {tab.label}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
      {tabs.find((tab) => tab.id === selectedTabId)?.renderContent()}
    </View>
  );
};
