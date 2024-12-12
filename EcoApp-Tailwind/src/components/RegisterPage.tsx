import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom"; // Importa useNavigate
import Cookies from "js-cookie";

export default function RegisterPage() {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [dni, setDni] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [roleId, setRoleId] = useState("3");

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

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
            // Enviar datos al backend
            const response = await fetch("http://localhost:8080/users", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user), // Convertir el objeto en JSON
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
            const data = await response.json();

            Cookies.set("userSession", email, { expires: 7 });

            toast.success("Registration successful!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });

            window.location.href = "/";

            setFirstName("");
            setLastName("");
            setDni("");
            setPhone("");
            setEmail("");
            setPassword("");
            setRoleId("3");

        } catch (error) {
            console.error("Error during registration:", error);
            toast.error("An error occurred during registration.");
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
                        Sign up
                    </h2>
                </div>
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* First Name */}
                        <div className="flex space-x-4">
                            <div className="flex-1">
                                <label htmlFor="first-name" className="block text-sm font-medium text-gray-900">
                                    First Name
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
                            </div>
                            <div className="flex-1">
                                <label htmlFor="last-name" className="block text-sm font-medium text-gray-900">
                                    Last Name
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
                            </div>
                        </div>

                        {/* DNI and Phone */}
                        <div className="flex space-x-4">
                            <div className="flex-1">
                                <label htmlFor="dni" className="block text-sm font-medium text-gray-900">
                                    DNI
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
                            </div>
                            <div className="flex-1">
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-900">
                                    Phone
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
                            </div>
                        </div>

                        {/* Email */}
                        <div>
                            <label htmlFor="email" className="block text-left text-sm font-medium text-gray-900">
                                Email address
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-900">
                                Password
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
                        </div>

                        {/* Submit Button */}
                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                            >
                                Sign up
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <ToastContainer />
        </>
    );
}