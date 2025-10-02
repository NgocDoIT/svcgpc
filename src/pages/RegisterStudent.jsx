import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { 
    Container, 
    Card, 
    CardContent, 
    Typography, 
    TextField, 
    Select, 
    MenuItem, 
    FormControl, 
    InputLabel, 
    Button,
    Box,
    InputAdornment,
    ToggleButton,
    ToggleButtonGroup,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions
} from '@mui/material';
import { 
    Badge, Person, CalendarToday, Phone, Facebook, Home, LocationCity, 
    Church, Map, Work, School, Science, Event, BusinessCenter, Beenhere,
    Favorite
} from '@mui/icons-material';

const userTypeLabels = {
    student: 'Sinh Viên',
    graduated: 'Đã ra trường',
    working: 'Người đi làm'
};

const RegisterStudent = () => {
    const currentYear = new Date().getFullYear().toString();

    const getInitialFormData = () => ({
        saintName: '', fullName: '', birthDay: '', birthMonth: '', birthYear: '',
        phone: '', facebook: '', address: '', hometown: '', parish: '',
        deanery: '', diocese: '', userType: '', studentYear: '', university: '',
        major: '', joinYear: currentYear
    });

    const [formData, setFormData] = useState(getInitialFormData());
    const [loading, setLoading] = useState(false);
    const [submissionSuccess, setSubmissionSuccess] = useState(false);
    const [submittedData, setSubmittedData] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleUserTypeChange = (event, newUserType) => {
        if (newUserType !== null) {
            setFormData(prevState => ({ ...prevState, userType: newUserType }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbynn6ekaJOeM0fQctAjQzy8TQwSqIRbVj4N6gJNyOCIYy-KgOuk7LKZGXKu7XxXUO1eVA/exec';
        const payload = { action: 'create', data: formData };

        try {
            const response = await axios.post(SCRIPT_URL, payload, { headers: { 'Content-Type': 'text/plain' } });

            if (response.data.result === 'success') {
                setSubmittedData(formData);
                setSubmissionSuccess(true);
                setFormData(getInitialFormData()); // Reset form to initial state with current year
            } else {
                throw new Error(response.data.message || 'Có lỗi xảy ra từ phía máy chủ.');
            }
        } catch (error) {
            console.error("Lỗi khi gửi dữ liệu:", error);
            alert(`Đã có lỗi xảy ra khi gửi thông tin. Vui lòng thử lại. Lỗi: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const handleCloseDialog = () => {
        setSubmissionSuccess(false);
    };

    const handleNavigateToList = () => {
        setSubmissionSuccess(false);
        navigate('/roster');
    };

    const years = Array.from({ length: new Date().getFullYear() - 1969 }, (_, i) => 1970 + i).reverse();
    const months = Array.from({ length: 12 }, (_, i) => i + 1);
    const days = Array.from({ length: 31 }, (_, i) => i + 1);
    const studentYears = ['Năm Thứ Nhất', 'Năm Thứ Hai', 'Năm Thứ Ba', 'Năm Thứ Tư', 'Năm Thứ Năm', 'Năm Thứ Sáu', 'Năm Thứ Bảy', 'Năm Cuối'];

    const renderIcon = (icon) => <InputAdornment position="start">{icon}</InputAdornment>;
    
    const toggleButtonStyle = {
        display: 'flex', flexDirection: 'column', flexGrow: 1, textTransform: 'none',
        fontWeight: 'bold', borderRadius: 2, border: '1px solid rgba(0, 0, 0, 0.12) !important',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)', transition: 'box-shadow 0.3s ease',
        '&:hover': { boxShadow: '0 5px 15px rgba(0,0,0,0.2)' },
        '&.Mui-selected': {
            backgroundColor: 'primary.main', color: 'white',
            boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
            '&:hover': { backgroundColor: 'primary.dark' }
        }
    };

    return (
        <Container maxWidth="md" sx={{ mt: 10, mb: 4 }}>
            <Card sx={{ background: 'rgba(255, 255, 255, 0.9)', backdropFilter: 'blur(10px)', borderRadius: 4, boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)' }}>
                <CardContent sx={{ p: { xs: 2, sm: 4 } }}>
                    <Typography variant="h4" component="h1" gutterBottom textAlign="center" fontWeight="bold" color="primary.main">
                        Ghi Danh Tân Sinh Viên
                    </Typography>
                    <Typography variant="subtitle1" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', my: 2, color: 'text.secondary', fontStyle: 'italic', textAlign: 'center' }}>
                        <Favorite sx={{ mr: 1, color: 'primary.main' }} />
                        Chào mừng bạn đến với đại Gia Đình Sinh Viên Công Giáo Phú Cường
                        <Favorite sx={{ ml: 1, color: 'primary.main' }} />
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                        <TextField name="saintName" label="Tên Thánh" fullWidth value={formData.saintName} onChange={handleChange} required InputProps={{ startAdornment: renderIcon(<Badge color="action"/>) }} />
                        <TextField name="fullName" label="Họ và Tên" fullWidth value={formData.fullName} onChange={handleChange} required InputProps={{ startAdornment: renderIcon(<Person color="action"/>) }} />

                        <Typography variant="subtitle2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: -1 }}><CalendarToday sx={{ mr: 1, color: 'action.active' }}/> Ngày Sinh</Typography>
                        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, justifyContent: 'center' }}>
                            <FormControl sx={{ minWidth: 120 }}><InputLabel>Năm</InputLabel><Select name="birthYear" label="Năm" value={formData.birthYear} onChange={handleChange} required>{years.map(y => <MenuItem key={y} value={y}>{y}</MenuItem>)}</Select></FormControl>
                            <FormControl sx={{ minWidth: 120 }}><InputLabel>Tháng</InputLabel><Select name="birthMonth" label="Tháng" value={formData.birthMonth} onChange={handleChange} required>{months.map(m => <MenuItem key={m} value={m}>{m}</MenuItem>)}</Select></FormControl>
                            <FormControl sx={{ minWidth: 120 }}><InputLabel>Ngày</InputLabel><Select name="birthDay" label="Ngày" value={formData.birthDay} onChange={handleChange} required>{days.map(d => <MenuItem key={d} value={d}>{d}</MenuItem>)}</Select></FormControl>
                        </Box>

                        <TextField name="phone" label="Số điện thoại + Zalo" fullWidth value={formData.phone} onChange={handleChange} required InputProps={{ startAdornment: renderIcon(<Phone color="action"/>) }} />
                        <TextField name="facebook" label="Link Facebook (không bắt buộc)" fullWidth value={formData.facebook} onChange={handleChange} InputProps={{ startAdornment: renderIcon(<Facebook color="action"/>) }} />
                        <TextField name="address" label="Chỗ ở hiện nay?" fullWidth value={formData.address} onChange={handleChange} required InputProps={{ startAdornment: renderIcon(<Home color="action"/>) }} />
                        <TextField name="hometown" label="Quê Quán?" fullWidth value={formData.hometown} onChange={handleChange} required InputProps={{ startAdornment: renderIcon(<LocationCity color="action"/>) }} />
                        <TextField name="parish" label="Bạn đến từ Giáo Xứ?" fullWidth value={formData.parish} onChange={handleChange} required InputProps={{ startAdornment: renderIcon(<Church color="action"/>) }} />
                        <TextField name="deanery" label="Bạn đến từ Giáo Hạt?" fullWidth value={formData.deanery} onChange={handleChange} required InputProps={{ startAdornment: renderIcon(<LocationCity color="action"/>) }} />
                        <TextField name="diocese" label="Bạn đến từ Giáo Phận?" fullWidth value={formData.diocese} onChange={handleChange} required InputProps={{ startAdornment: renderIcon(<Map color="action"/>) }} />

                        <Box>
                            <Typography variant="subtitle2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1.5 }}><Work sx={{ mr: 1, color: 'action.active' }}/> Bạn là?</Typography>
                            <ToggleButtonGroup color="primary" value={formData.userType} exclusive onChange={handleUserTypeChange} aria-label="User type" fullWidth sx={{ gap: 2, border: 'none' }}>
                                <ToggleButton value="student" sx={toggleButtonStyle}><School sx={{ mb: 1 }}/>Sinh Viên</ToggleButton>
                                <ToggleButton value="graduated" sx={toggleButtonStyle}><Beenhere sx={{ mb: 1 }}/>Đã ra trường</ToggleButton>
                                <ToggleButton value="working" sx={toggleButtonStyle}><BusinessCenter sx={{ mb: 1 }}/>Người đi làm</ToggleButton>
                            </ToggleButtonGroup>
                        </Box>

                        {formData.userType === 'student' && (
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                                <FormControl fullWidth><InputLabel>Bạn học năm thứ</InputLabel><Select name="studentYear" label="Bạn học năm thứ" value={formData.studentYear} onChange={handleChange} startAdornment={renderIcon(<School color="action"/>)}>{studentYears.map(y => <MenuItem key={y} value={y}>{y}</MenuItem>)}</Select></FormControl>
                                <TextField name="university" label="Bạn học trường nào?" fullWidth value={formData.university} onChange={handleChange} InputProps={{ startAdornment: renderIcon(<School color="action"/>) }} />
                                <TextField name="major" label="Bạn học ngành gì?" fullWidth value={formData.major} onChange={handleChange} InputProps={{ startAdornment: renderIcon(<Science color="action"/>) }} />
                            </Box>
                        )}

                        {formData.userType === 'graduated' && (
                             <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                                <TextField name="university" label="Bạn đã học trường nào?" fullWidth value={formData.university} onChange={handleChange} InputProps={{ startAdornment: renderIcon(<School color="action"/>) }} />
                                <TextField name="major" label="Bạn đã học ngành gì?" fullWidth value={formData.major} onChange={handleChange} InputProps={{ startAdornment: renderIcon(<Science color="action"/>) }} />
                            </Box>
                        )}

                        <TextField name="joinYear" type="number" label="Bạn tham gia nhóm vào năm?" fullWidth value={formData.joinYear} disabled required InputProps={{ startAdornment: renderIcon(<Event color="action"/>) }} />
                        <Box textAlign="center" sx={{ mt: 2 }}>
                            <Button type="submit" variant="contained" size="large" disabled={loading} sx={{ fontWeight: 'bold', borderRadius: '50px', px: 5, py: 1.5, background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)', boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)' }}>{loading ? 'Đang gửi...' : 'Gửi Thông Tin'}</Button>
                        </Box>
                    </Box>
                </CardContent>
            </Card>

            <Dialog open={submissionSuccess} onClose={handleCloseDialog} fullWidth maxWidth="sm">
                <DialogTitle sx={{ textAlign: 'center', fontWeight: 'bold' }}>Gửi Thông Tin Thành Công!</DialogTitle>
                <DialogContent dividers>
                    {submittedData && (
                        <Box sx={{ p: 2, textAlign: 'center' }}>
                            <Typography variant="body1"><strong>Tên Thánh:</strong> {submittedData.saintName}</Typography>
                            <Typography variant="body1"><strong>Họ và Tên:</strong> {submittedData.fullName}</Typography>
                            <Typography variant="body1"><strong>Ngày Sinh:</strong> {`${submittedData.birthDay}/${submittedData.birthMonth}/${submittedData.birthYear}`}</Typography>
                            <Typography variant="body1"><strong>Số điện thoại + Zalo:</strong> {submittedData.phone}</Typography>
                            <Typography variant="body1"><strong>Chỗ ở hiện nay:</strong> {submittedData.address}</Typography>
                            <Typography variant="body1"><strong>Quê quán:</strong> {submittedData.hometown}</Typography>
                            <Typography variant="body1"><strong>Bạn đến từ Giáo Xứ:</strong> {submittedData.parish}</Typography>
                            <Typography variant="body1"><strong>Bạn đến từ Giáo Hạt:</strong> {submittedData.deanery}</Typography>
                            <Typography variant="body1"><strong>Bạn đến từ Giáo Phận:</strong> {submittedData.diocese}</Typography>
                            <Typography variant="body1"><strong>Bạn là:</strong> {userTypeLabels[submittedData.userType]}</Typography>
                            <Typography variant="body1"><strong>Năm tham gia nhóm:</strong> {submittedData.joinYear}</Typography>
                        </Box>
                    )}
                </DialogContent>
                <DialogActions sx={{ justifyContent: 'center', p:2 }}>
                    <Button onClick={handleCloseDialog}>Đóng</Button>
                    <Button onClick={handleNavigateToList} variant="contained" autoFocus>
                        Xem Danh Sách
                    </Button>
                </DialogActions>
            </Dialog>

        </Container>
    );
}

export default RegisterStudent;
