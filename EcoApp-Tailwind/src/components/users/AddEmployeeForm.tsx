import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';
import { ArrowLeft, Save } from 'lucide-react';
import { Role, UserFormData } from '../../types/User';
import { registerUser, fetchRoles } from '../../api/users';
import FormInput from '../forms/FormInput';
import RoleSelect from '../forms/RoleSelect';

const initialFormData: UserFormData = {
  firstName: '',
  lastName: '',
  dni: '',
  phone: '',
  email: '',
  password: '',
  roleId: '',
};

const AddEmployeeForm = () => {
  const navigate = useNavigate();
  const [roles, setRoles] = useState<Role[]>([]);
  const [formData, setFormData] = useState<UserFormData>(initialFormData);

  useEffect(() => {
    const loadRoles = async () => {
      try {
        const rolesData = await fetchRoles();
        setRoles(rolesData);
      } catch (error) {
        toast.error('Failed to load roles. Please try again later.');
      }
    };

    loadRoles();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await registerUser(formData);
      
      // Set cookies
      Cookies.set('userToken', response.token, { expires: 7 });
      Cookies.set('userId', response.userId, { expires: 7 });
      Cookies.set('userSession', response.token, { expires: 7 });

      toast.success('Employee registered successfully!');
      setTimeout(() => navigate('/'), 2000);
    } catch (error) {
      toast.error('Failed to register employee. Please try again.');
      console.error('Registration error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center text-gray-600 hover:text-gray-800"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Employees
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="sm:mx-auto sm:w-full">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
              Add New Employee
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <FormInput
                label="First Name"
                name="firstName"
                type="text"
                value={formData.firstName}
                onChange={handleChange}
              />
              <FormInput
                label="Last Name"
                name="lastName"
                type="text"
                value={formData.lastName}
                onChange={handleChange}
              />
              <FormInput
                label="DNI"
                name="dni"
                type="text"
                value={formData.dni}
                onChange={handleChange}
              />
              <FormInput
                label="Phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
              />
              <FormInput
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
              />
              <FormInput
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
              />
              <RoleSelect
                roles={roles}
                value={formData.roleId}
                onChange={handleChange}
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-200 shadow-sm"
              >
                <Save className="w-5 h-5 mr-2" />
                Save Employee
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddEmployeeForm;