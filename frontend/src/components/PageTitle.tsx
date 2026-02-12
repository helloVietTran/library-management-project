import Link from 'next/link';
import React from 'react';

interface BreadcrumbItem {
  label: string;
  href?: string;
  isActive?: boolean;
}

interface PageTitleProps {
  title: string;
  subtitle?: string;
  breadcrumbs: BreadcrumbItem[];
}

const PageTitle: React.FC<PageTitleProps> = ({
  title,
  subtitle,
  breadcrumbs,
}) => {
  return (
    <div className="page-title text-primary text-xl mb-3">
      <div className="flex flex-row justify-between items-start ">
        <div className="mb-4 md:mb-0">
          <h3 className="text-gray-800 font-medium mb-1 text-xl md:block hidden">
            {title}
          </h3>
          {subtitle && <p className="text-sm">{subtitle}</p>}
        </div>
        <nav>
          <ol className="flex space-x-2 text-sm">
            {breadcrumbs.map((breadcrumb, index) => {
              const isLast = index === breadcrumbs.length - 1;
              return (
                <li key={index}>
                  {breadcrumb.href && !isLast ? (
                    <Link
                      href={breadcrumb.href}
                      className="!text-gray-500 font-medium hover:!text-gray-800"
                    >
                      {breadcrumb.label} /
                    </Link>
                  ) : (
                    <span className="text-gray-800 font-medium">
                      {breadcrumb.label}
                    </span>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>
      </div>
    </div>
  );
};

export default PageTitle;
