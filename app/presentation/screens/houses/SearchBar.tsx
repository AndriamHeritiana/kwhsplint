import React, { useState, useCallback } from 'react';
import {
    View,
    TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import styles from '../../../state/context/styles/styles';
import debounce from 'lodash.debounce';
interface SearchBarProps {
    onSearch: (searchTerm: string) => void; // Callback pour envoyer la valeur de recherche
}
const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState<string>('');

    // Débounce la fonction onSearch pour éviter trop d'appels
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const debouncedSearch = useCallback(
        debounce((text: string) => {
            onSearch(text);
        }, 500), // Attend 500ms avant d'appeler onSearch
        [onSearch]
    );

    const handleSearch = (text: string) => {
        setSearchTerm(text);
        debouncedSearch(text);
    };

    return (
        <View style={styles.containerSearch}>
            <Icon name="search" size={20} color="#7D8CA1" style={styles.iconSearch} />
            <TextInput
                style={styles.inputSearch}
                placeholder="Search consumption history"
                placeholderTextColor="#7D8CA1"
                value={searchTerm}
                onChangeText={handleSearch} // Met à jour l'état et appelle le callback
            />
        </View>
    );
};
export default SearchBar;
