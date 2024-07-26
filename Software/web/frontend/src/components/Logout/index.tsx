import React, { useState, useEffect } from 'react';
import { Button, message } from 'antd';
import { useRouter, usePathname } from 'next/navigation';
import { LogoutOutlined } from '@ant-design/icons';

const Logout = () => {
  const router = useRouter();

  const handleLogout = () => {
    try {
      message.success('Logged out successfully.');
      router.push('/login');
    } catch (error) {
      console.error('Error logging out:', error);
      message.error('Failed to log out.');
    }
  };

  return (
    <Button
      className='h-auto px-3 py-2 shadow-sm shadow-slate-300 fixed-logout'
      type='primary'
      onClick={handleLogout}
    >
      <LogoutOutlined />
      <p className='text-white font-bold text-xl'>Logout</p>
    </Button>
  );
};

const ConditionalLogout: React.FC = () => {
  const pathname = usePathname();
  const [showLogout, setShowLogout] = useState(false);

  useEffect(() => {
    if (pathname?.startsWith('/admin') || pathname?.startsWith('/security-staff')) {
      setShowLogout(true);
    } else {
      setShowLogout(false); 
    }
  }, [pathname]);

  return showLogout ? <Logout /> : null;
};

export default ConditionalLogout;
