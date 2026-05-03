import React,{ useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../components/auth/AuthLayout";
import AuthInput from "../components/auth/AuthInput";
import AuthSocialButtons from "../components/auth/AuthSocialButtons";
import Button from "../components/ui/Button";
import { useAuth } from "../context/AuthContext";
import { api } from "../lib/api";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Client-side validation before hitting the backend
    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setSubmitting(true);
    try {
      // GET /api/register — credentials sent as JSON body
      const response = await api.get("/register", {
        params: { name, email, password },
      });

      // Auto-login after successful registration — stores token and redirects home
      login(response.data);
      navigate("/");
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthLayout 
      title="Create your account" 
      description="Access all that Coinbase has to offer with a single account."
    >
      <AuthInput 
        label="Name"
        placeholder="Enter your full name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

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
      
      <AuthInput 
        label="Confirm Password"
        placeholder="Confirm your password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />

      {/* Error message */}
      {error && (
        <div role="alert" className="text-sm text-red-600 bg-red-50 border mt-4 border-red-200 p-3 rounded-lg">
          {error}
        </div>
      )}

      <Button variant="primary" size="auth" className="mt-7 bg-[#86a7eb] rounded-full" onClick={handleSubmit}>
        {submitting ? "Creating account..." : "Sign up"}
      </Button>

      {/* OR */}
      <div className="my-7 flex items-center gap-4">
        <div className="h-px flex-1 bg-[#e5e7eb]" />
        <span className="text-[14px] text-[#6b7280]">OR</span>
        <div className="h-px flex-1 bg-[#e5e7eb]" />
      </div>

      <AuthSocialButtons mode="signup" />

      {/* Sign in link */}
      <p className="mt-8 text-center text-[16px] font-semibold text-black">
        Already have an account?{" "}
        <Link to="/signin" className="text-[#1652f0]">
          Sign in
        </Link>
      </p>

      {/* Footer text */}
      <p className="mx-auto mt-8 max-w-95 text-center text-[14px] leading-[1.45] text-[#6b7280]">
        By creating an account you certify that you are over the
        age of 18 and agree to our{" "}
        <a href="#" className="underline">
          Privacy Policy
        </a>{" "}
        and{" "}
        <a href="#" className="underline">
          Cookie Policy
        </a>
        .
      </p>
    </AuthLayout>
  );
}

export default SignUp;
