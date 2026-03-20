import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../header/Header';
import { Container } from '@mui/material';

const Layout: React.FC = () => {
    return (
        <>
            <Header />
            <Container component="main" sx={{ mt: 4, mb: 4 }}>
                <Outlet />
            </Container>
        </>
    );
};

export default Layout;