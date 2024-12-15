import React from "react";
import { UserWithRoleDTO } from "../types/User";

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserWithRoleDTO | null;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose, user }) => {
  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-96 p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">User Profile</h2>
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            ✖
          </button>
        </div>

        <div className="space-y-4">
          {/* User Information */}
          <div className="space-y-2">
            <InfoField label="First Name" value={user.firstName} />
            <InfoField label="Last Name" value={user.lastName} />
            <InfoField label="Email" value={user.email} />
            <InfoField label="Phone" value={user.phone} />
            <InfoField label="DNI" value={user.dni} />
            <InfoField label="Role" value={user.role.name} />
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper component for displaying field information
const InfoField: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="flex flex-col">
    <span className="text-sm font-medium text-gray-500">{label}</span>
    <span className="text-base text-gray-900">{value || '-'}</span>
  </div>
);

export default ProfileModal;
