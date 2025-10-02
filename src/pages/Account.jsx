import React, { useState, useEffect } from 'react';
import {
    Typography, Avatar, Box, TextField, Button, Paper, CircularProgress,
    Grid, Tooltip, IconButton, Divider
} from '@mui/material';
import { keyframes } from '@emotion/react';
import {
    Google, Edit, Save, Cancel
} from '@mui/icons-material';
import { auth, googleProvider, db } from '../firebase';
import { signInWithPopup, onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

const ROLES = {
    DEV: 'Nhà Phát Triển',
    ADMIN: 'Ban Điều Hành',
    MEMBER: 'Thành Viên',
    GUEST: 'Tài Khoản Khách'
};

const DEFAULT_AVATAR_URL = "https://cdn.pixabay.com/photo/2017/09/04/09/38/crosses-2713356_960_720.jpg";

const rgbGlowAnimation = keyframes`
  0% { box-shadow: 0 0 12px 2px rgba(255, 0, 0, 0.7); }
  25% { box-shadow: 0 0 18px 4px rgba(0, 255, 0, 0.7); }
  50% { box-shadow: 0 0 12px 2px rgba(0, 0, 255, 0.7); }
  75% { box-shadow: 0 0 18px 4px rgba(255, 255, 0, 0.7); }
  100% { box-shadow: 0 0 12px 2px rgba(255, 0, 255, 0.7); }
`;

const AccountPage = () => {
    const [user, setUser] = useState(null);
    const [userRole, setUserRole] = useState(ROLES.GUEST);
    const [loading, setLoading] = useState(true);
    const [guestName, setGuestName] = useState('SVCGPC');
    const [editGuestName, setEditGuestName] = useState('');
    const [isEditingOwnName, setIsEditingOwnName] = useState(false);
    const [newDisplayName, setNewDisplayName] = useState('');

    const avatarGlow = {
        animation: `${rgbGlowAnimation} 4s ease-in-out infinite alternate`,
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setLoading(true);
            if (currentUser) {
                const userRef = doc(db, "users", currentUser.uid);
                const docSnap = await getDoc(userRef);
                let userData, currentRole;

                if (docSnap.exists()) {
                    userData = docSnap.data();
                    currentRole = userData.role || ROLES.MEMBER;
                } else {
                    // Default role assignment for new users
                    currentRole = currentUser.email === 'ngocdoit99@gmail.com' ? ROLES.DEV : ROLES.MEMBER;
                    userData = {
                        email: currentUser.email,
                        googleName: currentUser.displayName, 
                        displayName: currentUser.displayName, 
                        photoURL: currentUser.photoURL,
                        role: currentRole,
                        createdAt: new Date()
                    };
                    await setDoc(userRef, userData);
                }

                const fullUserData = { ...currentUser, ...userData };
                setUser(fullUserData);
                setUserRole(currentRole);
                setNewDisplayName(fullUserData.displayName);

            } else {
                setUser(null);
                setUserRole(ROLES.GUEST);
            }
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const savedName = localStorage.getItem('guestName');
        if (savedName) setGuestName(savedName);
    }, []);

    const handleGoogleSignIn = () => signInWithPopup(auth, googleProvider).catch(err => console.error(err));
    const handleSignOut = () => signOut(auth);

    const handleSaveGuestName = () => {
        if (editGuestName.trim()) {
            setGuestName(editGuestName);
            localStorage.setItem('guestName', editGuestName);
            setEditGuestName('');
        }
    };

    const handleUpdateOwnDisplayName = async () => {
        if (!newDisplayName.trim() || !user) return;
        const userRef = doc(db, "users", user.uid);
        await updateDoc(userRef, { displayName: newDisplayName });
        setUser(prev => ({ ...prev, displayName: newDisplayName }));
        setIsEditingOwnName(false);
    }

    const renderGuestView = () => (
        <Grid container spacing={3} justifyContent="center">
            <Grid item xs={12} md={8}>
                <Paper elevation={4} sx={{ p: 4, textAlign: 'center'}}>
                    <Avatar sx={{ width: 90, height: 90, m: '0 auto 16px', ...avatarGlow }} src={DEFAULT_AVATAR_URL} />
                    <Typography variant="h4" component="h2" fontWeight="500" gutterBottom>{guestName}</Typography>
                    <Typography variant="h6" color="text.secondary" sx={{mb: 4}}>{ROLES.GUEST}</Typography>

                    <Divider sx={{my: 3}}/>

                    <Typography variant="h6" gutterBottom>Đổi tên hiển thị</Typography>
                    <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
                        <TextField fullWidth label="Nhập tên mới" variant="outlined" value={editGuestName} onChange={(e) => setEditGuestName(e.target.value)} />
                        <Button variant="contained" onClick={handleSaveGuestName} size="large">Lưu</Button>
                    </Box>
                    
                    <Divider sx={{my: 3}}/>

                    <Typography variant="h6" gutterBottom>Đăng Nhập</Typography>
                    <Typography variant="body2" color="text.secondary" sx={{mb: 2}}>Đăng nhập với tài khoản Google để có thể lưu thông tin và nhận thông báo!!</Typography>
                    <Button variant="contained" startIcon={<Google />} onClick={handleGoogleSignIn} sx={{ py: 1.5, px: 4, background: '#4285F4', color: 'white', '&:hover': { background: '#357ae8'} }}>
                        Đăng Nhập với Google
                    </Button>
                </Paper>
            </Grid>
        </Grid>
      );

    const renderUserView = () => (
        <Box>
            <Paper elevation={4} sx={{ p: {xs: 2, sm: 4}, textAlign: 'center', mb: 4, borderRadius: 3 }}>
                <Avatar sx={{ width: 100, height: 100, m: '0 auto 16px', ...avatarGlow }} alt={user.displayName} src={user.photoURL} />
                {
                    isEditingOwnName ? (
                        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', justifyContent: 'center', px: 2, maxWidth: 400, mx: 'auto'}}>
                            <TextField defaultValue={user.displayName} autoFocus fullWidth label="Tên hiển thị mới" onChange={e => setNewDisplayName(e.target.value)} size="small"/>
                            <Tooltip title="Lưu thay đổi">
                                <IconButton color="primary" onClick={handleUpdateOwnDisplayName} aria-label="Lưu tên hiển thị"><Save /></IconButton>
                            </Tooltip>
                            <Tooltip title="Hủy">
                                <IconButton onClick={() => setIsEditingOwnName(false)} aria-label="Hủy thay đổi tên"><Cancel /></IconButton>
                            </Tooltip>
                        </Box>
                    ) : (
                        <Box onDoubleClick={() => setIsEditingOwnName(true)} sx={{cursor: 'pointer'}}>
                            <Typography variant="h4" component="h2" fontWeight="500" gutterBottom>
                                {user.displayName} 
                                <Tooltip title="Đổi tên hiển thị">
                                    <IconButton size="small" onClick={() => setIsEditingOwnName(true)} aria-label="Bắt đầu chỉnh sửa tên"><Edit fontSize='inherit'/></IconButton>
                                </Tooltip>
                            </Typography>
                        </Box>
                    )
                }
                <Typography variant="h6" color="primary.main" sx={{ mb: 3 }}>{userRole}</Typography>
                <Button variant="outlined" color="error" onClick={handleSignOut}>Đăng Xuất</Button>
            </Paper>
        </Box>
    );

    if (loading) {
        return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}><CircularProgress size={60} /></Box>;
    }

    return (
        <Box sx={{ maxWidth: 900, margin: 'auto', p: {xs: 1, sm: 2, md: 3} }}>
            <Typography variant="h3" component="h1" gutterBottom align="center" fontWeight="bold" sx={{mb: 4}}>Trang Thông Tin</Typography>
            {user ? renderUserView() : renderGuestView()}
        </Box>
    );
}

export default AccountPage;
