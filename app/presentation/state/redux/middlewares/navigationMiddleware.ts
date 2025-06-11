import { Middleware, AnyAction } from '@reduxjs/toolkit';
import { CommonActions } from '@react-navigation/native';
// Importez la référence de navigation de React Navigation
import { navigationRef } from '@/presentation/navigation/ref/navigationRef';
export const navigationMiddleware: Middleware = () => (next) => (action) => {
    if (typeof action === 'object' && action !== null && 'type' in action && navigationRef.isReady()) {
        if (action.type === 'reading/addReading/fulfilled') {
            navigationRef.dispatch(
                CommonActions.navigate('History')
            );
        } else if (action.type === 'auth/signUp/fulfilled') { // Adjust based on your action type
            navigationRef.dispatch(
                CommonActions.navigate('SignIn') // Ensure correct screen name
            );
        }
    }
    return next(action);
};
