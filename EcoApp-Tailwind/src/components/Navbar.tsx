import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";

const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userProfile, setUserProfile] = useState<string | null>(null);


    const handleLogin = () => {
        setIsLoggedIn(true);
        setUserProfile("/images/profile-pic.jpg");  // Aquí se setea la foto de perfil
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setUserProfile(null);
    };


    const handleLinkClick = () => {
        setIsOpen(false);  
    };

    return (
        <nav className="bg-green-800 text-white">
            <div className="px-6">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0 drop-shadow-yellow-glow">
                        <Link to="/"
                        onClick={handleLinkClick}>
                            <img
                              alt="EcoApp"
                              src="/images/LogoSolo.png"
                              className="h-10 w-auto"
                            />
                        </Link>
                    </div>

                    {/* Desktop Links */}
                    <div className="hidden md:flex space-x-12">
                        <a
                            href="/services"
                            className="text-white hover:text-white hover:bg-green-700 p-2 rounded-md text-sm font-medium"
                        >
                            Services
                        </a>
                        <a
                            href="/about"
                            className="text-white hover:text-white hover:bg-green-700 p-2 rounded-md text-sm font-medium"
                        >
                            Notice
                        </a>
                        <a
                            href="/about"
                            className="text-white hover:text-white hover:bg-green-700 p-2 rounded-md text-sm font-medium"
                        >
                            Contact
                        </a>
                        <a
                            href="/about"
                            className="text-white hover:text-white hover:bg-green-700 p-2 rounded-md text-sm font-medium"
                        >
                            Employees
                        </a>
                        <a
                            href="/about"
                            className="text-white hover:text-white hover:bg-green-700 p-2 rounded-md text-sm font-medium"
                        >
                            Points
                        </a>
                    </div>
                    <div className="hidden md:flex pt-5 pb-5 space-x-10">
                        <Link to="/login" className="text-white hover:text-white hover:bg-green-700 p-2 rounded-md text-sm font-medium">
                            Login
                        </Link>
                        <Link to="/register" className="text-white hover:text-white hover:bg-green-700 p-2 rounded-md text-sm font-medium">
                            Register
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md bg-green-800 text-white hover:text-white hover:bg-green-700 focus:outline-none"
                        >
                            <span className="sr-only">Open main menu</span>
                            {isOpen ? (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Links with Animation */}
            <div
  className={`${
    isOpen ? "max-h-screen opacity-100 visibility-visible" : "max-h-0 opacity-0 visibility-hidden pointer-events-none"
  } transition-all ease-in-out duration-300 md:hidden bg-green-800`}
  style={{
    position: "fixed",
    zIndex: 10,
    width: "100%", // Asegura que ocupe todo el ancho
  }}
>
  <div className="space-y-1 px-2 pb-3 pt-2">
    <a
      href="/services"
      className="text-white block px-3 p-2 rounded-md text-base font-medium hover:text-white hover:bg-green-700"
      onClick={handleLinkClick} // Cerrar menú al hacer clic
    >
      Services
    </a>
    <a
      href="/about"
      className="text-white block px-3 p-2 rounded-md text-base font-medium hover:text-white hover:bg-green-700"
      onClick={handleLinkClick} // Cerrar menú al hacer clic
    >
      Notice
    </a>
    <a
      href="/about"
      className="text-white block px-3 p-2 rounded-md text-base font-medium hover:text-white hover:bg-green-700"
      onClick={handleLinkClick} // Cerrar menú al hacer clic
    >
      Contact
    </a>
    <a
      href="/about"
      className="text-white block px-3 p-2 rounded-md text-base font-medium hover:text-white hover:bg-green-700"
      onClick={handleLinkClick} // Cerrar menú al hacer clic
    >
      Employees
    </a>
    <a
      href="/about"
      className="text-white block px-3 p-2 rounded-md text-base font-medium hover:text-white hover:bg-green-700"
      onClick={handleLinkClick} // Cerrar menú al hacer clic
    >
      Points
    </a>
  </div>

  <div className="space-y-1 px-2 pb-3 pt-2">
    <Link
      to="/login"
      className="text-white block px-3 p-2 rounded-md text-base font-medium hover:text-white hover:bg-green-700"
      onClick={handleLinkClick} // Cerrar menú al hacer clic
    >
      Login
    </Link>
    <Link
      to="/register"
      className="text-white block px-3 p-2 rounded-md text-base font-medium hover:text-white hover:bg-green-700"
      onClick={handleLinkClick} // Cerrar menú al hacer clic
    >
      Register
    </Link>
  </div>
</div>
        </nav>
    );
};

export default Navbar;