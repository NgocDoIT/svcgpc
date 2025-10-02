import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import { lightTheme, darkTheme } from './theme/theme';
import Header from './components/Header';
import FooterMenu from './components/FooterMenu';
import FloatingActions from './components/FloatingActions'; // Import FloatingActions
import Home from './pages/Home';
import News from './pages/News';
import Roster from './pages/Roster';
import Account from './pages/Account';
import Admin from './pages/Admin';
import RegisterStudent from './pages/RegisterStudent';
import UpdateInfo from './pages/UpdateInfo';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <FloatingActions />
      <Box sx={{ 
        minHeight: '100vh',
        backgroundSize: 'cover', 
        backgroundPosition: 'center', 
        paddingTop: '64px', 
        paddingBottom: '80px' 
      }}>
        <Header toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
        <Box sx={{ p: 3 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/news" element={<News />} />
            <Route path="/roster" element={<Roster />} />
            <Route path="/account" element={<Account />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/register-student" element={<RegisterStudent />} />
            <Route path="/update-info" element={<UpdateInfo />} />
          </Routes>
        </Box>
        <FooterMenu />
      </Box>
    </ThemeProvider>
  );
}

export default App;
