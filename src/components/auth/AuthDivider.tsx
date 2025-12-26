import React from "react";

const AuthDivider = () => {
  return (
    <div className="relative my-6">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-auth-divider" />
      </div>
      <div className="relative flex justify-center text-xs">
        <span className="bg-auth-card px-4 text-auth-text-muted uppercase tracking-wider">
          or
        </span>
      </div>
    </div>
  );
};

export default AuthDivider;
