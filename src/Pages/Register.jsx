import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { LuEye, LuEyeClosed } from "react-icons/lu";
import Joi from "joi";
import PageTransition from "../Components/Shared/PageTransition.jsx";

const Register = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    rePassword: "",
  });

  const [fieldErrors, setFieldErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  // Joi Schema
  const schema = Joi.object({
    firstName: Joi.string().min(2).max(30).required().messages({
      "string.empty": "First name is required",
      "string.min": "First name must be at least 2 characters",
    }),
    lastName: Joi.string().min(2).max(30).required().messages({
      "string.empty": "Last name is required",
    }),
    email: Joi.string().email({ tlds: { allow: false } }).required().messages({
      "string.email": "Enter a valid email",
      "string.empty": "Email is required",
    }),
    password: Joi.string().min(6).required().messages({
      "string.min": "Password must be at least 6 characters",
      "string.empty": "Password is required",
    }),
    rePassword: Joi.any().equal(Joi.ref("password")).required().messages({
      "any.only": "Passwords do not match",
      "string.empty": "Please re-enter your password",
    }),
  });

  // validate live
  const handleChange = (e) => {
    const { name, value } = e.target;
    const newFormData = { ...formData, [name]: value };
    setFormData(newFormData);

    setErrorMessage(""); 

    let newErrors = { ...fieldErrors };
     if (name !== "rePassword") {
    const { error } = schema.extract(name).validate(value);
    newErrors[name] = error ? error.message : null;
  }


    if (name === "rePassword" || name === "password") {
      if (
        newFormData.rePassword &&
        newFormData.rePassword !== newFormData.password
      ) {
        newErrors.rePassword = "Passwords do not match";
      } else {
        newErrors.rePassword = null;
      }
    }

    setFieldErrors(newErrors);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.firstName &&
      !formData.lastName &&
      !formData.email &&
      !formData.password &&
      !formData.rePassword
    ) {
      setErrorMessage("⚠️ All fields are required!");
      return;
    }

    const { error } = schema.validate(formData, { abortEarly: false });
    if (error) {
      const newErrors = {};
      error.details.forEach((err) => {
        newErrors[err.path[0]] = err.message;
      });
      setFieldErrors(newErrors);

    
      if (Object.keys(newErrors).length === 1 && newErrors.rePassword) {
        setErrorMessage("");
      } else {
        setErrorMessage("⚠️ Please fix the errors below.");
      }
    } else {
      setFieldErrors({});
      setErrorMessage("");
      console.log("Form Submitted:", formData);
      navigate("/Home");
    }
  };

  return (
    <PageTransition>
    <div className="relative top-20 ml-15 p-10">
      {errorMessage && (
        <div className="text-red-500 font-semibold mb-4">{errorMessage}</div>
      )}

      <h1 className="text-3xl font-[Oswald] font-bold">Sign up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col mt-5 gap-5 w-80">
        {/* First Name */}
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          className="p-1 border rounded-lg"
          onChange={handleChange}
          value={formData.firstName}
        />
        {fieldErrors.firstName && (
          <p className="text-red-500 text-sm">{fieldErrors.firstName}</p>
        )}

        {/* Last Name */}
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          className="p-1 border rounded-lg"
          onChange={handleChange}
          value={formData.lastName}
        />
        {fieldErrors.lastName && (
          <p className="text-red-500 text-sm">{fieldErrors.lastName}</p>
        )}

        {/* Email */}
        <input
          type="email"
          name="email"
          placeholder="E-mail address"
          className="p-1 border rounded-lg"
          onChange={handleChange}
          value={formData.email}
        />
        {fieldErrors.email && (
          <p className="text-red-500 text-sm">{fieldErrors.email}</p>
        )}

        {/* Password */}
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            className="p-1 pr-10 rounded-lg border-1 w-full"
            onChange={handleChange}
            value={formData.password}
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

        {/* Re-enter Password */}
        <div className="relative">
          <input
            type={showRePassword ? "text" : "password"}
            name="rePassword"
            placeholder="Re-enter the password"
            className="p-1 pr-10 rounded-lg border-1 w-full"
            onChange={handleChange}
            value={formData.rePassword}
          />
          <span
            onClick={() => setShowRePassword(!showRePassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-600"
          >
            {showRePassword ? <LuEyeClosed size={20} /> : <LuEye size={20} />}
          </span>
        </div>
        {fieldErrors.rePassword && (
          <p className="text-red-500 text-sm">{fieldErrors.rePassword}</p>
        )}

        <button
          type="submit"
          className=" bg-btn  cursor-pointer p-2 rounded-xl font-semibold font-[inder] shadow-xl transition-all duration-300 "
        >
          Sign Up
        </button>

        <div className="cursor-pointer flex justify-center">
          Already have an account?
          <NavLink to="/login" className="ml-2 hover:text-green-500">
            Sign In
          </NavLink>
        </div>
      </form>
    </div>
    </PageTransition>
  );
};

export default Register;
