export default function RegisterPage() {
  return (
    <>
      <div className="flex flex-col justify-center items-center"
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
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Sign up
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form action="#" method="POST" className="space-y-6">
          
          <div>
              <div className="flex items-center justify-between">
                <label htmlFor="first-name" className="block text-sm/6 font-medium text-gray-900">
                  First Name
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="first-name"
                  name="first-name"
                  type="first-name"
                  required
                  autoComplete="first-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="last-name" className="block text-sm/6 font-medium text-gray-900">
                  Last Name
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="last-name"
                  name="last-name"
                  type="last-name"
                  required
                  autoComplete="last-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm/6"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="dni" className="block text-sm/6 font-medium text-gray-900">
                  DNI
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="dni"
                  name="dni"
                  type="dni"
                  required
                  autoComplete="dni"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="Phone" className="block text-sm/6 font-medium text-gray-900">
                  Phone
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="phone"
                  name="phone"
                  type="phone"
                  required
                  autoComplete="phone"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm/6"
                />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-left text-sm/6 font-medium text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className = "block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
              >
                Sign up
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}