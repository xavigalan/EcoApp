import React, { useEffect, useState } from 'react';
import { UserWithRoleDTO } from '../../types/User';
import { Users, Loader2 } from 'lucide-react';
import { toast } from 'react-toastify';
import AddEmployeeButton from './AddEmployeeButton';
import RoleFilter from '../filters/RoleFilter';
import SearchBar  from '../filters/SearchBar';
import EmployeeCard from './EmployeeCard';
import { fetchUsers } from '../../api/users';

const Employees = () => {
  const [users, setUsers] = useState<UserWithRoleDTO[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedRoles, setSelectedRoles] = useState<number[]>([1, 2, 3, 4]);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const loadUsers = async () => {
    try {
      const data = await fetchUsers(selectedRoles);
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error('Failed to load employees');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, [selectedRoles]);

  const handleRoleToggle = (roleId: number) => {
    setSelectedRoles(prev => {
      if (prev.includes(roleId)) {
        if (prev.length === 1) return prev;
        return prev.filter(id => id !== roleId);
      }
      return [...prev, roleId];
    });
  };

  const handleDelete = (userId: number) => {
    setUsers(prev => prev.filter(user => user.id !== userId));
  };

  const filteredUsers = users.filter(user => {
    const searchLower = searchTerm.toLowerCase();
    return (
      user.firstName.toLowerCase().includes(searchLower) ||
      user.lastName.toLowerCase().includes(searchLower) ||
      user.email.toLowerCase().includes(searchLower) ||
      user.role.name.toLowerCase().includes(searchLower)
    );
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Our Team</h2>
            <p className="mt-2 text-gray-600">Meet our talented team members</p>
          </div>
          <div className="flex items-center space-x-4">
            <AddEmployeeButton />
            <Users className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        <div className="mb-8">
          <RoleFilter
            selectedRoles={selectedRoles}
            onRoleToggle={handleRoleToggle}
          />
          <SearchBar
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
          />
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredUsers.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <Users className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No users found</h3>
              <p className="mt-1 text-sm text-gray-500">
                Try adjusting your search or filter criteria
              </p>
            </div>
          ) : (
            filteredUsers.map((user, index) => (
              <EmployeeCard
                key={user.id}
                user={user}
                index={index}
                onDelete={handleDelete}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Employees;