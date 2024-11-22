package com.ecoapp.controllers;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecoapp.entities.User;

import io.swagger.v3.oas.annotations.parameters.RequestBody;

import org.springframework.web.bind.annotation.RequestMethod;

@RestController
public class UsersController {

	@Autowired
	private JdbcTemplate jdbcTemplate;

	@RequestMapping(value = "/users", method = RequestMethod.GET)
	public List<String> getAllUsers() {
		final String GetAllUsers = "SELECT * FROM users;";

		List<Map<String, Object>> results = jdbcTemplate.queryForList(GetAllUsers);

		List<String> userList = new ArrayList<String>();

		for (Map<String, Object> row : results) {
			userList.add(row.toString());
		}
		return userList;
	}

	@RequestMapping(value = "/users/{id}", method = RequestMethod.GET)
	public String getUserById(@PathVariable("id") Long id) {
		final String GetUserById = "SELECT * FROM users WHERE id = ?;";
		Map<String, Object> result = jdbcTemplate.queryForMap(GetUserById, id);
		return result.toString();
	}

	@RequestMapping(value = "/users/role/{role_id}", method = RequestMethod.GET)
	public List<String> getUsersByRole(@PathVariable("role_id") Long role_id) {
		final String GetUserByRole = "SELECT * FROM users WHERE role_id = ?;";

		List<Map<String, Object>> results = jdbcTemplate.queryForList(GetUserByRole, role_id);

		List<String> userList = new ArrayList<>();
		for (Map<String, Object> row : results) {
			userList.add(row.toString());
		}

		return userList;
	}

	@RequestMapping(value = "/add", method = RequestMethod.POST)
	public String postNewUser(@RequestBody User newUser) {
		final String PostNewUser = "INSERT INTO users (first_name, last_name, dni, phone, email, password, role_id) "
				+ "VALUES (?, ?, ?, ?, ?, ?, ?);";

		int rowsAffected = jdbcTemplate.update(PostNewUser, newUser.getFirstName(), newUser.getLastName(),
				newUser.getDni(), newUser.getPhone(), newUser.getEmail(), newUser.getPassword(), newUser.getRoleId());

		if (rowsAffected > 0) {
			return "Usuario creado exitosamente.";
		} else {
			return "Hubo un error al crear el usuario.";
		}
	}

}
