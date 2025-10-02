import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    Grid,
    Card,
    CardContent,
    Container,
    Avatar,
    IconButton,
    Paper
} from '@mui/material';
import { FaPrayingHands, FaSchool, FaHandshake, FaChurch, FaFacebook, FaYoutube, FaCross, FaBullhorn, FaUserPlus, FaUserEdit } from 'react-icons/fa';
import styles from './Home.module.css';
import { Link } from 'react-router-dom'; // Import Link

// Sample images - replace with your actual image paths in /src/assets
const images = {
    header1: 'https://media.canva.com/v2/image-resize/format:JPG/height:206/quality:92/uri:ifs%3A%2F%2FM%2F326264ed-433d-4ff5-9017-3bb79149916c/watermark:F/width:206?csig=AAAAAAAAAAAAAAAAAAAAAL7Zkp5s50I_Ar0C3d5Llamy-FbW-tRzCIKsU4fWshdJ&exp=1759420092&osig=AAAAAAAAAAAAAAAAAAAAAAVfqBy1RpZR_47tQoQ1KQ_4YpMVRBYOUpFQi1qAJPiN&signer=media-rpc&x-canva-quality=thumbnail_large',
    header2: 'https://media.canva.com/v2/image-resize/format:JPG/height:412/quality:92/uri:ifs%3A%2F%2FM%2F7d6fe668-741a-47ac-9105-4de045c3377f/watermark:F/width:550?csig=AAAAAAAAAAAAAAAAAAAAAGQZint94qXwrMHCIjMIN8A3VW0DnUkWqSD8RKSjDEbj&exp=1759420896&osig=AAAAAAAAAAAAAAAAAAAAAOLnzqtx-ao79gQZ8Ttzxi3M59nKl_ComYR58bLClqjy&signer=media-rpc&x-canva-quality=thumbnail_large',
    header3: 'https://media.canva.com/v2/image-resize/format:JPG/height:366/quality:92/uri:ifs%3A%2F%2FM%2F47394dfa-6d4a-4054-87c7-3262c2c92f20/watermark:F/width:550?csig=AAAAAAAAAAAAAAAAAAAAADmybYDy6Kd5HIJkCaInH2oLasDeteRAyf8TPsYrOtgI&exp=1759419481&osig=AAAAAAAAAAAAAAAAAAAAAPqvyAKQuA7Vn3DIIgxY1XV88tm9I521-99xD19fvo5k&signer=media-rpc&x-canva-quality=thumbnail_large',
    header4: 'https://media.canva.com/v2/image-resize/format:JPG/height:366/quality:92/uri:ifs%3A%2F%2FM%2F0bff8354-7c49-4ff6-a12c-d90e538c9f81/watermark:F/width:550?csig=AAAAAAAAAAAAAAAAAAAAAPhs5xa834n-jiM_OUhRMG4Mk_3VV59lqGM7y9tKvOjP&exp=1759419313&osig=AAAAAAAAAAAAAAAAAAAAAJa-1F8wP6bilFXcsduHNPeBz5juutLHbaDisgSFWobB&signer=media-rpc&x-canva-quality=thumbnail_large',
    logoMain: 'https://media.canva.com/v2/image-resize/format:JPG/height:550/quality:92/uri:ifs%3A%2F%2FM%2F8b72de9a-0e62-45be-9546-53281f410ade/watermark:F/width:550?csig=AAAAAAAAAAAAAAAAAAAAAPhCTgvuvuotwfKnjl1xeRZD_fbiR23RK-Mj1JCBTW2E&exp=1759418321&osig=AAAAAAAAAAAAAAAAAAAAAO8hGyBD522z89cw_MvJ-JwDZPLRp8z0G5rCQJpFtSHe&signer=media-rpc&x-canva-quality=thumbnail_large',
    logoSide1: 'https://media.canva.com/v2/image-resize/format:PNG/height:372/quality:100/uri:ifs%3A%2F%2FM%2Fa239231e-3b41-418c-97b6-682cdfd4c4bb/watermark:F/width:550?csig=AAAAAAAAAAAAAAAAAAAAAPMpgsv5XAhUJYtXBu1GLBGNuctqQHb6WKGM_QKD19_y&exp=1759419816&osig=AAAAAAAAAAAAAAAAAAAAAGRp22bKfUo3wHTbyiA-q1R7dJloJTGxEBTegIzukcdF&signer=media-rpc&x-canva-quality=thumbnail_large',
    logoSide2: 'https://media.canva.com/v2/image-resize/format:JPG/height:224/quality:92/uri:ifs%3A%2F%2FM%2F91f91b81-cc92-4bff-b1b3-b694d6d0a55b/watermark:F/width:225?csig=AAAAAAAAAAAAAAAAAAAAAKMz29EH3BuvAB61DJg8fLLq7KYELCfkcb6Ou5xOYzSu&exp=1759419320&osig=AAAAAAAAAAAAAAAAAAAAAHjnkGDlHZrThKgt2jTgXuhA71Mg3bn4bW646V8m5_rA&signer=media-rpc&x-canva-quality=thumbnail_large',
    gallery1: 'https://media.canva.com/v2/image-resize/format:JPG/height:206/quality:92/uri:ifs%3A%2F%2FM%2F12d51831-8527-4ec0-bb00-7a06b8ddc6f4/watermark:F/width:206?csig=AAAAAAAAAAAAAAAAAAAAAMHwvenXOt2EWwd69dLhfyD6jxVHcdFdYHo0uLtAJsXH&exp=1759421081&osig=AAAAAAAAAAAAAAAAAAAAAPZ-zEQ5Ji6PWEdWDSG9kDPwHqJtVh0DIuxneE3bMtW1&signer=media-rpc&x-canva-quality=thumbnail_large',
    gallery2: 'https://media.canva.com/v2/image-resize/format:JPG/height:391/quality:92/uri:ifs%3A%2F%2FM%2F2c0c9b16-76a1-44a3-afa3-9dfa0579bf49/watermark:F/width:550?csig=AAAAAAAAAAAAAAAAAAAAAPI4Es8NO8t58J4SVeRdljo5KgEKl35OtxaQi-7PqzvA&exp=1759418531&osig=AAAAAAAAAAAAAAAAAAAAAHesHfAoVM9LfwVPw5V4m2G9pocA3QUffzqaqpgBDWt2&signer=media-rpc&x-canva-quality=thumbnail_large',
    gallery3: 'https://media.canva.com/v2/image-resize/format:JPG/height:206/quality:92/uri:ifs%3A%2F%2FM%2F7809ec2a-1d6b-4d1e-b3ce-c92182b06cc5/watermark:F/width:206?csig=AAAAAAAAAAAAAAAAAAAAACMYaLqopBVw0Kon77uwwm4WkeTsgufzyg6gP01jwa0z&exp=1759420455&osig=AAAAAAAAAAAAAAAAAAAAAHVXqTcf6EalSMb-pZWx5Ic1_O5hZy6_NEeLW9HtdxMt&signer=media-rpc&x-canva-quality=thumbnail_large',
    gallery4: 'https://media.canva.com/v2/image-resize/format:JPG/height:206/quality:92/uri:ifs%3A%2F%2FM%2Fc525034e-1569-4723-a3ba-d6a12de200f4/watermark:F/width:206?csig=AAAAAAAAAAAAAAAAAAAAAIWGwfBOXU9cnwFwVHSoTTtkveWohC7wBS20yCpNj3CB&exp=1759420416&osig=AAAAAAAAAAAAAAAAAAAAALeDGy7oTzH1QPAEyDRRWenLDfXIcAL_HAy5TZWsr-57&signer=media-rpc&x-canva-quality=thumbnail_large',
    gallery5: 'https://media.canva.com/v2/image-resize/format:JPG/height:206/quality:92/uri:ifs%3A%2F%2FM%2F58967eda-d99e-41a3-8b3f-cf153abbf058/watermark:F/width:206?csig=AAAAAAAAAAAAAAAAAAAAAPcvfFVdJpKs0lXj-NLVCPnwlzab_pbf3b8nY8YP18CZ&exp=1759418176&osig=AAAAAAAAAAAAAAAAAAAAALSZtBS6BD8dLmsLeM1l9swJm-9C0ZODeokZFzC3Amki&signer=media-rpc&x-canva-quality=thumbnail_large',
    gallery6: 'https://media.canva.com/v2/image-resize/format:JPG/height:206/quality:92/uri:ifs%3A%2F%2FM%2F987053f2-4359-455f-8b5e-7bb9367c4185/watermark:F/width:206?csig=AAAAAAAAAAAAAAAAAAAAAB3uVzKDJfUGxr7whitrjrc-NrXastBUDbZfSj8hDhwY&exp=1759419423&osig=AAAAAAAAAAAAAAAAAAAAAMYNMvkfsdmhLUGOwWMLZVVQMO0ggFvW3PliuvEvndoK&signer=media-rpc&x-canva-quality=thumbnail_large',
};

