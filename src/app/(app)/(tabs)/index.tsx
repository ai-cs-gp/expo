import React from 'react';
import { Alert, RefreshControl, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { Icon, Screen, Text, TouchableOpacity, View } from '@/components';
import { clx } from '@/utils';

// Mock data - replace with real data from your backend
const mockUser = {
  name: 'Ahmed Ali',
  firstName: 'Ahmed',
};

const mockVehicle = {
  id: 1,
  make: 'Toyota',
  model: 'Camry',
  year: 2020,
  plateNumber: 'ABC 1234',
  status: 'in_technician_bay', // awaiting_checkin, in_garage, in_technician_bay, fixing_in_progress, service_complete
  statusText: 'In Technician Bay',
  lastUpdate: '2 hours ago',
};

const mockNotifications = [
  {
    id: 1,
    title: 'Service Update',
    message: 'Your vehicle diagnosis is complete. Parts ordering in progress.',
    time: '15 min ago',
    type: 'info',
  },
  {
    id: 2,
    title: 'Vehicle Moved',
    message: 'Your Toyota Camry has been moved to the technician bay.',
    time: '2 hours ago',
    type: 'success',
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'awaiting_checkin':
      return '#FFA726'; // Orange
    case 'in_garage':
      return '#42A5F5'; // Blue
    case 'in_technician_bay':
      return '#AB47BC'; // Purple
    case 'fixing_in_progress':
      return '#FF7043'; // Deep Orange
    case 'service_complete':
      return '#66BB6A'; // Green
    default:
      return '#757575'; // Gray
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'awaiting_checkin':
      return 'time-outline';
    case 'in_garage':
      return 'car-outline';
    case 'in_technician_bay':
      return 'build-outline';
    case 'fixing_in_progress':
      return 'settings-outline';
    case 'service_complete':
      return 'checkmark-circle-outline';
    default:
      return 'help-outline';
  }
};

const App = () => {
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const handleQuickAction = (action: string) => {
    Alert.alert('Action', `${action} feature coming soon!`);
  };

  return (
    <Screen className="flex-1 bg-gray-50" scroll={false} padded={false}>
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        {/* Header with Gradient */}
        <LinearGradient colors={['#1a1a1a', '#333333']} className="px-5 pt-12 pb-6">
          <View className="flex-row justify-between items-center mb-4">
            <View>
              <Text className="text-white/70" size="sm">
                Good morning,
              </Text>
              <Text className="text-xl text-white font-cairo-bold">{mockUser.firstName}</Text>
            </View>
            <TouchableOpacity
              className="p-3 rounded-full bg-white/10"
              onPress={() => handleQuickAction('Notifications')}
            >
              <Icon name="notifications-outline" size={24} color="white" />
              <View className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full" />
            </TouchableOpacity>
          </View>
        </LinearGradient>

        <View className="px-5 -mt-8">
          {/* Current Vehicle Status Card */}
          {mockVehicle && (
            <View className="p-5 mb-6 bg-white rounded-2xl shadow-sm">
              <View className="flex-row justify-between items-center mb-4">
                <Text className="text-lg font-cairo-bold">Current Service</Text>
                <View
                  className="px-3 py-1 rounded-full"
                  style={{ backgroundColor: `${getStatusColor(mockVehicle.status)}20` }}
                >
                  <Text className="text-xs font-semibold" style={{ color: getStatusColor(mockVehicle.status) }}>
                    {mockVehicle.statusText}
                  </Text>
                </View>
              </View>

              <View className="flex-row items-center mb-4">
                <View className="p-3 mr-4 bg-gray-100 rounded-xl">
                  <Icon name="car-outline" size={24} color="#666" />
                </View>
                <View className="flex-1">
                  <Text className="text-base font-cairo-bold">
                    {mockVehicle.year} {mockVehicle.make} {mockVehicle.model}
                  </Text>
                  <Text className="text-sm text-gray-500">Plate: {mockVehicle.plateNumber}</Text>
                </View>
              </View>

              <View className="flex-row justify-between items-center">
                <View className="flex-row items-center">
                  <Icon name={getStatusIcon(mockVehicle.status)} size={16} color={getStatusColor(mockVehicle.status)} />
                  <Text className="ml-2 text-xs text-gray-500">Updated {mockVehicle.lastUpdate}</Text>
                </View>
                <TouchableOpacity onPress={() => handleQuickAction('Track Vehicle')}>
                  <Text className="font-semibold text-black">Track →</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* Quick Actions */}
          <View className="mb-6">
            <Text className="mb-4 text-lg font-cairo-bold">Quick Actions</Text>
            <View className="flex-row flex-wrap gap-3">
              <TouchableOpacity
                className="bg-white rounded-xl p-4 flex-1 min-w-[160px] shadow-sm"
                onPress={() => handleQuickAction('Request Service')}
              >
                <View className="self-start p-2 mb-2 bg-blue-100 rounded-lg">
                  <Icon name="add-circle-outline" size={20} color="#2563eb" />
                </View>
                <Text className="text-sm font-cairo-bold">Request Service</Text>
                <Text className="text-xs text-gray-500">Book a new appointment</Text>
              </TouchableOpacity>

              <TouchableOpacity
                className="bg-white rounded-xl p-4 flex-1 min-w-[160px] shadow-sm"
                onPress={() => handleQuickAction('My Vehicles')}
              >
                <View className="self-start p-2 mb-2 bg-green-100 rounded-lg">
                  <Icon name="car-sport-outline" size={20} color="#16a34a" />
                </View>
                <Text className="text-sm font-cairo-bold">My Vehicles</Text>
                <Text className="text-xs text-gray-500">View all vehicles</Text>
              </TouchableOpacity>

              <TouchableOpacity
                className="bg-white rounded-xl p-4 flex-1 min-w-[160px] shadow-sm"
                onPress={() => handleQuickAction('Service History')}
              >
                <View className="self-start p-2 mb-2 bg-purple-100 rounded-lg">
                  <Icon name="document-text-outline" size={20} color="#9333ea" />
                </View>
                <Text className="text-sm font-cairo-bold">Service History</Text>
                <Text className="text-xs text-gray-500">Past services</Text>
              </TouchableOpacity>

              <TouchableOpacity
                className="bg-white rounded-xl p-4 flex-1 min-w-[160px] shadow-sm"
                onPress={() => handleQuickAction('Emergency Support')}
              >
                <View className="self-start p-2 mb-2 bg-red-100 rounded-lg">
                  <Icon name="call-outline" size={20} color="#dc2626" />
                </View>
                <Text className="text-sm font-cairo-bold">Emergency</Text>
                <Text className="text-xs text-gray-500">24/7 support</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Recent Notifications */}
          <View className="mb-6">
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-lg font-cairo-bold">Recent Updates</Text>
              <TouchableOpacity onPress={() => handleQuickAction('View All Notifications')}>
                <Text className="text-sm font-semibold text-black">View All</Text>
              </TouchableOpacity>
            </View>

            {mockNotifications.map((notification) => (
              <TouchableOpacity
                key={notification.id}
                className="p-4 mb-3 bg-white rounded-xl shadow-sm"
                onPress={() => handleQuickAction('Notification Details')}
              >
                <View className="flex-row items-start">
                  <View
                    className={clx(
                      'p-2 mr-3 rounded-lg',
                      notification.type === 'success' ? 'bg-green-100' : 'bg-blue-100',
                    )}
                  >
                    <Icon
                      name={notification.type === 'success' ? 'checkmark-circle-outline' : 'information-circle-outline'}
                      size={16}
                      color={notification.type === 'success' ? '#16a34a' : '#2563eb'}
                    />
                  </View>
                  <View className="flex-1">
                    <Text className="mb-1 text-sm font-cairo-bold">{notification.title}</Text>
                    <Text className="mb-2 text-xs text-gray-600">{notification.message}</Text>
                    <Text className="text-xs text-gray-400">{notification.time}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Service Process Overview */}
          <View className="mb-8">
            <Text className="mb-4 text-lg font-cairo-bold">Service Process</Text>
            <View className="p-5 bg-white rounded-xl shadow-sm">
              <View className="space-y-4">
                {[
                  { step: 1, title: 'Check-in', desc: 'Drive-thru confirmation', active: true },
                  { step: 2, title: 'Garage', desc: 'Robotic valet parking', active: true },
                  { step: 3, title: 'Technician', desc: 'Professional diagnosis', active: true },
                  { step: 4, title: 'Service', desc: 'Repair in progress', active: false },
                  { step: 5, title: 'Complete', desc: 'Ready for pickup', active: false },
                ].map((item, index) => (
                  <View key={item.step} className="flex-row items-center">
                    <View className={`w-8 h-8 rounded-full center mr-3 ${item.active ? 'bg-black' : 'bg-gray-200'}`}>
                      <Text className={`text-xs font-bold ${item.active ? 'text-white' : 'text-gray-500'}`}>
                        {item.step}
                      </Text>
                    </View>
                    <View className="flex-1">
                      <Text className={`font-cairo-bold text-sm ${item.active ? 'text-black' : 'text-gray-500'}`}>
                        {item.title}
                      </Text>
                      <Text className="text-xs text-gray-500">{item.desc}</Text>
                    </View>
                    {index < 4 && <View className={`w-px h-6 ml-4 ${item.active ? 'bg-black' : 'bg-gray-200'}`} />}
                  </View>
                ))}
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </Screen>
  );
};

export default App;
