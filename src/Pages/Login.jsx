import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { LuEye, LuEyeClosed } from "react-icons/lu";
import Joi from "joi";
import PageTransition from "../Components/Shared/PageTransition.jsx";
const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [fieldErrors, setFieldErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  // Joi Schema
  const schema = Joi.object({
    email: Joi.string().email({ tlds: { allow: false } }).required().messages({
      "string.email": "Enter a valid email",
      "string.empty": "Email is required",
    }),
    password: Joi.string().min(6).required().messages({
      "string.min": "Password must be at least 6 characters",
      "string.empty": "Password is required",
    }),
  });

  // live validation
  const handleChange = (e) => {
    const { name, value } = e.target;
    const newFormData = { ...formData, [name]: value };
    setFormData(newFormData);

    setErrorMessage("");

    let newErrors = { ...fieldErrors };
    const { error } = schema.extract(name).validate(value);
    newErrors[name] = error ? error.message : null;

    setFieldErrors(newErrors);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { error } = schema.validate(formData, { abortEarly: false });
    if (error) {
      const newErrors = {};
      error.details.forEach((err) => {
        newErrors[err.path[0]] = err.message;
      });
      setFieldErrors(newErrors);
      setErrorMessage("⚠️ Please fix the errors below.");
    } else {
      setFieldErrors({});
      setErrorMessage("");
      console.log("Login success:", formData);
      navigate("/Home");
    }
  };

  return (
        <PageTransition>

    <div className="relative top-30 ml-15 p-10">
      {errorMessage && (
        <div className="text-red-500 font-semibold mb-4">{errorMessage}</div>
      )}

      <h1 className="text-3xl font-[Oswald] font-bold">Sign in</h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col mt-5 gap-5 w-80"
      >
        {/* Email */}
        <input
          type="email"
          name="email"
          placeholder="mail.exemple@mail.com"
          className="p-1 border rounded-lg w-80"
          value={formData.email}
          onChange={handleChange}
        />
        {fieldErrors.email && (
          <p className="text-red-500 text-sm">{fieldErrors.email}</p>
        )}

        {/* Password */}
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="**************"
            className="p-1 pr-10 rounded-lg border-1 w-80"
            value={formData.password}
            onChange={handleChange}
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-600"
          >
            {showPassword ? <LuEyeClosed size={20} /> : <LuEye size={20} />}
          </span>
        </div>
        {fieldErrors.password && (
          <p className="text-red-500 text-sm">{fieldErrors.password}</p>
        )}

        <button
          type="submit"
          className="bg-btn cursor-pointer shadow-xl text-black font-semibold font-[inder] p-2 rounded-xl w-80 hover:scale-105 transition-all duration-300"
        >
          Sign in
        </button>

        {/* Divider */}
        <div className="flex items-center justify-center w-80">
          <div className="flex-grow h-px bg-gray-500"></div>
          <span className="px-5 text-gray-600">or</span>
          <div className="flex-grow h-px bg-gray-500"></div>
        </div>

        {/* Social buttons */}
        <div className="flex gap-10 font-[inder] w-80">
          <button className="flex items-center gap-2 rounded-lg p-1.5 w-40 justify-center bg-btn2 cursor-pointer hover:bg-gray-300">
            <img
              src="/🦆 icon _google icon_.png"
              alt="Google"
              className="w-5 h-5"
            />
            <span>Google</span>
          </button>

          <button className="flex items-center gap-2 rounded-lg w-40 justify-center bg-btn2 cursor-pointer hover:bg-gray-300">
            <img
              src="/🦆 icon _Facebook v1 icon_.png"
              alt="Facebook"
              className="w-5 h-5"
            />
            <span>Facebook</span>
          </button>
        </div>

        {/* Register link */}
        <div className="cursor-pointer flex justify-center font-[inder] w-80">
          Don't have an account?
          <NavLink to="/register" className="ml-2 hover:text-green-500">
            Sign up
          </NavLink>
        </div>
      </form>
    </div>
    </PageTransition>

  );
};

export default Login;
