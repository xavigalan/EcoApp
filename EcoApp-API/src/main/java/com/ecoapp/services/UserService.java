package com.ecoapp.services;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecoapp.dtos.UserWithRoleDTO;
import com.ecoapp.entities.Role;
import com.ecoapp.entities.User;
import com.ecoapp.repository.RoleRepository;
import com.ecoapp.repository.UserRepository;

@Service
public class UserService {
	@Autowired
	UserRepository userRepository;

	@Autowired
	private RoleRepository roleRepository;
	
	public List<User> findAllUsers() {
		return userRepository.findAll();
	}

	public Optional<User> findUserById(Long id) {
		return userRepository.findById(id);
	}

	public User addUser(User user) {
		return userRepository.save(user);
	}
	
	public User updateUser(Long id, User userDetails) {
	    // Buscar el usuario actual
	    Optional<User> existingUser = userRepository.findById(id);
	    if (existingUser.isPresent()) {
	        User userToUpdate = existingUser.get();
	        
	        // Si el correo electrónico ha cambiado, verificamos si ya está en uso
	        if (!userToUpdate.getEmail().equals(userDetails.getEmail())) {
	            // Verificar si el correo electrónico ya está registrado en otro usuario (excepto el usuario actual)
	            Optional<User> existingUserByEmail = userRepository.findByEmail(userDetails.getEmail());
	            if (existingUserByEmail.isPresent()) {
	                throw new RuntimeException("El correo electrónico ya está registrado en otro usuario.");
	            }
	        }

	        // Actualiza los campos del usuario
	        userToUpdate.setFirstName(userDetails.getFirstName());
	        userToUpdate.setLastName(userDetails.getLastName());
	        userToUpdate.setEmail(userDetails.getEmail()); // Actualizar el correo electrónico solo si es válido
	        userToUpdate.setRoleId(userDetails.getRoleId());
	        userToUpdate.setPhone(userDetails.getPhone());

	        // Guardar el usuario actualizado
	        return userRepository.save(userToUpdate);
	    } else {
	        throw new RuntimeException("Usuario no encontrado con el id: " + id);
	    }
	}


	public void deleteUser(Long id) {
		if (userRepository.existsById(id)) {
			userRepository.deleteById(id);
		} else {
			throw new RuntimeException("User not found with id: " + id);
		}
	}

	public Optional<UserWithRoleDTO> findUserWithRoleById(Long userId) {
		return userRepository.findUserWithRoleById(userId);
	}

	public List<UserWithRoleDTO> findUsersByRole(Long roleId) {
	    List<User> users = userRepository.findByRoleId(roleId); // Obtén los usuarios con el roleId proporcionado

	    // Obtén el role correspondiente a `roleId`
	    Role role = roleRepository.findById(roleId).orElse(null); // Busca el role por ID

	    return users.stream()
	                .map(user -> new UserWithRoleDTO(
	                    user.getId(), 
	                    user.getFirstName(), 
	                    user.getLastName(), 
	                    user.getDni(),
	                    user.getPhone(), 
	                    user.getEmail(), 
	                    user.getCreationDate(), 
	                    role))  // Asigna el objeto Role al DTO
	                .collect(Collectors.toList());
	}

	
	public List<UserWithRoleDTO> findUsersByRoles(List<Long> roleIds) {
	    // Obtener todos los usuarios que tengan uno de los roleIds
	    List<User> users = userRepository.findByRoleIdIn(roleIds); 

	    // Obtener todos los roles correspondientes a los roleIds
	    List<Role> roles = roleRepository.findAllById(roleIds); 

	    // Crear un mapa de roleId -> Role para poder asignar el rol correspondiente a cada usuario
	    // Asumimos que un usuario tiene un solo rol, por lo que usamos roleId como clave
	    Map<Long, Role> roleMap = roles.stream()
	                                   .collect(Collectors.toMap(Role::getId, role -> role));

	    // Mapear usuarios a UserWithRoleDTO con el rol correspondiente
	    return users.stream()
	                .map(user -> {
	                    // Obtener el rol correspondiente al user
	                    Role userRole = roleMap.get(user.getRoleId()); 
	                    return new UserWithRoleDTO(
	                        user.getId(), 
	                        user.getFirstName(), 
	                        user.getLastName(), 
	                        user.getDni(),
	                        user.getPhone(), 
	                        user.getEmail(), 
	                        user.getCreationDate(), 
	                        userRole
	                    );
	                })
	                .collect(Collectors.toList());
	}



}
