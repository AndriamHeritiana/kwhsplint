export const parseAddress = (address?: string): { residence: string; city: string } => {
    if (!address) {
        return { residence: '', city: '' };
    }

    const addressParts = address.split(',');
    const residence = addressParts.length > 0 ? addressParts[0].trim() : '';
    const city = addressParts.length > 1 ? addressParts[1].trim() : '';

    return { residence, city };
};
