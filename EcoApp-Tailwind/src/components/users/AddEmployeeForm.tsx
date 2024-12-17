import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ArrowLeft, Save } from 'lucide-react';
import { Role, UserFormData } from '../../types/User';
import { FormErrors } from '../../types/FormErrors';
import { registerUser, fetchRoles } from '../../api/users';
import FormInput from '../forms/FormInput';
import RoleSelect from '../forms/RoleSelect';
import { useTranslation } from 'react-i18next';
import {
  validateDNI,
  validatePhone,
  validateEmail,
  validatePassword,
  validateName,
} from '../../utils/validaitons';

const initialFormData: UserFormData = {
  firstName: '',
  lastName: '',
  dni: '',
  phone: '',
  email: '',
  password: '',
  roleId: '',
};

const initialErrors: FormErrors = {
  firstName: '',
  lastName: '',
  dni: '',
  phone: '',
  email: '',
  password: '',
  roleId: '',
};

const AddEmployeeForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [roles, setRoles] = useState<Role[]>([]);
  const [formData, setFormData] = useState<UserFormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>(initialErrors);

  useEffect(() => {
    const loadRoles = async () => {
      try {
        const rolesData = await fetchRoles();
        setRoles(rolesData);
      } catch (error) {
        toast.error(t('employees.failedRoles'));
      }
    };

    loadRoles();
  }, [t]);

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case 'firstName':
      case 'lastName':
        return validateName(value, name === 'firstName' ? 'First name' : 'Last name');
      case 'dni':
        return validateDNI(value);
      case 'phone':
        return validatePhone(value);
      case 'email':
        return validateEmail(value);
      case 'password':
        return validatePassword(value);
      default:
        return '';
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));

    // Validate field on change
    const error = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error,
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {
      firstName: validateName(formData.firstName, 'First name'),
      lastName: validateName(formData.lastName, 'Last name'),
      dni: validateDNI(formData.dni),
      phone: validatePhone(formData.phone),
      email: validateEmail(formData.email),
      password: validatePassword(formData.password),
      roleId: formData.roleId ? '' : 'Role is required',
    };

    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error !== '');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error('Please fix the errors before submitting.');
      return;
    }

    try {
      const response = await registerUser(formData);
      console.log('Usuario creado correctamente:', response);
      toast.success('¡Usuario creado con éxito!');
      navigate('/employees');
    } catch (error) {
      console.error('Error en el registro:', error);
      toast.error('Error en el registro del usuario');
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
            {t('employees.back')}
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="sm:mx-auto sm:w-full">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
              {t('employees.addNew')}
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <FormInput
                label={t('employees.firstName')}
                name="firstName"
                type="text"
                value={formData.firstName}
                onChange={handleChange}
                error={errors.firstName}
              />
              <FormInput
                label={t('employees.lastName')}
                name="lastName"
                type="text"
                value={formData.lastName}
                onChange={handleChange}
                error={errors.lastName}
              />
              <FormInput
                label={t('employees.dni')}
                name="dni"
                type="text"
                value={formData.dni}
                onChange={handleChange}
                error={errors.dni}
              />
              <FormInput
                label={t('employees.phone')}
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                error={errors.phone}
              />
              <FormInput
                label={t('employees.email')}
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
              />
              <FormInput
                label={t('employees.password')}
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
              />
              <RoleSelect
                roles={roles}
                value={formData.roleId}
                onChange={handleChange}
                error={errors.roleId}
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-200 shadow-sm"
              >
                <Save className="w-5 h-5 mr-2" />
                {t('employees.save')}
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