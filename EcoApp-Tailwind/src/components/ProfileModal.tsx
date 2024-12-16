<<<<<<< HEAD
import React, { useState, useEffect } from "react";
=======
import React from "react";
>>>>>>> cbe57c1c6aee6cfa7b812827196fdb98638641a8
import { UserWithRoleDTO } from "../types/User";

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserWithRoleDTO | null;
  onUpdate: (updatedUser: Partial<UserWithRoleDTO>) => void;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose, user, onUpdate }) => {
  const initialState: Partial<UserWithRoleDTO> = {
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    phone: user?.phone || "",
    dni: user?.dni || "",
    profilePicture: user?.profilePicture || "",
  };

  const [formData, setFormData] = useState<Partial<UserWithRoleDTO>>(initialState);
  
  // 'imagePreview' será siempre un string (ya sea una URL o una URL de objeto generado)
  const [imagePreview, setImagePreview] = useState<string>(
    typeof user?.profilePicture === "string" ? user.profilePicture : ""
  );

  const [isEditing, setIsEditing] = useState<boolean>(false);

  useEffect(() => {
    if (user) {
      setFormData(initialState); // Actualizar los datos cuando el usuario cambia
      setImagePreview(user.profilePicture || "");
    }
  }, [user]);

  if (!isOpen || !user) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData({ ...formData, profilePicture: file });
      setImagePreview(URL.createObjectURL(file)); // Crear una URL para la vista previa
    }
  };

  const handleSave = () => {
    onUpdate(formData);
    setIsEditing(false); // Desactivar modo de edición
    onClose(); // Cierra el modal después de guardar
  };

  const handleEdit = () => {
    setIsEditing(true); // Activar modo de edición
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-96 p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">{isEditing ? "Edit Profile" : "Profile"}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            ✖
          </button>
        </div>

        <div className="space-y-4">
<<<<<<< HEAD
          {/* Foto de perfil */}
          <div className="text-center">
            <img
              src={imagePreview}
              alt="Profile"
              className="w-24 h-24 rounded-full mx-auto object-cover"
            />
            {isEditing && (
              <label className="block text-sm text-gray-600 mt-2">
                Change Profile Picture
                <input
                  type="file"
                  accept="image/*"
                  className="mt-1 text-sm text-gray-500"
                  onChange={handleFileChange}
                />
              </label>
            )}
          </div>

          {/* Campos del formulario */}
          <div className="space-y-4">
            {[
              { label: "First Name", name: "firstName", value: formData.firstName },
              { label: "Last Name", name: "lastName", value: formData.lastName },
              { label: "Email", name: "email", value: formData.email },
              { label: "Phone", name: "phone", value: formData.phone },
              { label: "DNI", name: "dni", value: formData.dni },
            ].map((field) => (
              <div key={field.name} className="flex flex-col">
                <label className="text-sm font-medium text-gray-500">{field.label}</label>
                <input
                  type="text"
                  name={field.name}
                  value={field.value || ""}
                  onChange={handleInputChange}
                  disabled={!isEditing} // Solo habilitar si está en modo de edición
                  className="border rounded-md p-2 text-gray-900"
                />
              </div>
            ))}
          </div>

          {/* Botones */}
          <div className="flex justify-end space-x-4">
            {isEditing ? (
              <>
                <button
                  onClick={onClose}
                  className="px-4 py-2 bg-gray-300 rounded-md text-gray-800"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-green-500 text-white rounded-md"
                >
                  Save
                </button>
              </>
            ) : (
              <button
                onClick={handleEdit}
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
              >
                Edit
              </button>
            )}
=======
          {/* User Information */}
          <div className="space-y-2">
            <InfoField label="First Name" value={user.firstName} />
            <InfoField label="Last Name" value={user.lastName} />
            <InfoField label="Email" value={user.email} />
            <InfoField label="Phone" value={user.phone} />
            <InfoField label="DNI" value={user.dni} />
            <InfoField label="Role" value={user.role.name} />
>>>>>>> cbe57c1c6aee6cfa7b812827196fdb98638641a8
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;