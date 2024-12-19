import React, { useState, useEffect } from 'react';
import { UserFormDataCard, Role } from '../../types/User';
import { Mail, Phone, Calendar, BadgeCheck, Edit2, Trash2, X, Check } from 'lucide-react';
import { toast } from 'react-toastify';
import { updateUser, deleteUser, fetchRoles } from '../../api/users';

interface EmployeeCardProps {
  user: UserFormDataCard;
  index: number;
  onDelete: (id: number) => void;
}

const EmployeeCard: React.FC<EmployeeCardProps> = ({ user, index, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [users, setUsers] = useState<UserFormDataCard[]>([]);
  const [editData, setEditData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone,
    roleId: user.role.id.toString(), // Convertimos el ID a string
  });

  const [roles, setRoles] = useState<Role[]>([]);

  useEffect(() => {
    // Fetch roles when component mounts
    const loadRoles = async () => {
      try {
        const fetchedRoles = await fetchRoles();
        setRoles(fetchedRoles);
      } catch (error) {
        toast.error('Failed to load roles');
      }
    };
    loadRoles();
  }, []);

  const handleEdit = async () => {
    if (isEditing) {
      try {
        const updatedData = { ...editData, id: user.id }; // Incluye el ID del usuario
        await updateUser(user.id, updatedData);
        toast.success('Employee updated successfully');
        setIsEditing(false);
      } catch (error) {
        toast.error(error.message || 'Failed to update employee');
      }
    } else {
      setIsEditing(true);
    }
  };
  

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        await deleteUser(user.id);
        toast.success('Employee deleted successfully');
        onDelete(user.id);
      } catch (error) {
        toast.error('Failed to delete employee');
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="aspect-w-16 aspect-h-9 mb-4">
        {/* Mostrar imagen del usuario o imagen por defecto */}
        <img
          src={user.profilePicture ? user.profilePicture : `https://source.unsplash.com/400x400/?professional,headshot&sig=${index}`}
          alt={`${user.firstName} ${user.lastName}`}
          className="w-full h-48 object-cover rounded-lg"
        />
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          {isEditing ? (
            <div className="flex-1 mr-4">
              <input
                type="text"
                name="firstName"
                value={editData.firstName}
                onChange={handleChange}
                className="w-full px-2 py-1 border rounded mb-2"
                placeholder="First Name"
              />
              <input
                type="text"
                name="lastName"
                value={editData.lastName}
                onChange={handleChange}
                className="w-full px-2 py-1 border rounded"
                placeholder="Last Name"
              />
            </div>
          ) : (
            <h3 className="text-xl font-semibold text-gray-900">
              {`${user.firstName} ${user.lastName}`}
            </h3>
          )}
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
            <BadgeCheck className="w-4 h-4 mr-1" />
            {user.role.name}
          </span>
        </div>

        <div className="space-y-3">
          <div className="flex items-center text-gray-600">
            <Mail className="w-4 h-4 mr-2" />
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={editData.email}
                onChange={handleChange}
                className="flex-1 px-2 py-1 border rounded"
                placeholder="Email"
              />
            ) : (
              <span className="text-sm">{user.email}</span>
            )}
          </div>

          <div className="flex items-center text-gray-600">
            <Phone className="w-4 h-4 mr-2" />
            {isEditing ? (
              <input
                type="tel"
                name="phone"
                value={editData.phone}
                onChange={handleChange}
                className="flex-1 px-2 py-1 border rounded"
                placeholder="Phone"
              />
            ) : (
              <span className="text-sm">{user.phone}</span>
            )}
          </div>

          <div className="flex items-center text-gray-600">
            <Calendar className="w-4 h-4 mr-2" />
            <span className="text-sm">
              {new Date(user.creationDate).toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
          </div>

          {isEditing && (
            <div className="flex items-center text-gray-600">
              <label htmlFor="role" className="mr-2 text-sm font-medium text-gray-700">
                Role:
              </label>
              <select
                id="role"
                name="roleId"
                value={editData.roleId}
                onChange={handleChange}
                className="flex-1 px-2 py-1 border rounded"
              >
                {roles.map((role) => (
                  <option key={role.id} value={role.id}>
                    {role.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="flex justify-end space-x-2 pt-4 border-t">
            <button
              onClick={handleEdit}
              className={`p-2 rounded-full ${isEditing
                ? 'text-green-600 hover:text-green-700 bg-green-50 hover:bg-green-100'
                : 'text-yellow-600 hover:text-yellow-700 bg-yellow-50 hover:bg-yellow-100'
                }`}
              title={isEditing ? 'Save' : 'Edit'}
            >
              {isEditing ? <Check className="w-5 h-5" /> : <Edit2 className="w-5 h-5" />}
            </button>
            {isEditing ? (
              <button
                onClick={() => {
                  setIsEditing(false);
                  setEditData({
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    phone: user.phone,
                    roleId: user.role.id.toString(),
                  });
                }}
                className="p-2 text-gray-600 hover:text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-full"
                title="Cancel"
              >
                <X className="w-5 h-5" />
              </button>
            ) : (
              <button
                onClick={handleDelete}
                className="p-2 text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 rounded-full"
                title="Delete"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeCard;
