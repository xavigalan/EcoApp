package com.ecoapp.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ecoapp.dtos.UserWithRoleDTO;
// import com.ecoapp.entities.Role;
import com.ecoapp.entities.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
	 @Query("SELECT new com.ecoapp.dtos.UserWithRoleDTO(u.id, u.firstName, u.lastName, u.dni, u.phone, u.email, u.creationDate, r) " +
	           "FROM User u JOIN Role r ON u.roleId = r.id " +
	           "WHERE u.id = :userId")
	    Optional<UserWithRoleDTO> findUserWithRoleById(@Param("userId") Long userId);
	 
	    List<User> findByRoleId(Long roleId);  // Método para obtener usuarios por ID de rol
	    
	    public List<User> findByRoleIdIn(List<Long> roleIds);

}
