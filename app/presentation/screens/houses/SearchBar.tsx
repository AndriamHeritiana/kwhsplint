import React from 'react';
import {
    View,
    TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import styles from '../../../state/context/styles/styles';

const SearchBar = () => {
    return (
        <View style={styles.containerSearch}>
            <Icon name="search" size={20} color="#7D8CA1" style={styles.iconSearch} />
            <TextInput
                style={styles.inputSearch}
                placeholder="Search consumption history"
                placeholderTextColor="#7D8CA1"
            />
        </View>
    );
};

export default SearchBar;
