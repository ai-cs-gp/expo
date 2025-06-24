import React from 'react';
import { Alert, ScrollView } from 'react-native';

import { Icon, IconName, Screen, Text, TouchableOpacity, View } from '@/components';

// Mock user data - replace with real data from your backend
const mockUser = {
  id: 1,
  name: 'Ahmed Ali',
  email: 'ahmed.ali@email.com',
  phone: '+20 123 456 7890',
  avatar: null,
  memberSince: 'January 2023',
  totalServices: 8,
  preferredLocation: 'Main Service Center',
  notificationsEnabled: true,
  emergencyContact: '+20 100 123 4567',
};

const mockVehicles = [
  {
    id: 1,
    make: 'Toyota',
    model: 'Camry',
    year: 2020,
    plateNumber: 'ABC 1234',
    color: 'Silver',
    mileage: 45000,
    lastService: '2 weeks ago',
    nextService: 'Due in 3 months',
  },
  {
    id: 2,
    make: 'Honda',
    model: 'Civic',
    year: 2019,
    plateNumber: 'XYZ 5678',
    color: 'Black',
    mileage: 38000,
    lastService: '1 month ago',
    nextService: 'Due in 2 months',
  },
];

const mockStats = [
  { label: 'Total Services', value: '8', icon: 'build-outline' },
  { label: 'Vehicles', value: '2', icon: 'car-outline' },
  { label: 'Money Saved', value: '$450', icon: 'card-outline' },
  { label: 'Member Since', value: '2023', icon: 'star-outline' },
];

