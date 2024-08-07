import React, { useState, useEffect } from 'react';
import { Button, message } from 'antd';
import { useRouter, usePathname } from 'next/navigation';
import { LogoutOutlined } from '@ant-design/icons';
import { usingAuthenticationAPI } from '@/apis/authentication'; 

const Logout = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await usingAuthenticationAPI.logout();
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
      <span className='text-white font-bold text-xl ml-2'>Logout</span>
    </Button>
  );
};

const ConditionalLogout: React.FC = () => {
  const pathname = usePathname();
  const [showLogout, setShowLogout] = useState(false);

  useEffect(() => {
    setShowLogout(pathname?.startsWith('/admin') || pathname?.startsWith('/security-staff') || pathname?.startsWith('/police'));
  }, [pathname]);

  return showLogout ? <Logout /> : null;
};

export default ConditionalLogout;
