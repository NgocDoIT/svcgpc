import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
    Container,
    Typography,
    Card,
    CardContent,
    Box,
    Avatar,
    CircularProgress,
    Grid,
    Alert,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    List,
    ListItem,
    ListItemText,
    Divider,
    TextField,
    Snackbar
} from '@mui/material';
import { Edit, Delete, Save, Cancel, FolderShared, Facebook } from '@mui/icons-material';
import { keyframes } from '@mui/system';
import { auth, db } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from "firebase/firestore";

const ROLES = {
    DEV: 'Nhà Phát Triển',
    ADMIN: 'Ban Điều Hành',
};

const greenGlow = keyframes`
    0% { box-shadow: 0 0 3px #00e676, 0 0 6px #00e676; }
    50% { box-shadow: 0 0 8px #69f0ae, 0 0 12px #69f0ae; }
    100% { box-shadow: 0 0 3px #00e676, 0 0 6px #00e676; }
`;

const userTypeLabels = {
    student: 'Sinh Viên',
    graduated: 'Đã ra trường',
    working: 'Người đi làm'
};

const MemberCard = ({ member, onClick }) => (
    <Card 
        onClick={onClick}
        sx={{
            display: 'flex',
            alignItems: 'center',
            p: 1.5,
            borderRadius: 3,
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(5px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            animation: `${greenGlow} 3s ease-in-out infinite`,
            height: '100%',
            cursor: 'pointer',
            transition: 'transform 0.2s',
            '&:hover': {
                transform: 'translateY(-4px)',
            }
        }}
    >
        <Avatar 
            src="https://cdn.pixabay.com/photo/2017/09/04/09/38/crosses-2713356_960_720.jpg" 
            sx={{ width: { xs: 48, sm: 56 }, height: { xs: 48, sm: 56 }, mr: 2, border: '2px solid #fff' }}
        />
        <Box>
            <Typography variant="h6" component="div" fontWeight="bold" sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}>
                {member.saintName} {member.fullName}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
                <strong>Năm tham gia:</strong> {member.joinYear}
            </Typography>
        </Box>
    </Card>
);

