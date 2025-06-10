export interface GeocodingService {
    reverseGeocode(latitude: number, longitude: number): Promise<{ address?: string }>;
}
