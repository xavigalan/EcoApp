export interface TypePoint {
  id: number;
  name: string;
  description: string;
}

export interface MapPoint {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  description: string;
  typePoint: TypePoint;
}

export interface MapPointFormData {
  name: string;
  latitude: number;
  longitude: number;
  description: string;
  typePoint: TypePoint;
}

export interface PointFormData {
  name: string;
  typePointId: string;
  latitude: number;
  longitude: number;
  description: string;
}