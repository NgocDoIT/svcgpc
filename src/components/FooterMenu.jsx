import React from 'react';
import { Paper, Box, IconButton, Typography, Avatar } from '@mui/material';
import { Home, Newspaper, People, AccountCircle } from '@mui/icons-material';
import { NavLink, useLocation } from 'react-router-dom';
import styles from './FooterMenu.module.css';

const LOGO_URL = 'https://media.canva.com/v2/image-resize/format:JPG/height:550/quality:92/uri:ifs%3A%2F%2FM%2F8b72de9a-0e62-45be-9546-53281f410ade/watermark:F/width:550?csig=AAAAAAAAAAAAAAAAAAAAANawXIJPJBYzjcjsKigUjKA5aoIw4CJ0PaJFvxvOtxxn&exp=1759425521&osig=AAAAAAAAAAAAAAAAAAAAAKb7tvd7qqZhbVruM3K48etby-mz4Oply-zS9-Znp6OI&signer=media-rpc&x-canva-quality=thumbnail_large';

const menuItems = [
  { label: 'Giới Thiệu', path: '/', icon: <Home /> },
  { label: 'Tin Tức', path: '/news', icon: <Newspaper /> },
  { isLogo: true },
  { label: 'Thành Viên', path: '/roster', icon: <People /> },
  { label: 'Tài Khoản', path: '/account', icon: <AccountCircle /> },
];

const FooterMenu = () => {
  const location = useLocation();

  const navItemStyles = (isActive) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '50px',
    width: '60px',
    color: isActive ? 'primary.main' : 'rgba(255, 255, 255, 0.7)',
    textDecoration: 'none',
    transition: 'color 0.3s ease-in-out',
    '& .MuiSvgIcon-root': {
        fontSize: '1.75rem',
        transform: isActive ? 'scale(1.15)' : 'scale(1)',
        transition: 'transform 0.3s ease-in-out',
    },
    '&:hover': {
      color: 'white',
      '& .MuiSvgIcon-root': {
        transform: 'scale(1.15)',
      }
    },
  });

  return (
    <Paper 
      elevation={5}
      sx={{
        position: 'fixed',
        bottom: 20,
        left: '50%',
        transform: 'translateX(-50%)',
        width: 'auto',
        borderRadius: '50px',
        background: 'rgba(30, 30, 30, 0.8)',
        backdropFilter: 'blur(20px)',
        padding: '5px 15px',
        zIndex: 1300,
        border: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', gap: { xs: 1, sm: 2 } }}>
        {menuItems.map((item, index) => {
          if (item.isLogo) {
            return (
              <Box key="logo" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', px: 1 }}>
                  <Avatar
                    src={LOGO_URL} 
                    alt="Logo"
                    className={styles.rgbGlow}
                    sx={{ 
                      width: 48, 
                      height: 48, 
                      border: '2px solid white', 
                      cursor: 'pointer',
                      transition: 'transform 0.3s ease',
                      '&:hover': {
                        transform: 'scale(1.1)'
                      }
                    }}
                    component={NavLink}
                    to="/"
                  />
              </Box>
            );
          }

          const isActive = location.pathname === item.path;

          return (
            <IconButton
              key={index}
              component={NavLink}
              to={item.path}
              sx={navItemStyles(isActive)}
            >
                {item.icon}
                <Typography 
                    variant="caption" 
                    sx={{
                        display: isActive ? 'block' : 'none',
                        fontWeight: 'bold',
                        fontSize: '0.65rem',
                        whiteSpace: 'nowrap',
                        marginTop: '4px' // Ensures text is inside and below the icon
                    }}
                >
                    {item.label}
                </Typography>
            </IconButton>
          );
        })}
      </Box>
    </Paper>
  );
}

export default FooterMenu;
