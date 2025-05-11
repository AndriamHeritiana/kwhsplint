import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
const Reading = () => {
    return (
        <View>
            <Animated.View entering={FadeIn.duration(5000)} style={styles.card}>
            <Text>Reading</Text>
            </Animated.View>
        </View>
    );
};
export default Reading;
const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        padding: 20,
        margin: 20,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 3,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});
