import React from 'react';
import {
    Box,
    Container,
    Grid,
    Typography,
    Paper
} from '@mui/material';
import styles from './News.module.css';

const newsItems = [
    {
        title: 'Chương Trình Sinh Hoạt Tháng 10',
        imageUrl: 'https://images.pexels.com/photos/415571/pexels-photo-415571.jpeg',
    },
    {
        title: 'Lịch Phụng Vụ',
        imageUrl: 'https://cdn.pixabay.com/photo/2023/06/18/12/17/meadow-8071932_1280.jpg',
    },
    {
        title: 'Trang Đang Được Nâng Cấp Và Bảo Trì',
        imageUrl: 'https://cdn.pixabay.com/animation/2022/07/28/11/20/11-20-04-359_512.gif',
    },
];

const News = () => {
    return (
        <Box className={styles.newsPage}>
            <Container maxWidth="lg">
                <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold', textAlign: 'center', color: 'inherit' }}>
                    Tin Tức & Sự Kiện
                </Typography>
                <Typography variant="subtitle1" sx={{ textAlign: 'center', color: 'inherit', opacity: 0.7, fontStyle: 'italic' }}>
                    Trang đang trong quá trình Nâng Cấp và Thêm Dữ Liệu
                </Typography>
                <Grid container spacing={4} className={styles.newsGrid}>
                    {newsItems.map((item, index) => (
                        <Grid item xs={12} md={6} lg={4} key={index}>
                            <Paper
                                component="a" // Make the card a link
                                href="#" // Placeholder link
                                elevation={4}
                                className={styles.newsCard}
                                style={{ backgroundImage: `url(${item.imageUrl})` }}
                            >
                                <div className={styles.cardOverlay} />
                                <Box className={styles.cardContent}>
                                    <Typography variant="h5" component="h2" className={styles.cardTitle}>
                                        {item.title}
                                    </Typography>
                                    <Typography variant="subtitle1" className={styles.seeMore}>
                                        Xem thêm
                                    </Typography>
                                </Box>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
};

export default News;
