const NOMINATIM_BASE_URL = 'https://nominatim.openstreetmap.org';

export async function searchAddress(query: string): Promise<Array<{
  display_name: string;
  lat: number;
  lon: number;
}>> {
  const params = new URLSearchParams({
    q: query,
    format: 'json',
    limit: '5',
    countrycodes: 'es'
  });

  const response = await fetch(`${NOMINATIM_BASE_URL}/search?${params}`);
  const data = await response.json();
  
  return data.map((item: any) => ({
    display_name: item.display_name,
    lat: parseFloat(item.lat),
    lon: parseFloat(item.lon)
  }));
}