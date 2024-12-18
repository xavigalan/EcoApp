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
  typePoint: TypePoint; // Cambiado de string a TypePoint
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
  typeId: number;  // Cambiado de string a number
  latitude: number;
  longitude: number;
  description: string;
}


export interface MapPointUpdateDTO {
  name: string;
  latitude: number;
  longitude: number;
  description: string;
  typeId: number;
}