import React, { useState } from 'react';
import { Github, Linkedin, Mail, Users, Send } from 'lucide-react';
import { Recycle, Leaf, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';

// Team member interface
interface TeamMember {
  name: string;
  role: string;
  image: string;
  bio: string;
  github?: string;
  linkedin?: string;
  email?: string;
}

function TeamMemberCard({ name, role, image, bio, github, linkedin, email }: TeamMember) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105">
      <div className="aspect-w-3 aspect-h-4">
        <img
          src={image}
          alt={name}
          className="w-full h-[300px] object-cover"
        />
      </div>
      <div className="p-6">
        <h3 className="text-2xl font-bold text-gray-900">{name}</h3>
        <p className="text-lg font-medium text-green-600 mb-3">{role}</p>
        <p className="text-gray-600 mb-4">{bio}</p>
        
        <div className="flex space-x-4">
          {github && (
            <a href={github} className="text-gray-600 hover:text-green-600" target="_blank" rel="noopener noreferrer">
              <Github className="w-5 h-5" />
            </a>
          )}
          {linkedin && (
            <a href={linkedin} className="text-gray-600 hover:text-green-600" target="_blank" rel="noopener noreferrer">
              <Linkedin className="w-5 h-5" />
            </a>
          )}
          {email && (
            <a href={`mailto:${email}`} className="text-gray-600 hover:text-green-600">
              <Mail className="w-5 h-5" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

const teamMembers: TeamMember[] = [
  {
    name: "Alex Rivera",
    role: "Full Stack Lead Developer",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    bio: "With 10+ years of experience in full-stack development, Alex leads our technical initiatives. Expertise in React, Node.js, and cloud architecture has been crucial in developing ECOAPP's innovative recycling solutions.",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    email: "alex@ecoapp.com"
  },
  {
    name: "Sarah Chen",
    role: "Frontend Developer & UX Designer",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    bio: "Sarah brings 5 years of UX design expertise, focusing on creating intuitive and accessible interfaces. Her background in environmental science adds valuable perspective to our user-centered design approach.",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    email: "sarah@ecoapp.com"
  },
  {
    name: "Marcus Johnson",
    role: "Frontend Developer & UI Designer",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    bio: "Marcus specializes in creating beautiful, responsive interfaces with 4 years of experience in React and modern CSS frameworks. His passion for sustainable design drives our visual identity.",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    email: "marcus@ecoapp.com"
  }
];

export default function Contact() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Background Image Section */}
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
          <p className="mt-6 text-xl text-gray-100 max-w-3xl">
            {t('contact.subtitle')}
          </p>
        </div>
      </div>

      {/* Company Info Section */}
      <div className="space-y-8 max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">
            {t('contact.about.title')}
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {t('contact.about.description')}
          </p>
        </div>

        {/* Three Pillars Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 bg-white rounded-lg shadow-lg transform transition duration-300 hover:scale-105">
            <Recycle className="w-12 h-12 text-green-600 mb-4" />
            <h3 className="text-xl font-semibold mb-4">{t('contact.mission.title')}</h3>
            <p className="text-gray-600">{t('contact.mission.description')}</p>
          </div>

          <div className="p-8 bg-white rounded-lg shadow-lg transform transition duration-300 hover:scale-105">
            <Leaf className="w-12 h-12 text-green-600 mb-4" />
            <h3 className="text-xl font-semibold mb-4">{t('contact.whatWeDo.title')}</h3>
            <p className="text-gray-600">{t('contact.whatWeDo.description')}</p>
          </div>

          <div className="p-8 bg-white rounded-lg shadow-lg transform transition duration-300 hover:scale-105">
            <Globe className="w-12 h-12 text-green-600 mb-4" />
            <h3 className="text-xl font-semibold mb-4">{t('contact.impact.title')}</h3>
            <p className="text-gray-600">{t('contact.impact.description')}</p>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <Users className="w-12 h-12 text-green-600" />
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{t('contact.team.title')}</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t('contact.team.subtitle')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <TeamMemberCard key={member.name} {...member} />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <main className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-lg mx-auto w-full">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('contact.form.title')}</h2>
            <form onSubmit={handleSubmit} className="space-y-6 w-full">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  {t('contact.form.name')}
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 bg-white p-2"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  {t('contact.form.email')}
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 bg-white p-2"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  {t('contact.form.message')}
                </label>
                <textarea
                  id="message"
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 bg-white p-2"
                  required
                />
              </div>

              <button
                type="submit"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 w-full"
              >
                <Send className="w-4 h-4 mr-2" />
                {t('contact.form.send')}
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}