const AdminPage = () => {
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [selectedMember, setSelectedMember] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);
    const [editedData, setEditedData] = useState(null);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
    const navigate = useNavigate();

    const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbynn6ekaJOeM0fQctAjQzy8TQwSqIRbVj4N6gJNyOCIYy-KgOuk7LKZGXKu7XxXUO1eVA/exec';

    const fetchMembersFromSheet = async () => {
        if (!loading) setLoading(true);
        try {
            const response = await axios.get(`${SCRIPT_URL}?action=read`);
            if (response.data && response.data.result === 'success') {
                const sortedData = response.data.data.sort((a, b) => Number(b.joinYear) - Number(a.joinYear));
                setMembers(sortedData);
            } else { throw new Error(response.data.message || 'Không thể tải dữ liệu.'); }
        } catch (err) { setError(err.message || 'Lỗi kết nối.'); }
        finally { setLoading(false); }
    };

    useEffect(() => {
        const checkAuth = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                const userRef = doc(db, "users", currentUser.uid);
                const docSnap = await getDoc(userRef);
                if (docSnap.exists() && (docSnap.data().role === ROLES.DEV || docSnap.data().role === ROLES.ADMIN)) {
                    fetchMembersFromSheet();
                } else { setLoading(false); navigate('/account'); }
            } else { setLoading(false); navigate('/account'); }
        });
        return () => checkAuth();
    }, [navigate]);

    const handleOpenModal = (member) => {
        setSelectedMember(member);
        setEditedData({ ...member });
        setIsEditMode(false);
    };

    const handleCloseModal = () => {
        setSelectedMember(null); setEditedData(null); setIsEditMode(false);
    };

    const handleDataChange = (e) => {
        const { name, value } = e.target;
        setEditedData(prev => ({ ...prev, [name]: value }));
    }

    const handleSaveChanges = async () => {
        setIsSubmitting(true);
        const payload = { action: 'update', identifier: selectedMember.phone, data: editedData };
        try {
            const response = await axios.post(SCRIPT_URL, payload, { headers: { 'Content-Type': 'text/plain' }});
            if (response.data.result !== 'success') throw new Error(response.data.message || 'Lỗi khi lưu từ Google Script.');
            await fetchMembersFromSheet();
            setSnackbar({ open: true, message: 'Cập nhật thành công!', severity: 'success' });
            handleCloseModal();
        } catch (error) {
            setSnackbar({ open: true, message: `Lỗi: ${error.message}`, severity: 'error' });
        } finally { setIsSubmitting(false); }
    };

    const handleDelete = async () => {
        if (window.confirm(`Xác nhận xóa thành viên ${selectedMember.fullName}?\nThao tác này không thể hoàn tác!`)) {
            setIsSubmitting(true);
            const payload = { action: 'delete', phone: selectedMember.phone };
            try {
                const response = await axios.post(SCRIPT_URL, payload, { headers: { 'Content-Type': 'text/plain' }});
                if (response.data.result !== 'success') throw new Error(response.data.message || 'Lỗi khi xóa từ Google Script.');
                setMembers(members.filter(m => m.phone !== selectedMember.phone));
                setSnackbar({ open: true, message: 'Đã xóa thành viên.', severity: 'warning' });
                handleCloseModal();
            } catch (error) {
                setSnackbar({ open: true, message: `Lỗi: ${error.message}`, severity: 'error' });
            } finally { setIsSubmitting(false); }
        }
    };

    const renderDetailItem = (primary, secondary) => (secondary ? <ListItem><ListItemText primary={primary} secondary={secondary} /></ListItem> : null);
    const renderEditField = (name, label, value, disabled = false) => (<TextField name={name} label={label} value={value || ''} onChange={handleDataChange} variant="outlined" fullWidth margin="dense" size="small" disabled={disabled}/>);

    if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}><CircularProgress size={60} /></Box>;
    if (error) return <Alert severity="error" sx={{ mt: 4 }}>{error}</Alert>;

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Card sx={{ p: 2, borderRadius: 4, background: 'rgba(0,0,0,0.2)', backdropFilter: 'blur(10px)' }}>
                <CardContent>
                    <Typography variant="h4" component="h2" gutterBottom textAlign="center" fontWeight="bold" color="#ffc107">TRANG QUẢN LÝ THÀNH VIÊN</Typography>
                    <Grid container spacing={2} sx={{ justifyContent: 'center' }}>
                        {members.map((member, index) => (
                            <Grid item xs={12} md={6} key={`${member.phone}-${index}`}> <MemberCard member={member} onClick={() => handleOpenModal(member)} /> </Grid>
                        ))}
                    </Grid>
                </CardContent>
            </Card>

            <Box textAlign='center' sx={{ mt: 3, p: 2, background: 'rgba(0,0,0,0.2)', borderRadius: 2 }}>
                <Button
                    variant="contained"
                    color="success"
                    startIcon={<FolderShared />}
                    href="https://docs.google.com/spreadsheets/d/1iCPLQyiUomKjrV-7YlWM0ccekO5oe3lT7RIR9eRbGXw/edit?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{ fontWeight: 'bold' }}
                >
                    Xem danh sách File Excel
                </Button>
                 <Typography variant="body2" color="text.secondary" sx={{ mt: 2, maxWidth: 600, mx: 'auto' }}>
                    Lưu ý: File chỉ có thể xem, không được chỉnh sửa trực tiếp, nếu bạn cần chỉnh sửa trực tiếp thông tin trong file excel vui lòng tải về máy và sử dụng Hoặc ấn vào liên hệ bên dưới để được hỗ trợ thêm tính năng bất kì, hoặc chỉnh sửa bất cứ thông tin nào!! Thank!
                </Typography>
                <Button
                    variant="outlined"
                    startIcon={<Facebook />}
                    href="https://www.facebook.com/ngocdoqb"
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{ mt: 2 }}
                >
                    Liên hệ hỗ trợ
                </Button>
            </Box>

            <Dialog open={!!selectedMember} onClose={handleCloseModal} fullWidth maxWidth="sm">
                <DialogTitle sx={{ fontWeight: 'bold' }}>{isEditMode ? 'Chỉnh Sửa Thông Tin' : 'Thông Tin Chi Tiết'}</DialogTitle>
                <Divider />
                <DialogContent>
                    {editedData && ( isEditMode ? (
                            <Box component="form" noValidate autoComplete="off">
                                {renderEditField("saintName", "Tên Thánh", editedData.saintName)}
                                {renderEditField("fullName", "Họ và Tên", editedData.fullName)}
                                {renderEditField("joinYear", "Năm tham gia", editedData.joinYear)}
                                {renderEditField("phone", "Số điện thoại (Không thể sửa)", editedData.phone, true)}
                                {renderEditField("facebook", "Facebook", editedData.facebook)}
                                {renderEditField("address", "Chỗ ở", editedData.address)}
                                {renderEditField("hometown", "Quê quán", editedData.hometown)}
                                {renderEditField("parish", "Giáo xứ", editedData.parish)}
                                {renderEditField("deanery", "Giáo hạt", editedData.deanery)}
                                {renderEditField("diocese", "Giáo phận", editedData.diocese)}
                                {renderEditField("university", "Trường", editedData.university)}
                                {renderEditField("major", "Ngành học", editedData.major)}
                            </Box>
                        ) : (
                            <List dense>
                                {renderDetailItem("Tên Thánh & Họ Tên", `${editedData.saintName} ${editedData.fullName}`)}
                                {renderDetailItem("Ngày Sinh", `${editedData.birthDay}/${editedData.birthMonth}/${editedData.birthYear}`)}
                                {renderDetailItem("Năm tham gia", editedData.joinYear)} {renderDetailItem("Số điện thoại", editedData.phone)}
                                {renderDetailItem("Facebook", editedData.facebook)} {renderDetailItem("Chỗ ở hiện tại", editedData.address)}
                                {renderDetailItem("Quê quán", editedData.hometown)} {renderDetailItem("Giáo xứ", editedData.parish)}
                                {renderDetailItem("Giáo hạt", editedData.deanery)} {renderDetailItem("Giáo phận", editedData.diocese)}
                                {renderDetailItem("Đối tượng", userTypeLabels[editedData.userType])} {renderDetailItem("Năm sinh viên", editedData.studentYear)}
                                {renderDetailItem("Trường", editedData.university)} {renderDetailItem("Ngành học", editedData.major)}
                            </List>
                        ))}
                </DialogContent>
                <Divider />
                <DialogActions sx={{ p: 2, justifyContent: 'space-between' }}>
                    <Button color="error" onClick={handleDelete} startIcon={<Delete />} disabled={isEditMode || isSubmitting}>Xóa</Button>
                    <Box>
                        {isEditMode ? (
                            <>
                                <Button onClick={() => setIsEditMode(false)} startIcon={<Cancel />} disabled={isSubmitting}>Hủy</Button>
                                <Button onClick={handleSaveChanges} variant="contained" startIcon={isSubmitting ? <CircularProgress size={20}/> : <Save />} sx={{ ml: 1 }} disabled={isSubmitting}>Lưu</Button>
                            </>
                        ) : (
                            <Button onClick={() => setIsEditMode(true)} variant="contained" startIcon={<Edit />}>Chỉnh Sửa</Button>
                        )}
                    </Box>
                </DialogActions>
            </Dialog>
            
            <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={() => setSnackbar({ ...snackbar, open: false })} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
                <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: '100%' }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Container>
    );
}

export default AdminPage;
