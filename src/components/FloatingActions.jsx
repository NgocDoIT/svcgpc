import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Fab,
    Tooltip,
    Menu,
    MenuItem,
    ListItemIcon,
    Typography
} from '@mui/material';
import {
    AdminPanelSettings,
    Facebook, // Import Facebook icon
    Tune, 
    AssignmentInd, 
    ManageAccounts 
} from '@mui/icons-material';
import { auth, db } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from "firebase/firestore";

const ROLES = {
    DEV: 'Nhà Phát Triển',
    ADMIN: 'Ban Điều Hành',
    MEMBER: 'Thành Viên',
};

const actions = [
    { icon: <AssignmentInd fontSize="small" />, name: 'Ghi Danh Tân Sinh Viên', path: '/register-student' },
    { icon: <ManageAccounts fontSize="small" />, name: 'Cập Nhật Thông Tin', path: '/update-info' },
];

const FloatingActions = () => {
    const [userRole, setUserRole] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate();
    const isMenuOpen = Boolean(anchorEl);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const userRef = doc(db, "users", user.uid);
                const docSnap = await getDoc(userRef);
                setUserRole(docSnap.exists() ? docSnap.data().role : ROLES.MEMBER);
            } else {
                setUserRole(null); // Guest user
            }
        });
        return () => unsubscribe();
    }, []);

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleActionClick = (path) => {
        handleMenuClose();
        navigate(path);
    };
    
    const handleAdminClick = () => {
        navigate('/admin');
    }

    const openFacebookPage = () => {
        window.open('https://www.facebook.com/nhomsvcgphucuong/', '_blank', 'noopener,noreferrer');
    }

    return (
        <Box
            sx={{
                position: 'fixed',
                bottom: { xs: 80, sm: 30 },
                right: { xs: 16, sm: 24 },
                zIndex: 1050,
                display: 'flex',
                flexDirection: 'column-reverse',
                alignItems: 'center',
                gap: 2
            }}
        >
            {/* Messenger Button */}
            <Tooltip title="Facebook Page" placement="left">
                <Fab 
                    aria-label="Facebook Page"
                    onClick={openFacebookPage}
                    sx={{
                        backgroundColor: '#1877F2', // Facebook brand color
                        color: 'white',
                        '&:hover': {
                            backgroundColor: '#166fe5' // A slightly darker shade for hover
                        }
                    }}
                >
                    <Facebook />
                </Fab>
            </Tooltip>

            {/* Features Menu Button */}
            <Tooltip title="Chức năng" placement="left">
                 <Fab color="secondary" aria-label="features" onClick={handleMenuOpen}>
                    <Tune />
                </Fab>
            </Tooltip>
            <Menu
                anchorEl={anchorEl}
                open={isMenuOpen}
                onClose={handleMenuClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                PaperProps={{
                    elevation: 4,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: -1.5,
                        ml: -2,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                    },
                }}
            >
                {actions.map((action) => (
                    <MenuItem key={action.name} onClick={() => handleActionClick(action.path)} sx={{ width: '100%', padding: '10px 20px'}}>
                        <ListItemIcon>
                            {action.icon}
                        </ListItemIcon>
                        <Typography variant="body1">{action.name}</Typography>
                    </MenuItem>
                ))}
            </Menu>

            {/* Admin Button */}
            {(userRole === ROLES.DEV || userRole === ROLES.ADMIN) && (
                <Tooltip title="Quản trị viên" placement="left">
                    <Fab color="warning" aria-label="admin" onClick={handleAdminClick}>
                        <AdminPanelSettings />
                    </Fab>
                </Tooltip>
            )}
        </Box>
    );
};

export default FloatingActions;
