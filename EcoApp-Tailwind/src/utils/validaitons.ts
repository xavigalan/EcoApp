// Utility functions for form validation
export const validateDNI = (dni: string): string => {
    return /^\d{8}[A-Za-z]$/.test(dni) ? '' : 'DNI must be exactly 9 digits.';
  };
  
  export const validatePhone = (phone: string): string => {
    return /^\d{9}$/.test(phone) ? '' : 'Phone number must be exactly 9 digits.';
  };
  
  export const validateEmail = (email: string): string => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) 
      ? '' 
      : 'Invalid email format.';
  };
  
  export const validatePassword = (password: string): string => {
    return password.length >= 8 
      ? '' 
      : 'Password must be at least 8 characters long.';
  };
  
  export const validateName = (name: string, field: string): string => {
    return name.length <= 50 
      ? '' 
      : `${field} is too long (max 50 characters).`;
  };