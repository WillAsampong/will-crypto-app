import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoadingScreen from "../components/common/LoadingScreen";
import AuthLayout from "../components/auth/AuthLayout";
import AuthInput from "../components/auth/AuthInput";
import AuthSocialButtons from "../components/auth/AuthSocialButtons";
import Button from "../components/ui/Button";
import { useAuth } from "../context/AuthContext";
import { api } from "../lib/api";

function SignIn() {
  const [isLoading, setIsLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Basic client-side validation
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    setSubmitting(true);
    try {
      // GET /api/login — credentials sent as JSON body
      // The backend reads req.body.email and req.body.password
      const response = await api.get("/login", {
        params: { email, password },
      });

      // Store the user + token in context and localStorage
      login(response.data);

      // Redirect to the home page on success
      navigate("/");
    } catch (err) {
      setError(
        err.response?.data?.message || "Login failed. Please check your credentials."
      );
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <AuthLayout title="Sign in to Coinbase">
      <AuthInput 
        label="Email"
        placeholder="Your email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <AuthInput 
        label="Password"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {/* Error message */}
      {error && (
        <div role="alert" className="text-sm text-red-600 bg-red-50 border border-red-200 p-3 rounded-lg">
          {error}
        </div>
      )}

      <Button variant="primary" size="auth" className="mt-5 bg-[#86a7eb] rounded-full" onClick={handleSubmit}>
        {submitting ? "Signing in..." : "Continue"}
      </Button>

      {/* OR */}
      <div className="my-5 flex items-center gap-4">
        <div className="h-px flex-1 bg-[#e5e7eb]" />
        <span className="text-[14px] text-[#6b7280]">OR</span>
        <div className="h-px flex-1 bg-[#e5e7eb]" />
      </div>

      <AuthSocialButtons mode="signin" />

      {/* Signup link */}
      <p className="mt-10 text-center text-[16px] font-semibold text-black">
        Don’t have an account?{" "}
        <Link to="/signup" className="text-[#1652f0]">
          Sign up
        </Link>
      </p>

      {/* Footer text */}
      <p className="mx-auto mt-10 max-w-[320px] text-center text-[14px] leading-[1.45] text-[#6b7280]">
        Not your device? Use a private window. See{" "}
        <a href="#" className="underline">
          Privacy Policy
        </a>{" "}
        for more info.
      </p>
    </AuthLayout>
  );
}

export default SignIn;
