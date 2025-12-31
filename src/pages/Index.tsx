import { useNavigate } from "react-router-dom";
import { AuthButton } from "@/components/ui/auth-button";
import { LogIn, MessageSquare } from "lucide-react";
import logo from "@/assets/logo.png";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen auth-gradient flex flex-col items-center justify-center p-4">
      <div className="text-center fade-in">
        {/* Logo */}
        <img src={logo} alt="SigmaGPT Logo" className="w-16 h-16 mx-auto mb-6" />

        <h1 className="text-4xl font-semibold text-auth-text mb-3">
          SigmaGPT
        </h1>
        <p className="text-auth-text-muted text-lg mb-10 max-w-md mx-auto">
          Get instant answers, find creative inspiration, and learn something new.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-sm mx-auto">
          <AuthButton
            variant="primary"
            icon={<LogIn className="w-5 h-5" />}
            onClick={() => navigate("/auth")}
            className="flex-1"
          >
            Log in
          </AuthButton>
          <AuthButton
            variant="social"
            icon={<MessageSquare className="w-5 h-5" />}
            onClick={() => navigate("/auth")}
            className="flex-1 bg-auth-card border-auth-card-border text-auth-text hover:bg-auth-input-bg"
          >
            Sign up
          </AuthButton>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-6 flex gap-4 text-xs text-auth-text-muted">
        <a href="#" className="hover:text-auth-text transition-colors">Terms of use</a>
        <span>|</span>
        <a href="#" className="hover:text-auth-text transition-colors">Privacy policy</a>
      </div>
    </div>
  );
};

export default Index;
