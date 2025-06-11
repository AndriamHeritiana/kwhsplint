import { GeocodingService } from '@/core/data/services/GeocodingService';

export class NominatimGeocodingService implements GeocodingService {
    async reverseGeocode(latitude: number, longitude: number): Promise<{ address?: string }> {
        try {
            // Validate latitude and longitude
            if (latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180) {
                console.error('Invalid coordinates:', { latitude, longitude });
                return { address: undefined };
            }

            const response = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`,
                {
                    headers: {
                        'User-Agent': 'MyReactNativeApp/1.0 (contact@myapp.com)',
                    },
                }
            );

            if (!response.ok) {
                const errorText = await response.text();
                console.error(`Nominatim API error: Status ${response.status}, Body: ${errorText}`);
                return { address: undefined };
            }

            const data = await response.json();
            console.log('Nominatim API response:', data);

            if (data.error) {
                console.error('Nominatim API returned an error:', data.error);
                return { address: undefined };
            }

            const address = data.display_name || undefined;
            console.log('Reverse geocoding successful:', { address });
            return { address };
        } catch (error: any) {
            console.error('Reverse geocoding failed:', error.message);
            return { address: undefined };
        }
    }
}
