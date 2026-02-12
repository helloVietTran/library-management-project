import Link from 'next/link';
import React from 'react';

interface AuthNavigationProps {
  primaryLabel: string;
  primaryHref: string;
  primaryDescription: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}

const AuthNavigation : React.FC<AuthNavigationProps> = ({
  primaryLabel,
  primaryHref,
  secondaryHref,
  secondaryLabel,
  primaryDescription,
}) => {
  return (
    <div className="auth-action text-center pt-4 text-base text-gray-600">
      <p>
        {primaryDescription}
        <Link href={primaryHref} className="font-semibold !text-primary">
          {' ' + primaryLabel}
        </Link>
      </p>
      {secondaryHref ? (
        <p>
          <Link href={secondaryHref} className="font-semibold text-primary">
            {secondaryLabel}
          </Link>
        </p>
      ) : (
        <></>
      )}
    </div>
  );
};

export default AuthNavigation ;
