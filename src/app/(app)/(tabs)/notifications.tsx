import React from 'react';
import { Alert, ScrollView } from 'react-native';

import { Icon, Screen, Text, TouchableOpacity, View } from '@/components';
import { clx } from '@/utils';

// Mock notification data - replace with real data from your backend
const mockNotifications = [
  {
    id: 1,
    title: 'Service Complete',
    message: 'Your Toyota Camry service has been completed. Vehicle is ready for pickup.',
    time: '5 min ago',
    type: 'success',
    category: 'service',
    read: false,
    priority: 'high',
  },
  {
    id: 2,
    title: 'Vehicle Moved to Technician',
    message: 'Your vehicle has been moved from garage to technician bay. Diagnosis will begin shortly.',
    time: '2 hours ago',
    type: 'info',
    category: 'movement',
    read: false,
    priority: 'medium',
  },
  {
    id: 3,
    title: 'Parts Ordered',
    message: 'Required parts for your brake repair have been ordered. Estimated delivery: 2-3 business days.',
    time: '1 day ago',
    type: 'info',
    category: 'service',
    read: true,
    priority: 'low',
  },
  {
    id: 4,
    title: 'Check-in Confirmed',
    message: 'Your vehicle check-in has been confirmed. Robotic valet will transport your car to garage.',
    time: '2 days ago',
    type: 'success',
    category: 'checkin',
    read: true,
    priority: 'medium',
  },
  {
    id: 5,
    title: 'Appointment Reminder',
    message: 'Reminder: Your scheduled service appointment is tomorrow at 10:00 AM.',
    time: '3 days ago',
    type: 'warning',
    category: 'appointment',
    read: true,
    priority: 'medium',
  },
  {
    id: 6,
    title: 'Payment Processed',
    message: 'Payment of $250.00 for brake service has been successfully processed.',
    time: '1 week ago',
    type: 'success',
    category: 'payment',
    read: true,
    priority: 'low',
  },
];

const categories = [
  { id: 'all', label: 'All', count: mockNotifications.length },
  { id: 'service', label: 'Service', count: mockNotifications.filter((n) => n.category === 'service').length },
  { id: 'movement', label: 'Movement', count: mockNotifications.filter((n) => n.category === 'movement').length },
  {
    id: 'appointment',
    label: 'Appointments',
    count: mockNotifications.filter((n) => n.category === 'appointment').length,
  },
  { id: 'payment', label: 'Payments', count: mockNotifications.filter((n) => n.category === 'payment').length },
];

const getNotificationIcon = (type: string, category: string) => {
  switch (category) {
    case 'service':
      return type === 'success' ? 'checkmark-circle-outline' : 'build-outline';
    case 'movement':
      return 'car-outline';
    case 'checkin':
      return 'log-in-outline';
    case 'appointment':
      return 'calendar-outline';
    case 'payment':
      return 'card-outline';
    default:
      return 'notifications-outline';
  }
};

const getNotificationColor = (type: string) => {
  switch (type) {
    case 'success':
      return '#16a34a';
    case 'warning':
      return '#f59e0b';
    case 'error':
      return '#dc2626';
    default:
      return '#2563eb';
  }
};

const getNotificationBgColor = (type: string) => {
  switch (type) {
    case 'success':
      return 'bg-green-100';
    case 'warning':
      return 'bg-yellow-100';
    case 'error':
      return 'bg-red-100';
    default:
      return 'bg-blue-100';
  }
};

