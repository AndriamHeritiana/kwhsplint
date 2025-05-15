import { createNavigationContainerRef } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigationType.ts';

export const navigationRef = createNavigationContainerRef<RootStackParamList>();
