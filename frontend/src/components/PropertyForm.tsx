import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function PropertyForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contactNumber: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // const validator = (formData: { name: string; email: string; contactNumber: string; password: string }) => {
  //   if (formData.name.length < 3) {
  //     toast.error("Name must be at least 3 characters long");
  //     return false;
  //   }
  //   if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(formData.email)) {
  //     toast.error("Invalid email address");
  //     return false;
  //   }
  //   if (formData.contactNumber.length < 10 || formData.contactNumber.length > 15) {
  //     toast.error("Invalid contact number");
  //     return false;
  //   }
  //   if (formData.password.length < 6) {
  //     toast.error("Password must be at least 6 characters long");
  //     return false;
  //   }
  //   return true;
  // };

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <>
      <Toaster />
      <section className="text-white min-h-screen flex flex-col justify-center items-center px-6">
        <div className="max-w-2xl text-center mb-8 px-4">
  <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-3 leading-snug sm:leading-tight">
    Find the perfect <span className="text-orange-400">Property</span>
  </h1>
  <p className="text-slate-300 text-sm sm:text-base md:text-lg">
    We help buyers and sellers connect, automate listings, and get the best property deals quickly.
  </p>
        </div>


        <div className="w-full max-w-sm sm:max-w-md mx-auto bg-white rounded-xl shadow-lg p-6 sm:p-8 dark:bg-slate-800">
  {/* Tabs (Buy, Sell, Rent) */}
  <div className="flex flex-wrap justify-center gap-3 w-full text-white mb-6">
    <span className="bg-teal-600 px-4 py-2 rounded-md text-sm sm:text-base font-medium">
      Buy
    </span>
    <span className="bg-teal-600 px-4 py-2 rounded-md text-sm sm:text-base font-medium">
      Sell
    </span>
    <span className="bg-teal-600 px-4 py-2 rounded-md text-sm sm:text-base font-medium">
      Rent
    </span>
  </div>

  {/* Form */}
  <form onSubmit={handleSignUp} className="space-y-4 sm:space-y-5">
    <input
      type="text"
      name="name"
      value={formData.name}
      onChange={handleChange}
      placeholder="Full Name"
      className="w-full p-3 rounded-lg text-black text-sm sm:text-base border border-gray-300 focus:ring-2 focus:ring-orange-400 outline-none"
      required
    />

    <input
      type="email"
      name="email"
      value={formData.email}
      onChange={handleChange}
      placeholder="Email Address"
      className="w-full p-3 rounded-lg text-black text-sm sm:text-base border border-gray-300 focus:ring-2 focus:ring-orange-400 outline-none"
      required
    />

    <input
      type="text"
      name="contactNumber"
      value={formData.contactNumber}
      onChange={handleChange}
      placeholder="Contact Number"
      className="w-full p-3 rounded-lg text-black text-sm sm:text-base border border-gray-300 focus:ring-2 focus:ring-orange-400 outline-none"
      required
    />

    <input
      type="password"
      name="password"
      value={formData.password}
      onChange={handleChange}
      placeholder="Password"
      className="w-full p-3 rounded-lg text-black text-sm sm:text-base border border-gray-300 focus:ring-2 focus:ring-orange-400 outline-none"
      required
    />

    <button
      type="submit"
      className="w-full bg-orange-500 hover:bg-orange-600 transition-all duration-300 text-white font-semibold py-3 rounded-lg text-sm sm:text-base"
    >
      Create Account
    </button>
  </form>
</div>

      </section>
    </>
  );
}
