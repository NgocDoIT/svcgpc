import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Box, keyframes, Avatar } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase';

const messages = [
  'Sinh Viên Công Giáo Phú Cường',
  'Đức Tin - Tri Thức - Phục Vụ'
];

const fadeInOut = keyframes`
  0% { opacity: 0; transform: translateY(10px); }
  20% { opacity: 1; transform: translateY(0); }
  80% { opacity: 1; transform: translateY(0); }
  100% { opacity: 0; transform: translateY(-10px); }
`;

const DEFAULT_AVATAR = 'https://cdn.pixabay.com/photo/2017/09/04/09/38/crosses-2713356_960_720.jpg';

const Header = ({ darkMode, toggleDarkMode }) => {
  const [messageIndex, setMessageIndex] = useState(0);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const messageInterval = setInterval(() => {
      setMessageIndex(prevIndex => (prevIndex + 1) % messages.length);
    }, 4000); // Change message every 4 seconds

    const authUnsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => {
      clearInterval(messageInterval);
      authUnsubscribe();
    }; 
  }, []);

  return (
    <AppBar 
      position="fixed" 
      sx={{ 
        background: 'rgba(255, 0, 0, 0.8)', 
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.12)'
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* Left: Theme Toggle Button */}
        <Box>
          <IconButton sx={{ ml: 1 }} onClick={toggleDarkMode} color="inherit">
            {darkMode ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
        </Box>

        {/* Center: Animated Notification Text */}
        <Box sx={{ flexGrow: 1, textAlign: 'center', overflow: 'hidden' }}>
          <Typography
            key={messageIndex}
            variant="subtitle1"
            component="div"
            sx={{
              color: 'white',
              fontWeight: 'bold',
              animation: `${fadeInOut} 4s ease-in-out`,
              display: 'inline-block',
              fontSize: { xs: '0.8rem', sm: '1rem' } // Responsive font size
            }}
          >
            {messages[messageIndex]}
          </Typography>
        </Box>

        {/* Right: User Avatar - now links to /account */}
        <Box>
          <IconButton color="inherit" component={Link} to="/account">
            <Avatar 
              sx={{ width: 32, height: 32 }}
              alt={user ? user.displayName : 'Tài khoản khách'}
              src={user ? user.photoURL : DEFAULT_AVATAR}
            />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