const Notifications = () => {
  const [selectedCategory, setSelectedCategory] = React.useState('all');

  const filteredNotifications =
    selectedCategory === 'all'
      ? mockNotifications
      : mockNotifications.filter((notification) => notification.category === selectedCategory);

  const unreadCount = mockNotifications.filter((n) => !n.read).length;

  const handleMarkAsRead = (_id: number) => {
    Alert.alert('Success', 'Notification marked as read');
  };

  const handleMarkAllAsRead = () => {
    Alert.alert('Mark All as Read', 'Are you sure you want to mark all notifications as read?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Mark All', onPress: () => Alert.alert('Success', 'All notifications marked as read') },
    ]);
  };

  const handleDeleteNotification = (_id: number) => {
    Alert.alert('Delete Notification', 'Are you sure you want to delete this notification?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => Alert.alert('Success', 'Notification deleted') },
    ]);
  };

  return (
    <Screen className="flex-1 bg-gray-50" padded={false}>
      {/* Header */}
      <View className="px-6 pt-12 pb-6 bg-white border-b border-gray-100">
        <View className="flex-row justify-between items-center mb-6">
          <View>
            <Text className="mb-1 text-2xl font-cairo-bold">Notifications</Text>
            <Text className="text-sm text-gray-500">{unreadCount} unread notifications</Text>
          </View>
          {unreadCount > 0 && (
            <TouchableOpacity onPress={handleMarkAllAsRead} className="px-4 py-2 bg-black rounded-lg">
              <Text className="text-sm font-semibold text-white">Mark All Read</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Category Filter */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mx-[-6px]">
          <View className="flex-row gap-3 px-6">
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                onPress={() => setSelectedCategory(category.id)}
                className={clx(
                  'px-4 py-3 rounded-full border whitespace-nowrap',
                  selectedCategory === category.id ? 'bg-black border-black' : 'bg-white border-gray-200',
                )}
              >
                <Text
                  className={clx(
                    'text-sm font-semibold',
                    selectedCategory === category.id ? 'text-white' : 'text-gray-700',
                  )}
                >
                  {category.label} ({category.count})
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      {/* Notifications List */}
      <View className="flex-1">
        {filteredNotifications.length === 0 ? (
          <View className="flex-1 px-6 center">
            <View className="p-8 mb-6 bg-gray-100 rounded-full">
              <Icon name="notifications-outline" size={40} color="#9ca3af" />
            </View>
            <Text className="mb-3 text-xl text-gray-700 font-cairo-bold">No notifications</Text>
            <Text className="text-base leading-6 text-center text-gray-500">
              You don't have any notifications in this category yet.
            </Text>
          </View>
        ) : (
          <ScrollView
            showsVerticalScrollIndicator={false}
            className="flex-1"
            contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 24 }}
          >
            <View className="space-y-4">
              {filteredNotifications.map((notification) => (
                <TouchableOpacity
                  key={notification.id}
                  className={clx(
                    'bg-white rounded-2xl p-5 shadow-sm border-l-4',
                    !notification.read ? 'border-l-blue-500' : 'border-l-gray-200',
                  )}
                  onPress={() => handleMarkAsRead(notification.id)}
                >
                  <View className="flex-row items-start">
                    <View
                      className={clx('p-3 rounded-xl mr-4 flex-shrink-0', getNotificationBgColor(notification.type))}
                    >
                      <Icon
                        name={getNotificationIcon(notification.type, notification.category)}
                        size={20}
                        color={getNotificationColor(notification.type)}
                      />
                    </View>
                    <View className="flex-1 min-w-0">
                      <View className="flex-row items-center mb-2">
                        <Text
                          className={clx(
                            'font-cairo-bold text-base flex-1',
                            !notification.read ? 'text-black' : 'text-gray-700',
                          )}
                        >
                          {notification.title}
                        </Text>
                        {!notification.read && <View className="flex-shrink-0 ml-3 w-3 h-3 bg-blue-500 rounded-full" />}
                      </View>
                      <Text
                        className={clx(
                          'text-sm mb-4 leading-5',
                          !notification.read ? 'text-gray-700' : 'text-gray-500',
                        )}
                      >
                        {notification.message}
                      </Text>
                      <View className="flex-row justify-between items-center">
                        <Text className="text-sm text-gray-400">{notification.time}</Text>
                        <View className="flex-row gap-3 items-center">
                          {notification.priority === 'high' && (
                            <View className="px-3 py-1 bg-red-100 rounded-full">
                              <Text className="text-xs font-semibold text-red-600">High Priority</Text>
                            </View>
                          )}
                          <TouchableOpacity
                            onPress={() => handleDeleteNotification(notification.id)}
                            className="p-2 bg-gray-50 rounded-lg"
                          >
                            <Icon name="trash-outline" size={16} color="#9ca3af" />
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
            {/* Bottom spacing for tab bar */}
            <View className="h-6" />
          </ScrollView>
        )}
      </View>
    </Screen>
  );
};

export default Notifications;
