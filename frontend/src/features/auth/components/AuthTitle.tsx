import React from 'react';

interface AuthTitle {
  label: string;
}

const AuthTitle: React.FC<AuthTitle> = ({ label }) => {
  return (
    <h1 className="text-3xl py-6 font-bold text-primary">{label}</h1>
  );
};

export default AuthTitle;
