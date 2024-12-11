import React from "react";

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: {
    name: string;
    email: string;
    profilePicture: string;
  };
}

const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose, user }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-80 p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">User Profile</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 focus:outline-none">
            ✖
          </button>
        </div>

        <div className="flex flex-col items-center">
          <img
            src={user.profilePicture}
            alt="Profile"
            className="w-24 h-24 rounded-full border-4 border-green-500 mb-4"
          />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">{user.name}</h3>
          <p className="text-gray-600">{user.email}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;