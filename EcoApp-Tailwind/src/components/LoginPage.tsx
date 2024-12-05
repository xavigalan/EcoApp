import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Cookies from "js-cookie";
import "react-toastify/dist/ReactToastify.css";
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/20/solid';

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(!!Cookies.get("userSession"));
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Lógica de validación de login (puedes reemplazarlo con una API real)
        if (email === "user@user.com" && password === "123") {
            setIsLoggedIn(true);
            toast.success('🦄 Welcome!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light"
            });  // Notificación de éxito

            Cookies.set("userSession", email, { expires: 7 });
            // Forzar la recarga
            window.location.href = "/";
        } else {
            toast.error("Invalid email or password.");  // Notificación de error
        }
    };

    // Si el usuario está logueado, redirigimos a la página principal
    if (isLoggedIn) {
        return <Navigate to="/" />;
    }

    return (
        <div className="flex flex-col justify-center items-center" style={{ height: "100vh", width: "100vw", position: "fixed", zIndex: 2 }}>
            <div className="sm:mx-auto sm:w-full">
                <img alt="EcoApp" src="/images/LogoSolo.png" className="mx-auto h-20" />
                <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">Sign in to your account</h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-left text-sm font-medium text-gray-900">Email address</label>
                        <div className="mt-2">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                autoComplete="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-900">Password</label>
                        </div>
                        <div className="mt-2 relative">
                            <input
                                id="password"
                                name="password"
                                type={showPassword ? "text" : "password"} // Condicional para cambiar el tipo de input
                                required
                                autoComplete="current-password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)} // Alternar el estado para mostrar/ocultar la contraseña
                                className="absolute inset-y-0 right-0 flex items-center pr-3"
                            >
                                {showPassword ? (
                                    <EyeSlashIcon className="h-5 w-5 text-gray-500" />
                                ) : (
                                    <EyeIcon className="h-5 w-5 text-gray-500" />
                                )}
                            </button>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                        >
                            Sign in
                        </button>
                        <div className="text-sm mt-4 me-4 text-right">
                                <a href="#" className="font-semibold text-green-600 hover:text-green-500">Forgot password?</a>
                            </div>
                    </div>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
};

export default LoginPage;