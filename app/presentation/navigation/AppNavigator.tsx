import React, { useEffect, useState } from 'react';
import { Keyboard } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { AppDispatch, store } from '../state/redux/store/store';
import { selectUser } from '../state/redux/selectors/authSelectors';
import { getCurrentUser } from '../state/redux/slices/authSlice';
import HomeScreen from '../screens/HomeScreen';
import Consumption from '../screens/Consumption';
import Statistic from '../screens/Statistic';
import History from '../screens/History';
import Setting from '../screens/Setting';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import { navigationRef } from './ref/navigationRef';
import Toast from 'react-native-toast-message';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const TabNavigator = () => {
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);

    // Écouter les événements du clavier
    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
            setKeyboardVisible(true);
        });
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardVisible(false);
        });

        // Nettoyer les écouteurs
        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);

    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={{
                tabBarActiveTintColor: '#4A90E2',
                tabBarInactiveTintColor: '#B0B0B0',
                tabBarStyle: {
                    paddingBottom: 5,
                    paddingTop: 5,
                    elevation: 5,
                    backgroundColor: '#f8f8f8',
                    borderTopWidth: 0,
                    borderTopColor: 'transparent',
                    display: isKeyboardVisible ? 'none' : 'flex', // Cacher la barre si le clavier est visible
                },
            }}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ color }) => <Icon name="home" size={24} color={color} />,
                    tabBarLabel: 'Home',
                }}
            />
            <Tab.Screen
                name="Consumption"
                component={Consumption}
                options={{
                    tabBarIcon: ({ color }) => <Icon name="plus" size={24} color={color} />,
                    tabBarLabel: 'Consumption',
                }}
            />
            <Tab.Screen
                name="History"
                component={History}
                options={{
                    tabBarIcon: ({ color }) => <Icon name="history" size={24} color={color} />,
                    tabBarLabel: 'History',
                }}
            />
            <Tab.Screen
                name="Statistic"
                component={Statistic}
                options={{
                    tabBarIcon: ({ color }) => <Icon name="bar-chart" size={24} color={color} />,
                    tabBarLabel: 'Statistic',
                }}
            />
            <Tab.Screen
                name="Setting"
                component={Setting}
                options={{
                    tabBarIcon: ({ color }) => <Icon name="gear" size={24} color={color} />,
                    tabBarLabel: 'Setting',
                }}
            />
        </Tab.Navigator>
    );
};

const AppNavigator = () => {
    const dispatch = useDispatch<AppDispatch>();
    const user = useSelector(selectUser);

    useEffect(() => {
        dispatch(getCurrentUser());
    }, [dispatch]);

    return (
        <NavigationContainer ref={navigationRef}>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {user ? (
                    <Stack.Screen name="Main" component={TabNavigator} />
                ) : (
                    <>
                        <Stack.Screen name="SignIn" component={SignInScreen} />
                        <Stack.Screen name="SignUp" component={SignUpScreen} />
                    </>
                )}
            </Stack.Navigator>
            <Toast />
        </NavigationContainer>
    );
};

const AppNavigatorWithProvider = () => (
    <Provider store={store}>
        <AppNavigator />
    </Provider>
);

export default AppNavigatorWithProvider;
