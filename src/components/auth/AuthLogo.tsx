import logo from "@/assets/logo.png";

const AuthLogo = () => {
  return (
    <div className="flex flex-col items-center gap-4 mb-8">
      <div className="w-12 h-12 rounded-full bg-auth-text flex items-center justify-center">
        <img src={logo} alt="SigmaGPT Logo" className="w-7 h-7" />
      </div>
    </div>
  );
};

export default AuthLogo;
