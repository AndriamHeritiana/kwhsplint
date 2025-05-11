import {Dimensions, StyleSheet} from 'react-native';
const { width } = Dimensions.get('window');
export default StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 16,
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 2 },
        paddingVertical: 14,
        paddingHorizontal: 16,
        marginVertical: 10,
        marginHorizontal: 16,
        elevation: 2,
        width: width * 0.92,
        alignSelf: 'center',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    houseImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
        borderWidth: 2,
        borderColor: '#4A90E2',
        marginRight: 12,
    },
    nameSection: {
        flex: 1,
    },
    houseName: {
        color: '#4A90E2',
        fontWeight: 'bold',
        fontSize: 18,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 16,
        paddingHorizontal: 4,
    },
    footerItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    separator: {
        height: 1,
        backgroundColor: '#4A90E2',
        opacity: 0.3,
        marginVertical: 16,
    },
    badgeText: {
        marginLeft: 6,
        fontSize: 13,
        fontWeight: '500',
    },
    //     section 2: searchBar
    containerSearch: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        height: 48,
        paddingHorizontal: 16,
        marginVertical: 10,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 4,
        elevation: 2, // Pour Android
    },
    iconSearch: {
        marginRight: 8,
    },
    inputSearch: {
        flex: 1,
        color: '#333',
        fontSize: 14,
        fontWeight: '500',
    },
    //section 3: ConsumptionCard
    wrapper: {
        marginTop: 16,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#333',
    },
    topRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconCircle: {
        backgroundColor: '#E6F0FA',
        padding: 10,
        borderRadius: 25,
        marginRight: 12,
    },
    infoSection: {
        flex: 1,
    },
    placeName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    subtitle: {
        fontSize: 13,
        color: '#7D8CA1',
        marginTop: 2,
    },
    locationBox: {
        alignItems: 'center',
    },
    locationCount: {
        fontSize: 13,
        color: '#7D8CA1',
        marginTop: 2,
    },
    badgeRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    badgeContent: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 4,
        paddingHorizontal: 10,
        borderRadius: 20,
        backgroundColor: '#F5F5F5',
    },
    orangeBadge: {
        backgroundColor: '#FFF3E0',
    },
    blueBadge: {
        backgroundColor: '#E3F2FD',
    },
});
