import React from 'react';
import { View } from 'react-native';
import styles from '../../state/context/styles/styles';
const Layout = ({ children }: { children: React.ReactNode }) => {
    return <View style={styles.container}>{children}</View>;
};
export default Layout;
