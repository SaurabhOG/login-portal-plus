import logo from "@/assets/logo.png";

const AuthLogo = () => {
  return (
    <div className="flex flex-col items-center gap-4 mb-8">
      <img src={logo} alt="SigmaGPT Logo" className="w-12 h-12" />
    </div>
  );
};

export default AuthLogo;