const Profile = () => {
  const handleEditProfile = () => {
    Alert.alert('Edit Profile', 'Profile editing feature coming soon!');
  };

  const handleVehicleAction = (action: string, _vehicleId?: number) => {
    Alert.alert('Vehicle Action', `${action} feature coming soon!`);
  };

  const handleSettingAction = (setting: string) => {
    Alert.alert('Settings', `${setting} feature coming soon!`);
  };

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Logout', style: 'destructive', onPress: () => Alert.alert('Success', 'Logged out successfully') },
    ]);
  };

  return (
    <Screen className="flex-1 bg-gray-50" padded={false}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="px-5 pt-12 pb-8 bg-black">
          <View className="flex-row justify-between items-center mb-6">
            <Text className="text-2xl text-white font-cairo-bold">Profile</Text>
            <TouchableOpacity onPress={handleEditProfile} className="px-4 py-2 rounded-lg bg-white/20">
              <Text className="text-sm font-semibold text-white">Edit</Text>
            </TouchableOpacity>
          </View>

          {/* User Info */}
          <View className="flex-row items-center">
            <View className="mr-4 w-16 h-16 rounded-full bg-white/20 center">
              <Text className="text-xl text-white font-cairo-bold">
                {mockUser.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')}
              </Text>
            </View>
            <View className="flex-1">
              <Text className="text-xl text-white font-cairo-bold">{mockUser.name}</Text>
              <Text className="text-sm text-white/70">{mockUser.email}</Text>
              <Text className="text-sm text-white/70">Member since {mockUser.memberSince}</Text>
            </View>
          </View>
        </View>

        <View className="px-5 -mt-6">
          {/* Stats Cards */}
          <View className="p-5 mb-6 bg-white rounded-2xl shadow-sm">
            <Text className="mb-4 text-lg font-cairo-bold">Your Stats</Text>
            <View className="flex-row flex-wrap gap-4">
              {mockStats.map((stat, index) => (
                <View key={index} className="bg-gray-50 rounded-xl p-4 flex-1 min-w-[140px]">
                  <View className="flex-row items-center mb-2">
                    <Icon name={stat.icon as IconName} size={20} color="#666" />
                    <Text className="ml-2 text-xs text-gray-600">{stat.label}</Text>
                  </View>
                  <Text className="text-xl font-cairo-bold">{stat.value}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* My Vehicles */}
          <View className="p-5 mb-6 bg-white rounded-2xl shadow-sm">
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-lg font-cairo-bold">My Vehicles</Text>
              <TouchableOpacity onPress={() => handleVehicleAction('Add Vehicle')}>
                <Icon name="add-circle-outline" size={24} color="#000" />
              </TouchableOpacity>
            </View>

            {mockVehicles.map((vehicle) => (
              <TouchableOpacity
                key={vehicle.id}
                className="p-4 mb-3 rounded-xl border border-gray-100"
                onPress={() => handleVehicleAction('View Details', vehicle.id)}
              >
                <View className="flex-row justify-between items-center">
                  <View className="flex-row flex-1 items-center">
                    <View className="p-3 mr-4 bg-gray-100 rounded-xl">
                      <Icon name="car-outline" size={24} color="#666" />
                    </View>
                    <View className="flex-1">
                      <Text className="text-base font-cairo-bold">
                        {vehicle.year} {vehicle.make} {vehicle.model}
                      </Text>
                      <Text className="text-sm text-gray-500">
                        {vehicle.plateNumber} • {vehicle.color}
                      </Text>
                      <Text className="text-xs text-gray-400">
                        {vehicle.mileage.toLocaleString()} km • Last service: {vehicle.lastService}
                      </Text>
                    </View>
                  </View>
                  <Icon name="chevron-forward-outline" size={20} color="#9ca3af" />
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Quick Actions */}
          <View className="p-5 mb-6 bg-white rounded-2xl shadow-sm">
            <Text className="mb-4 text-lg font-cairo-bold">Quick Actions</Text>
            <View className="space-y-3">
              {[
                { icon: 'calendar-outline', title: 'Service History', subtitle: 'View past services and reports' },
                { icon: 'card-outline', title: 'Payment Methods', subtitle: 'Manage cards and billing' },
                { icon: 'location-outline', title: 'Service Locations', subtitle: 'Find nearby centers' },
                { icon: 'call-outline', title: 'Emergency Support', subtitle: '24/7 roadside assistance' },
              ].map((action, index) => (
                <TouchableOpacity
                  key={index}
                  className="flex-row items-center p-3 bg-gray-50 rounded-xl"
                  onPress={() => handleSettingAction(action.title)}
                >
                  <View className="p-2 mr-4 bg-white rounded-lg">
                    <Icon name={action.icon as IconName} size={20} color="#666" />
                  </View>
                  <View className="flex-1">
                    <Text className="text-sm font-cairo-bold">{action.title}</Text>
                    <Text className="text-xs text-gray-500">{action.subtitle}</Text>
                  </View>
                  <Icon name="chevron-forward-outline" size={16} color="#9ca3af" />
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Account Settings */}
          <View className="p-5 mb-6 bg-white rounded-2xl shadow-sm">
            <Text className="mb-4 text-lg font-cairo-bold">Account Settings</Text>
            <View className="space-y-3">
              {[
                { icon: 'person-outline', title: 'Personal Information', subtitle: 'Update your profile details' },
                { icon: 'notifications-outline', title: 'Notifications', subtitle: 'Manage notification preferences' },
                { icon: 'shield-outline', title: 'Privacy & Security', subtitle: 'Password and security settings' },
                { icon: 'language-outline', title: 'Language', subtitle: 'Choose your preferred language' },
                { icon: 'help-circle-outline', title: 'Help & Support', subtitle: 'FAQs and contact support' },
              ].map((setting, index) => (
                <TouchableOpacity
                  key={index}
                  className="flex-row items-center p-3"
                  onPress={() => handleSettingAction(setting.title)}
                >
                  <Icon name={setting.icon as IconName} size={20} color="#666" className="mr-4" />
                  <View className="flex-1">
                    <Text className="text-sm font-cairo-bold">{setting.title}</Text>
                    <Text className="text-xs text-gray-500">{setting.subtitle}</Text>
                  </View>
                  <Icon name="chevron-forward-outline" size={16} color="#9ca3af" />
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* About & Logout */}
          <View className="p-5 mb-8 bg-white rounded-2xl shadow-sm">
            <View className="space-y-3">
              <TouchableOpacity className="flex-row items-center p-3" onPress={() => handleSettingAction('About')}>
                <Icon name="information-circle-outline" size={20} color="#666" className="mr-4" />
                <View className="flex-1">
                  <Text className="text-sm font-cairo-bold">About</Text>
                  <Text className="text-xs text-gray-500">App version 1.0.0</Text>
                </View>
                <Icon name="chevron-forward-outline" size={16} color="#9ca3af" />
              </TouchableOpacity>

              <TouchableOpacity className="flex-row items-center p-3" onPress={handleLogout}>
                <Icon name="log-out-outline" size={20} color="#dc2626" className="mr-4" />
                <Text className="text-sm text-red-600 font-cairo-bold">Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </Screen>
  );
};

export default Profile;