const slideshowImages = [images.header1, images.header2, images.header3, images.header4];

const InfoCard = ({ icon, title, text }) => (
    <Grid item xs={12} sm={6} md={3}>
        <Paper elevation={3} className={styles.infoCard}>
            <Box className={styles.infoCardIcon}>{icon}</Box>
            <Typography variant="h5" component="h3" gutterBottom>{title}</Typography>
            <Typography>{text}</Typography>
        </Paper>
    </Grid>
);

const ActionCard = ({ to, imageUrl, icon, title }) => (
    <Grid item xs={12} sm={6}>
        <Link to={to} className={styles.actionCardLink}>
            <Paper
                elevation={4}
                className={styles.actionCard}
                style={{ backgroundImage: `url(${imageUrl})` }}
            >
                <div className={styles.actionCardOverlay} />
                <Box className={styles.actionCardContent}>
                    <Box className={styles.actionCardIcon}>{icon}</Box>
                    <Typography variant="h6" component="h3">
                        {title}
                    </Typography>
                </Box>
            </Paper>
        </Link>
    </Grid>
);

const Home = () => {
    const [currentImage, setCurrentImage] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentImage(prev => (prev + 1) % slideshowImages.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <Box className={styles.homePage}>
            {/* Header with Slideshow */}
            <header className={styles.header}>
                {slideshowImages.map((img, index) => (
                    <div
                        key={index}
                        className={`${styles.slide} ${index === currentImage ? styles.active : ''}`}
                        style={{ backgroundImage: `url(${img})` }}
                    />
                ))}
                <div className={styles.headerOverlay} />
                <Container maxWidth="md" className={styles.headerContent}>
                    <Box className={styles.logoContainer}>
                        <Avatar src={images.logoSide1} alt="Logo Đồng Hành 1" className={styles.logoSide} />
                        <Avatar src={images.logoMain} alt="Logo SVCG Phú Cường" className={styles.logoMain} />
                        <Avatar src={images.logoSide2} alt="Logo Đồng Hành 2" className={styles.logoSide} />
                    </Box>
                    <Typography variant="h2" component="h1" className={styles.headerTitle}>
                        Sinh Viên Công Giáo Phú Cường
                    </Typography>
                    <Typography variant="h5" className={styles.tagline}>
                        Đức Tin - Tri Thức - Phục Vụ
                    </Typography>
                </Container>
            </header>

            {/* Main Content */}
            <Container component="main" maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                {/* About Section */}
                <Paper 
                    elevation={3} 
                    sx={{
                        p: 4, 
                        my: 4, 
                        textAlign: 'center', 
                        borderRadius: '16px',
                        background: 'rgba(255, 255, 255, 0.2)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255, 255, 255, 0.3)',
                        borderTop: '3px solid #f44336', 
                        boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.15)',
                        color: 'inherit'
                    }}
                >
                    <Typography variant="h4" component="h2" gutterBottom>
                        Chào mừng bạn đến với SVCG Phú Cường
                    </Typography>
                    <Typography variant="body1" sx={{ opacity: 0.8 }}>
                        Nhóm quy tụ các bạn trẻ kỷ luật – năng động – giàu nhiệt huyết.
                        Chúng mình cùng nhau lớn lên trong Đức Tin, vững vàng trong Tri Thức và lan tỏa tinh thần Phục Vụ.
                    </Typography>
                </Paper>

                {/* Announcement Section */}
                <Box component="section" my={5} textAlign="center">
                    <Typography variant="h4" component="h2" gutterBottom className={styles.sectionTitle}>
                        <FaBullhorn /> Thông Báo <FaBullhorn />
                    </Typography>
                    <Grid container spacing={4} justifyContent="center" sx={{ mt: 2 }}>
                        <ActionCard 
                            to="/register-student"
                            imageUrl="https://cdn.pixabay.com/photo/2023/08/02/18/21/monstera-8165765_960_720.jpg"
                            icon={<FaUserPlus size="2.5em" />}
                            title="Ghi Danh Tân Sinh Viên"
                        />
                        <ActionCard 
                            to="/update-info"
                            imageUrl="https://cdn.pixabay.com/photo/2022/06/09/10/13/flower-7252179_1280.png"
                            icon={<FaUserEdit size="2.5em" />}
                            title="Cập Nhật Thông Tin Thành Viên"
                        />
                    </Grid>
                </Box>

                {/* Info Cards Section */}
                <Box component="section" my={5}>
                    <Grid container spacing={4} justifyContent="center">
                        <InfoCard icon={<FaPrayingHands size="2em" />} title="Đức Tin" text="Đặt Chúa làm trọng tâm trong mọi hoạt động." />
                        <InfoCard icon={<FaSchool size="2em" />} title="Tri Thức" text="Không ngừng học hỏi, phát triển bản thân." />
                        <InfoCard icon={<FaHandshake size="2em" />} title="Phục Vụ" text="Sống sẻ chia, lan tỏa yêu thương." />
                        <InfoCard icon={<FaCross size="2em" />} title="Phanxicô Xaviê" text="Bổn mạng nhóm." />
                    </Grid>
                </Box>
                 <Box component="section" my={5}>
                    <Grid container spacing={4} justifyContent="center">
                        <InfoCard icon={<FaChurch size="2em" />} title="Thời gian hoạt động" text="Sau Thánh Lễ Chúa Nhật 19h00 hằng tuần" />
                        <InfoCard icon={<FaChurch size="2em" />} title="Địa điểm" text="Giáo xứ Chánh Tòa Phú Cường" />
                        <InfoCard icon={<FaChurch size="2em" />} title="Đồng hành" text="Dưới sự che chở của quý Cha từ Giáo xứ Chánh Tòa" />
                         <InfoCard icon={<FaChurch size="2em" />} title="Dòng Hiến Sĩ OMI" text="Cùng sự đồng hành của quý tu sĩ dòng OMI" />
                    </Grid>
                </Box>

                {/* Gallery Section */}
                <Box component="section" my={5}>
                    <Typography variant="h4" component="h2" textAlign="center" gutterBottom mb={4} sx={{ textShadow: '1px 1px 3px rgba(0,0,0,0.4)' }}>
                        Khoảnh Khắc SVCG Phú Cường
                    </Typography>
                    <Grid container spacing={2}>
                        {Object.values(images).slice(7).map((img, index) => (
                            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                                <Paper elevation={3} className={styles.galleryItem}>
                                    <img src={img} alt={`Gallery item ${index + 1}`} loading="lazy" />
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Container>

            {/* Footer */}
            <Box component="footer" className={styles.footer}>
                <Typography variant="body1">&copy; Bản quyền thuộc SVCG Phú Cường</Typography>
                <Box>
                    <IconButton href="https://www.facebook.com/nhomsvcgphucuong/" target="_blank" color="inherit">
                        <FaFacebook />
                    </IconButton>
                    <IconButton href="#" target="_blank" color="inherit">
                        <FaYoutube />
                    </IconButton>
                </Box>
            </Box>
        </Box>
    );
};

export default Home;
