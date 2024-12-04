/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
export default function RegisterPage() {
    return (
      <>
        {/*
          This example requires updating your template:
  
          ```
          <html class="h-full bg-white">
          <body class="h-full">
          ```
        */}
        <div className="flex flex-col justify-center"style={{
          height: "-webkit-fill-available",
          width: "-webkit-fill-available",
          position: "fixed",
          zIndex: 1,
          //marginTop: "-50px",
        }}>
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              alt="EcoApp"
              src="/images/LogoSolo.png"
              className="mx-auto h-20 w-auto"
            />
            <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
              Sign Up
            </h2>
          </div>
  
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form action="#" method="POST" className="space-y-6">
              <div>
                <label htmlFor="firstname" className="block text-left text-sm/6 font-medium text-gray-900">
                  First Name
                </label>
                <div className="mt-2">
                  <input
                    id="firstname"
                    name="firstname"
                    type="firstname"
                    required
                    autoComplete="first-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>
  
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="lastname" className="block text-sm/6 font-medium text-gray-900">
                    Last Name
                  </label>                 
                </div>
                <div className="mt-2">
                  <input
                    id="lastname"
                    name="lastname"
                    type="lastname"
                    required
                    autoComplete="last-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm/6"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-left text-sm/6 font-medium text-gray-900">
                  Email
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-left text-sm/6 font-medium text-gray-900">
                  Password
                </label>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    autoComplete="password"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="dni" className="block text-left text-sm/6 font-medium text-gray-900">
                  DNI
                </label>
                <div className="mt-2">
                  <input
                    id="dni"
                    name="dni"
                    type="dni"
                    required
                    autoComplete="dni"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="block text-left text-sm/6 font-medium text-gray-900">
                  Phone
                </label>
                <div className="mt-2">
                  <input
                    id="phone"
                    name="phone"
                    type="phone"
                    required
                    autoComplete="phone"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>
  
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                >
                  Sign Up
                </button>
              </div>
            </form>
          </div>
        </div>
      </>
    )
  }