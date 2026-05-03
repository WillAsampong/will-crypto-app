import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/icons/coinbase-logo.svg';
import DemoNotice from '../DemoNotice';

const AuthLayout = ({ children, title, description }) => {
  return (
    <div className="min-h-screen bg-white">
      {/* Top logo */}
      <div className="px-8 pt-6">
        <Link to="/">
          <img src={logo} alt="Coinbase" className="h-10 w-auto" />
        </Link>
      </div>

      {/* Center content */}
      <div className="flex items-start justify-center px-6 pt-24 pb-20">
        <div className="w-full max-w-108">
          <h1 className="text-[32px] font-semibold tracking-[-0.03em] text-black">
            {title}
          </h1>

          {/* Demo password warning — reusable component shared with /signup */}
          <div className="mb-4 mt-4">
            <DemoNotice />
          </div>
          
          {description && (
            <p className="mt-3 text-[16px] leading-[1.45] text-[#5b616e]">
              {description}
            </p>
          )}

          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
