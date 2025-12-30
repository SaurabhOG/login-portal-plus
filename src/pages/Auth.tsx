import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import { AuthInput } from "@/components/ui/auth-input";
import { AuthButton } from "@/components/ui/auth-button";
import { GoogleIcon, MicrosoftIcon, AppleIcon } from "@/components/icons/SocialIcons";
import AuthDivider from "@/components/auth/AuthDivider";
import AuthLogo from "@/components/auth/AuthLogo";
import { toast } from "sonner";
import { useChatContext } from "@/contexts/ChatContext";

type AuthMode = "login" | "signup";

const Auth = () => {
  const navigate = useNavigate();
  const { setIsAuthenticated } = useChatContext();
  const [mode, setMode] = useState<AuthMode>("login");
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const newErrors = {
      email: "",
      password: "",
      confirmPassword: "",
    };

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (mode === "signup" && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return !newErrors.email && !newErrors.password && !newErrors.confirmPassword;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      if (mode === "login") {
        toast.success("Welcome back!");
        setIsAuthenticated(true);
        navigate("/chat");
      } else {
        toast.success("Account created successfully!");
        setMode("login");
      }
    }, 1500);
  };

  const handleSocialLogin = (provider: string) => {
    toast.info(`${provider} login coming soon!`);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <div className="min-h-screen auth-gradient flex items-center justify-center p-4">
      <div className="w-full max-w-md fade-in">
        <div className="bg-auth-card auth-card-shadow rounded-2xl p-8 relative">
          {/* Close Button */}
          <button
            onClick={() => navigate("/")}
            className="absolute top-4 right-4 p-2 rounded-lg text-auth-text-muted hover:text-auth-text hover:bg-auth-input-bg transition-all duration-200"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
          <AuthLogo />
          
          <h1 className="text-2xl font-semibold text-auth-text text-center mb-2">
            {mode === "login" ? "Welcome back" : "Create your account"}
          </h1>
          <p className="text-auth-text-muted text-center text-sm mb-8">
            {mode === "login" 
              ? "Log in to continue to SigmaGPT" 
              : "Sign up to start using SigmaGPT"}
          </p>

          {/* Social Login Buttons */}
          <div className="space-y-3">
            <AuthButton
              variant="social"
              icon={<GoogleIcon />}
              onClick={() => handleSocialLogin("Google")}
            >
              Continue with Google
            </AuthButton>
            <AuthButton
              variant="social"
              icon={<MicrosoftIcon />}
              onClick={() => handleSocialLogin("Microsoft")}
            >
              Continue with Microsoft Account
            </AuthButton>
            <AuthButton
              variant="social"
              icon={<AppleIcon />}
              onClick={() => handleSocialLogin("Apple")}
            >
              Continue with Apple
            </AuthButton>
          </div>

          <AuthDivider />

          {/* Email/Password Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <AuthInput
              type="email"
              label="Email address"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              error={errors.email}
            />
            <AuthInput
              type="password"
              label="Password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) => handleInputChange("password", e.target.value)}
              error={errors.password}
            />
            {mode === "signup" && (
              <AuthInput
                type="password"
                label="Confirm password"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                error={errors.confirmPassword}
              />
            )}

            {mode === "login" && (
              <div className="text-right">
                <button
                  type="button"
                  className="text-sm text-primary hover:underline"
                >
                  Forgot password?
                </button>
              </div>
            )}

            <AuthButton
              type="submit"
              variant="primary"
              isLoading={isLoading}
              className="mt-6"
            >
              {mode === "login" ? "Log in" : "Sign up"}
            </AuthButton>
          </form>

          {/* Toggle Mode */}
          <p className="mt-6 text-center text-sm text-auth-text-muted">
            {mode === "login" ? (
              <>
                Don't have an account?{" "}
                <button
                  type="button"
                  onClick={() => setMode("signup")}
                  className="text-primary hover:underline font-medium"
                >
                  Sign up
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => setMode("login")}
                  className="text-primary hover:underline font-medium"
                >
                  Log in
                </button>
              </>
            )}
          </p>
        </div>

        {/* Footer */}
        <div className="mt-6 flex justify-center gap-4 text-xs text-auth-text-muted">
          <a href="#" className="hover:text-auth-text transition-colors">Terms of use</a>
          <span>|</span>
          <a href="#" className="hover:text-auth-text transition-colors">Privacy policy</a>
        </div>
      </div>
    </div>
  );
};

export default Auth;
