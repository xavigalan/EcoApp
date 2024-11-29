import React, { useState } from "react";

const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-green-800 text-white fixed top-0 left-0 w-full z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* Logo */}
              <div className="flex-shrink-0">
                <img
                  alt="EcoApp"
                  src="/images/LogoSolo.png"
                  className="mx-auto px-3 h-10 w-auto"
                />
              </div>

              {/* Desktop Links */}
              <div className="hidden md:flex space-x-4">
                <a
                  href="/"
                  className="text-white hover:text-white hover:bg-green-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Services
                </a>
                <a
                  href="/contacto"
                  className="text-white hover:text-white hover:bg-green-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Home
                </a>
                <a
                  href="/about"
                  className="text-white hover:text-white hover:bg-green-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Notice
                </a>
                <a
                  href="/about"
                  className="text-white hover:text-white hover:bg-green-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Contact
                </a>
                <a
                  href="/about"
                  className="text-white hover:text-white hover:bg-green-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Employees
                </a>
                <a
                  href="/about"
                  className="text-white hover:text-white hover:bg-green-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Points
                </a>
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
              isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
            } transition-all ease-in-out duration-300 overflow-hidden md:hidden`}
          >
            <div className="space-y-1 px-2 pb-3 pt-2">
              <a
                href="/"
                className="text-white block px-3 py-2 rounded-md text-base font-medium hover:text-white hover:bg-green-700"
              >
                Services
              </a>
              <a
                href="/contacto"
                className="text-white block px-3 py-2 rounded-md text-base font-medium hover:text-white hover:bg-green-700"
              >
                Home
              </a>
              <a
                href="/about"
                className="text-white block px-3 py-2 rounded-md text-base font-medium hover:text-white hover:bg-green-700"
              >
                Notice
              </a>
              <a
                href="/about"
                className="text-white block px-3 py-2 rounded-md text-base font-medium hover:text-white hover:bg-green-700"
              >
                Contact
              </a>
              <a
                href="/about"
                className="text-white block px-3 py-2 rounded-md text-base font-medium hover:text-white hover:bg-green-700"
              >
                Employees
              </a>
              <a
                href="/about"
                className="text-white block px-3 py-2 rounded-md text-base font-medium hover:text-white hover:bg-green-700"
              >
                Points
              </a>
            </div>
          </div>
        </nav>
    );
};

export default Navbar;