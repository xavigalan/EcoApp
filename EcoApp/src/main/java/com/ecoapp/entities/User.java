package com.ecoapp.entities;

public class User {

	private Long id;
	private String firstName;
	private String lastName;
	private String dni;
	private String phone;
	private String email;
	private String password;
	private Long roleId;
	private String creationDate;

	public User() {
	}

	public User(Long id, String firstName, String lastName, String dni, String phone, String email, String password,
			Long roleId, String creationDate) {
		this.id = id;
		this.firstName = firstName;
		this.lastName = lastName;
		this.dni = dni;
		this.phone = phone;
		this.email = email;
		this.password = password;
		this.roleId = roleId;
		this.creationDate = creationDate;
	}

	// Getters y Setters
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getDni() {
		return dni;
	}

	public void setDni(String dni) {
		this.dni = dni;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Long getRoleId() {
		return roleId;
	}

	public void setRoleId(Long roleId) {
		this.roleId = roleId;
	}

	public String getCreationDate() {
		return creationDate;
	}

	public void setCreationDate(String creationDate) {
		this.creationDate = creationDate;
	}

	@Override
	public String toString() {
		return "User{" + "id=" + id + ", firstName='" + firstName + '\'' + ", lastName='" + lastName + '\'' + ", dni='"
				+ dni + '\'' + ", phone='" + phone + '\'' + ", email='" + email + '\'' + ", password='" + password
				+ '\'' + ", roleId=" + roleId + ", creationDate='" + creationDate + '\'' + '}';
	}
}
