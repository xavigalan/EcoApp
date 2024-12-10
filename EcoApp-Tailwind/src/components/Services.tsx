import { useState, useEffect } from 'react';
import { MapServices } from '../components/MapServices';
import { ReportForm } from './ReportForm';
import { LocationMode, Report, ReportType } from '../types';

const defaultPosition: [number, number] = [41.1561, 1.1069];

function Services() {
    const [position, setPosition] = useState<[number, number]>(defaultPosition);
    const [locationMode, setLocationMode] = useState<LocationMode>('current');
    const [locationError, setLocationError] = useState<string | null>(null);
    const [reportType, setReportType] = useState<ReportType>('tree');

    useEffect(() => {
        if (locationMode === 'current') {
            if (!navigator.geolocation) {
                setLocationError('Geolocation is not supported by your browser');
                setPosition(defaultPosition);
                return;
            }

            setLocationError(null);
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    setPosition([pos.coords.latitude, pos.coords.longitude]);
                    setLocationError(null);
                },
                (error) => {
                    console.error('Geolocation error:', error);
                    setLocationError(
                        error.code === 1
                            ? 'Location access denied. Please enable location services.'
                            : 'Unable to get your location. Using default position.'
                    );
                    setPosition(defaultPosition);
                },
                {
                    enableHighAccuracy: true,
                    timeout: 5000,
                    maximumAge: 0
                }
            );
        }
    }, [locationMode]);

    const handleLocationSelect = (lat: number, lng: number) => {
        setPosition([lat, lng]);
        setLocationError(null);
    };

    const handleSubmit = async (reportData: Omit<Report, 'location'>) => {
        const report: Report = {
            ...reportData,
            location: position,
        };
        console.log('Submitting report:', report);
    };

    const handleReportTypeChange = (type: ReportType) => {
        setReportType(type);
    };

    return (
        <div className="min-h-screen bg-gray-100 py-8 px-4 " style={{position:'fixed', width:'-webkit-fill-available', height:'-webkit-fill-available'}}>
            <div className="w-full mx-auto space-y-8">
                <h1 className="text-3xl font-bold text-center text-gray-900">Services</h1>

                {/* {locationError && (
                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-yellow-700">{locationError}</p>
                            </div>
                        </div>
                    </div>
                )} */}
                <div className="grid md:grid-cols-2 gap-16 items-center h-full">
                    <div className="w-full h-[75vh]">
                        <MapServices
                            position={position}
                            locationMode={locationMode}
                            onLocationSelect={handleLocationSelect}
                            reportType={reportType}
                        />
                    </div>
                    <div className="w-full h-[75vh] flex flex-col justify-center">
                        <ReportForm
                            onLocationModeChange={setLocationMode}
                            onLocationSelect={handleLocationSelect}
                            onSubmit={handleSubmit}
                            onReportTypeChange={handleReportTypeChange}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Services;