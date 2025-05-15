import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
    Home: undefined;
    ReadingInput: undefined;
    History: undefined;
    Scan: undefined;
    Details: { id: number; date?: string };
    Settings: undefined;
    Consumption: undefined;
    Statistic: undefined;
};

export type RootStackNavigationProp<T extends keyof RootStackParamList> =
    NativeStackNavigationProp<RootStackParamList, T>;

export type RootStackRouteProp<T extends keyof RootStackParamList> =
    RouteProp<RootStackParamList, T>;
