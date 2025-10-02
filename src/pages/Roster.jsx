import React, { useState, useEffect } from 'react';
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
    Alert
} from '@mui/material';
import { keyframes } from '@mui/system';

// RGB Glow Animation
const rgbGlow = keyframes`
    0% { box-shadow: 0 0 5px #ff0000, 0 0 10px #ff0000; }
    33% { box-shadow: 0 0 5px #00ff00, 0 0 10px #00ff00; }
    66% { box-shadow: 0 0 5px #0000ff, 0 0 10px #0000ff; }
    100% { box-shadow: 0 0 5px #ff0000, 0 0 10px #ff0000; }
`;

// Green Glow Animation
const greenGlow = keyframes`
    0% { box-shadow: 0 0 3px #00e676, 0 0 6px #00e676; }
    50% { box-shadow: 0 0 8px #69f0ae, 0 0 12px #69f0ae; }
    100% { box-shadow: 0 0 3px #00e676, 0 0 6px #00e676; }
`;

// MemberCard component to display individual member info
const MemberCard = ({ member, glowType }) => {
    const glowAnimation = glowType === 'rgb' 
        ? `${rgbGlow} 4s ease-in-out infinite`
        : `${greenGlow} 3s ease-in-out infinite`;

    return (
        <Card sx={{
            display: 'flex',
            alignItems: 'center',
            p: 1.5,
            borderRadius: 3,
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(5px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            animation: glowAnimation,
            height: '100%', // Ensure card takes full height of grid item
        }}>
            <Avatar 
                src="https://cdn.pixabay.com/photo/2017/09/04/09/38/crosses-2713356_960_720.jpg" 
                sx={{
                    width: { xs: 48, sm: 56 }, 
                    height: { xs: 48, sm: 56 },
                    mr: 2, 
                    border: '2px solid #fff' 
                }}
            />
            <Box>
                <Typography variant="h6" component="div" fontWeight="bold" sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}>
                    {member.saintName} {member.fullName}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}><strong>Quê quán:</strong> {member.hometown}</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}><strong>Giáo xứ:</strong> {member.parish}</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}><strong>Giáo hạt:</strong> {member.deanery}</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}><strong>Giáo phận:</strong> {member.diocese}</Typography>
            </Box>
        </Card>
    );
};

const Roster = () => {
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMembers = async () => {
            const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbynn6ekaJOeM0fQctAjQzy8TQwSqIRbVj4N6gJNyOCIYy-KgOuk7LKZGXKu7XxXUO1eVA/exec';
            try {
                setLoading(true);
                const response = await axios.get(`${SCRIPT_URL}?action=read`);
                if (response.data && response.data.result === 'success') {
                    // Sort all data by joinYear descending (newest to oldest)
                    const sortedData = response.data.data.sort((a, b) => Number(b.joinYear) - Number(a.joinYear));
                    setMembers(sortedData);
                } else {
                    throw new Error(response.data.message || 'Không thể tải dữ liệu.');
                }
            } catch (err) {
                setError(err.message || 'Đã xảy ra lỗi khi kết nối đến máy chủ.');
            } finally {
                setLoading(false);
            }
        };

        fetchMembers();
    }, []);

    const currentYear = new Date().getFullYear();
    // New students are just a filter of the main, sorted list
    const newStudents = members.filter(m => Number(m.joinYear) === currentYear);

    if (loading) {
        return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}><CircularProgress size={60} /></Box>;
    }

    if (error) {
        return <Alert severity="error" sx={{ mt: 4 }}>{error}</Alert>;
    }

    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            {/* New Students Section - still shown separately for highlighting */}
            {newStudents.length > 0 && (
                 <Card sx={{ mb: 5, p: 2, borderRadius: 4, background: 'rgba(0,0,0,0.2)', backdropFilter: 'blur(10px)' }}>
                    <CardContent>
                        <Typography variant="h4" component="h2" gutterBottom textAlign="center" fontWeight="bold" color="#ffeb3b">
                            ✨ TÂN SINH VIÊN {currentYear} ✨
                        </Typography>
                        <Grid container spacing={2} sx={{ justifyContent: 'center' }}>
                            {newStudents.map((member, index) => (
                                <Grid item xs={12} md={6} key={`new-${member.phone}-${index}`}>
                                    <MemberCard member={member} glowType="rgb" />
                                </Grid>
                            ))}
                        </Grid>
                    </CardContent>
                </Card>
            )}

            {/* All Members Section */}
            <Card sx={{ p: 2, borderRadius: 4, background: 'rgba(0,0,0,0.2)', backdropFilter: 'blur(10px)' }}>
                <CardContent>
                    <Typography variant="h4" component="h2" gutterBottom textAlign="center" fontWeight="bold" color="#4caf50">
                        DANH SÁCH THÀNH VIÊN
                    </Typography>
                    <Grid container spacing={2} sx={{ justifyContent: 'center' }}>
                        {members.length > 0 ? (
                            members.map((member, index) => (
                                <Grid item xs={12} md={6} key={`all-${member.phone}-${index}`}>
                                    {/* All cards in this list have a green glow */}
                                    <MemberCard member={member} glowType="green" />
                                </Grid>
                            ))
                        ) : (
                            <Grid item xs={12}>
                                <Typography textAlign="center" sx={{ mt: 2 }}>Không có thành viên nào để hiển thị.</Typography>
                            </Grid>
                        )}
                    </Grid>
                </CardContent>
            </Card>

        </Container>
    );
}

export default Roster;
