import { Middleware, AnyAction } from '@reduxjs/toolkit';
import { CommonActions } from '@react-navigation/native';
// Importez la référence de navigation de React Navigation
import { navigationRef } from '@/presentation/navigation/ref/navigationRef';
export const navigationMiddleware: Middleware = () => (next) => (action) => {
    // Vérifiez si l'action a une propriété 'type' et si cette propriété est égale à 'reading/addReading/fulfilled'
    if (typeof action === 'object' && action !== null && 'type' in action &&
        action.type === 'reading/addReading/fulfilled' && navigationRef.isReady()) {
        navigationRef.dispatch(
            CommonActions.navigate('History')
        );
    }
    return next(action);
};
