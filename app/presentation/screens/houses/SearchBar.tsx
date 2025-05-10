import React from 'react';
import {
    View,
    TextInput,
    StyleSheet,
    Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const { width } = Dimensions.get('window');

const SearchBar = () => {
    return (
        <View style={styles.container}>
            <Icon name="search" size={20} color="#7D8CA1" style={styles.icon} />
            <TextInput
                style={styles.input}
                placeholder="Search consumption history"
                placeholderTextColor="#7D8CA1"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        height: 48,
        paddingHorizontal: 16,
        marginHorizontal: 12,
        marginVertical: 10,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 4,
        elevation: 2, // Pour Android
    },
    icon: {
        marginRight: 8,
    },
    input: {
        flex: 1,
        color: '#333',
        fontSize: 14,
        fontWeight: '500',
    },
});

export default SearchBar;
