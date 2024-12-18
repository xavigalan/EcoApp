import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useTranslation } from 'react-i18next';

export default function RegisterPage() {
    const { t } = useTranslation();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [dni, setDni] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [roleId, setRoleId] = useState("3");

    const [errors, setErrors] = useState({
        firstName: "",
        lastName: "",
        dni: "",
        phone: "",
        email: "",
        password: "",
    });

    // Función para validar los campos
    const validateFields = () => {
        const newErrors = {
            firstName: firstName.length > 50 ? t('register.firstNameLength') : "",
            lastName: lastName.length > 50 ? t('register.lastNameLength') : "",
            dni: !/^\d{8}$/.test(dni) ? t('register.invalidDni') : "",
            phone: !/^\d{9}$/.test(phone) ? t('register.invalidPhone') : "",
            email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? t('register.invalidEmail') : "",
            password: password.length < 8 ? t('register.passwordLength') : "",
        };

        setErrors(newErrors);

        // Si hay errores, no permite el envío
        return Object.values(newErrors).every((error) => error === "");
    };

    // Función para manejar el envío del formulario
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validar campos antes de enviar
        if (!validateFields()) {
            toast.error(t('register.toastError'));
            return;
        }

        const user = {
            firstName,
            lastName,
            dni,
            phone,
            email,
            password,
            roleId,
        };

        try {
            // Haciendo la solicitud al backend
            const response = await fetch("http://localhost:8080/users", {
                method: "POST",  // Usar POST en lugar de PUT para registro de usuario
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
            });

            if (!response.ok) {
                const errorData = await response.json();
                toast.error(errorData.message || t('register.toastErrorRegistration'));
                return;
            }

            const data = await response.json();

            // Almacenar en cookies
            Cookies.set(
                "userSession",
                JSON.stringify({ id: data.id, email: data.email, roleId: data.roleId }),
                { expires: 7 }
            );

            toast.success(t('register.toastSuccess'), {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });

            window.location.href = "/";  // Redirigir a la página principal
        } catch (error) {
            console.error("Error durante el registro:", error);
            toast.error(t('register.toastErrorRegistration'));
        }
    };

    return (
        <>
            <div
                className="flex flex-col justify-center items-center"
                style={{
                    height: "-webkit-fill-available",
                    width: "-webkit-fill-available",
                    position: "fixed",
                    zIndex: 2,
                }}
            >
                <div className="sm:mx-auto sm:w-full">
                    <img
                        alt="EcoApp"
                        src="/images/LogoSolo.png"
                        className="mx-auto h-20"
                    />
                    <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
                        {t('register.sign_up')}
                    </h2>
                </div>
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* First Name */}
                        <div className="flex space-x-4">
                            <div className="flex-1">
                                <label htmlFor="first-name" className="block text-sm font-medium text-gray-900">
                                    {t('register.first_name')}
                                </label>
                                <input
                                    id="first-name"
                                    name="first-name"
                                    type="text"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm"
                                />
                                {errors.firstName && (
                                    <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
                                )}
                            </div>
                            <div className="flex-1">
                                <label htmlFor="last-name" className="block text-sm font-medium text-gray-900">
                                    {t('register.last_name')}
                                </label>
                                <input
                                    id="last-name"
                                    name="last-name"
                                    type="text"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm"
                                />
                                {errors.lastName && (
                                    <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                                )}
                            </div>
                        </div>

                        {/* DNI and Phone */}
                        <div className="flex space-x-4">
                            <div className="flex-1">
                                <label htmlFor="dni" className="block text-sm font-medium text-gray-900">
                                    {t('register.dni')}
                                </label>
                                <input
                                    id="dni"
                                    name="dni"
                                    type="text"
                                    value={dni}
                                    onChange={(e) => setDni(e.target.value)}
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm"
                                />
                                {errors.dni && (
                                    <p className="text-red-500 text-sm mt-1">{errors.dni}</p>
                                )}
                            </div>
                            <div className="flex-1">
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-900">
                                    {t('register.phone')}
                                </label>
                                <input
                                    id="phone"
                                    name="phone"
                                    type="tel"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm"
                                />
                                {errors.phone && (
                                    <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                                )}
                            </div>
                        </div>

                        {/* Email */}
                        <div>
                            <label htmlFor="email" className="block text-left text-sm font-medium text-gray-900">
                                {t('login.email_address')}
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm"
                            />
                            {errors.email && (
                                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                            )}
                        </div>

                        {/* Password */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-900">
                                {t('register.password')}
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm"
                            />
                            {errors.password && (
                                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                            >
                                {t('register.submit')}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <ToastContainer />
        </>
    );
}