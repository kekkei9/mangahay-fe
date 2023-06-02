import React from "react";

interface ILayoutProps {
  children: React.ReactNode;
  className?: string;
}

const Layout = ({ children, className }: ILayoutProps) => {
  return (
    <div className={`max-w-5xl mx-auto my-0 ${className}`}>{children}</div>
  );
};

export default Layout;
