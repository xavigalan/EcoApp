import React from 'react';
import { UserPlus } from 'lucide-react';
import { Link } from 'react-router-dom';

const AddEmployeeButton = () => {
  return (
    <Link
      to="/add/employees"
      className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 shadow-sm"
    >
      <UserPlus className="w-5 h-5 mr-2" />
      Add New Employee
    </Link>
  );
};

export default AddEmployeeButton;