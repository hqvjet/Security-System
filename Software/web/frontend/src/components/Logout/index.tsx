// Import useState, useEffect và React từ React
import React, { useState, useEffect } from 'react';
import { Button, message } from 'antd';
import { useRouter } from 'next/navigation';
import { LogoutOutlined } from '@ant-design/icons';

type CurrentPageType = 'AdminPage' | 'police' | 'security-staff';

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
      className='h-auto px-3 py-2 shadow-sm shadow-slate-300'
      type='primary'
      onClick={handleLogout}
    >
      <LogoutOutlined />
      <p className='text-white font-bold text-xl'>Logout</p>
    </Button>
  );
};

const ConditionalLogout: React.FC<{ currentPage: CurrentPageType }> = ({ currentPage }) => {
  const [showLogout, setShowLogout] = useState(false);
  useEffect(() => {
    if (currentPage === 'AdminPage' || currentPage === 'police' || currentPage === 'security-staff') {
      setShowLogout(true);
    } else {
      setShowLogout(false); 
    }
  }, [currentPage]);

  return showLogout ? <Logout /> : null;
};

export default ConditionalLogout;
