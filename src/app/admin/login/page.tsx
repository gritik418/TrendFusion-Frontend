import React from "react";

const AdminLogin = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center">
      <div className="flex shadow-md flex-col p-6 bg-white rounded-lg max-w-[480px] w-[90%]">
        <h1 className="text-3xl">Login</h1>

        <div className="flex flex-col mt-10 gap-8">
          <div className="flex flex-col gap-1">
            <label htmlFor="" className="text-xl text-gray-500">
              Enter your email
            </label>
            <input
              type="text"
              placeholder="Email"
              className="border-2 rounded-md py-2 px-2 focus:outline-[var(--secondary-color)]"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="" className="text-xl text-gray-500">
              Enter your password
            </label>
            <input
              type="text"
              placeholder="Password"
              className="border-2 rounded-md py-2 px-2 focus:outline-[var(--secondary-color)]"
            />
          </div>
        </div>

        <div className="flex my-10 items-center justify-center">
          <button className="bg-[var(--secondary-color)] py-2 text-white rounded-md px-6 text-2xl">
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
