import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Provider } from 'react-redux';
import {store} from '@/presentation/state/redux/store/store';
import HomeScreen from '../screens/HomeScreen';
import Consumption from '../screens/Consumption.tsx';
import Statistic from '../screens/Statistic.tsx';
import History from '../screens/History.tsx';
import Setting from '../screens/Setting.tsx';
import { navigationRef } from '@/presentation/navigation/ref/navigationRef.ts';
import Toast from 'react-native-toast-message';
const Tab = createBottomTabNavigator();

const AppNavigator = () => {
   return (
        <Provider store={store}>
            <NavigationContainer ref={navigationRef}>
                <Tab.Navigator
                    initialRouteName="Home"
                    screenOptions={{
                        tabBarActiveTintColor: '#4A90E2', // Couleur active du texte (blanc)
                        tabBarInactiveTintColor: '#B0B0B0', // Couleur inactive du texte (gris)
                        tabBarStyle: {
                            paddingBottom: 5,
                            paddingTop: 5,
                            elevation: 5, // Ombre pour un effet de surélévation
                            backgroundColor: '#f8f8f8', // Fond clair de la barre
                            borderTopWidth: 0, // Enlève la bordure supérieure
                            borderTopColor: 'transparent', // Enlève la couleur de bordure supérieure
                        },
                    }}
                >
                    <Tab.Screen
                        name="Home"
                        component={HomeScreen}
                        options={{
                            tabBarIcon: ({ color }) => (
                                <Icon name="home" size={24} color={color} />
                            ),
                            tabBarLabel: 'Home',
                        }}
                    />
                    <Tab.Screen
                        name="Consumption"
                        component={Consumption}
                        options={{
                            tabBarIcon: ({ color }) => (
                                <Icon name="plus" size={24} color={color} />
                            ),
                            tabBarLabel: 'Consumption',
                        }}
                    />
                    <Tab.Screen
                        name="History"
                        component={History}
                        options={{
                            tabBarIcon: ({ color }) => (
                                <Icon name="history" size={24} color={color} />
                            ),
                            tabBarLabel: 'History',
                        }}
                    />
                    <Tab.Screen
                        name="Statistic"
                        component={Statistic}
                        options={{
                            tabBarIcon: ({ color }) => (
                                <Icon name="bar-chart" size={24} color={color} />
                            ),
                            tabBarLabel: 'Statistic',
                        }}
                    />
                    <Tab.Screen
                        name="Setting"
                        component={Setting}
                        options={{
                            tabBarIcon: ({ color }) => (
                                <Icon name="gear" size={24} color={color} />
                            ),
                            tabBarLabel: 'Setting',
                        }}
                    />
                </Tab.Navigator>
            </NavigationContainer>
            <Toast />
        </Provider>
    );
};

export default AppNavigator;
