import React, { useState } from 'react';
import { Github, Linkedin, Mail, Users, Send } from 'lucide-react';
import { Recycle, Leaf, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Contact() {
  const { t } = useTranslation();

  // State for the contact form
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const teamMembers = [
    {
      name: 'Xavi Galán',
      role: t('contact.team.members.alex.role'),
      image: '/assets/xavi.png',
      bio: t('contact.team.members.alex.bio'),
      github: 'https://github.com/xavigalan',
      linkedin: 'https://www.linkedin.com/in/xavigalan/',
      email: 'xavier.galan.perez@gmail.com',
    },
    {
      name: 'Sarah Chen',
      role: t('contact.team.members.sarah.role'),
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      bio: t('contact.team.members.sarah.bio'),
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
      email: 'sarah@ecoapp.com',
    },
    {
      name: 'Marcus Johnson',
      role: t('contact.team.members.marcus.role'),
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      bio: t('contact.team.members.marcus.bio'),
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
      email: 'marcus@ecoapp.com',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative">
        <div className="absolute inset-0">
          <img
            className="w-full h-[400px] object-cover"
            src="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
            alt="Recycling facility"
          />
          <div className="absolute inset-0 bg-green-700 mix-blend-multiply" />
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            {t('contact.title')}
          </h1>
          <p className="mt-6 text-xl text-gray-100 max-w-3xl">{t('contact.subtitle')}</p>
        </div>
      </div>

      {/* About Us Section */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold text-gray-900">{t('contact.about.title')}</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">{t('contact.about.description')}</p>
        </div>
      </div>

      {/* Three Pillars Section */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: t('contact.mission.title'),
              description: t('contact.mission.description'),
              icon: <Recycle className="w-12 h-12 text-green-600 mb-4" />,
            },
            {
              title: t('contact.whatWeDo.title'),
              description: t('contact.whatWeDo.description'),
              icon: <Leaf className="w-12 h-12 text-green-600 mb-4" />,
            },
            {
              title: t('contact.impact.title'),
              description: t('contact.impact.description'),
              icon: <Globe className="w-12 h-12 text-green-600 mb-4" />,
            },
          ].map((pillar) => (
            <div
              key={pillar.title}
              className="p-8 bg-white rounded-lg shadow-lg transform transition duration-300 hover:scale-105"
            >
              {pillar.icon}
              <h3 className="text-xl font-semibold mb-4">{pillar.title}</h3>
              <p className="text-gray-600">{pillar.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Team Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">{t('contact.team.title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <div
                key={member.name}
                className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105"
              >
                <div className="aspect-w-3 aspect-h-4">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-[300px] object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold">{member.name}</h3>
                  <p className="text-gray-600 mb-2">{member.role}</p>
                  <p className="text-sm text-gray-500 mb-2">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">{t('contact.form.title')}</h2>
          <p className="text-lg text-gray-600">
            <strong>Teléfono:</strong> <a href="tel:+34678173240" className="text-blue-500 hover:underline">678 173 250</a>
          </p>
          <p className="text-lg text-gray-600">
            <strong>Correo Electrónico:</strong> <a href="mailto:ecoapp@gmail.com" className="text-blue-500 hover:underline">ecoapp@gmail.com</a>
          </p>
        </div>
      </section>
    </div>
  );
}
