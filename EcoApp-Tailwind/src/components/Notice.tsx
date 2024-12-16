import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface Event {
    id: number;
    title: string;
    date: string;
    description: string;
}

const Notice: React.FC = () => {
    // Usamos el hook dentro del componente
    const { t } = useTranslation();
    
    const events: Event[] = [
        {
            id: 1,
            title: t('events.concert'), // Usar 'title' en lugar de 'concert'
            date: "2024-12-15",
            description: t('events.concertDescription'), // Usar 'description' en lugar de 'concertDescription'
        },
        {
            id: 2,
            title: t('events.beachCleanUp'),
            date: "2024-12-20",
            description: t('events.beachCleanUpDescription'),
        },
        {
            id: 3,
            title: t('events.carnivalCleanUp'),
            date: "2024-12-22",
            description:  t('events.carnivalCleanUpDescription'),
        },
    ];

    const [volunteers, setVolunteers] = useState<{ [key: number]: boolean }>({});

    const handleVolunteerClick = (eventId: number) => {
        setVolunteers((prev) => {
            const newVolunteers = { ...prev };
            // Si el evento ya tiene un voluntario, lo eliminamos (cambiar a "Cancelar Voluntariado")
            if (newVolunteers[eventId]) {
                delete newVolunteers[eventId];
            } else {
                // Si no, lo agregamos (cambiar a "Apúntate como Voluntario")
                newVolunteers[eventId] = true;
            }
            return newVolunteers;
        });
    };

    return (
        <div className="mx-auto p-6 flex flex-col items-center" style={{ height: "-webkit-fill-availablevh", width: "-webkit-fill-available", position: "fixed", zIndex: 2 }}>
            <h1 className="text-4xl font-extrabold text-gray-800 mb-6 text-center">
            {t('events.eventList')}
            </h1>
            <ul className="w-2/4">
                {events.map((event) => (
                    <li key={event.id} className="mb-6 p-4 border rounded-lg shadow-sm bg-white hover:shadow-lg transition-shadow">
                        <h2 className="text-2xl font-medium text-gray-800">{event.title}</h2>
                        <p className="text-sm text-gray-500">{event.description}</p>
                        <p className="text-sm text-gray-600 mt-2"><strong>Fecha:</strong> {event.date}</p>
                        <button
  onClick={() => handleVolunteerClick(event.id)}
  className={`mt-4 px-4 py-2 ${volunteers[event.id] ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'} text-white rounded-lg transition-colors`}
>
  {volunteers[event.id] ? t('events.buttons.cancelVolunteer') : t('events.buttons.volunteer')}
</button>

                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Notice;

