import React from 'react';
import Image from 'next/image';

const AuthLogo = () => {
  return (
    <div className="w-[160px] sm:w-[200px] h-auto">
      <Image
        src="/img/logo/logo.png"
        alt="logo"
        width={220} 
        height={0}
        sizes="(max-width: 639px) 160px, 200px"
        style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
        priority
      />
    </div>
  );
};

export default AuthLogo;