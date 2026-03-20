import * as React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import ReviewPage from './pages/ReviewPage';
import TrailerPage from './pages/TrailerPage';
import NotFoundPage from './pages/NotFoundPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage'; // ADD THIS IMPORT

const App: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<HomePage />} />
                <Route path="trailer/:ytTrailerId" element={<TrailerPage />} />
                <Route path="reviews/:movieId" element={<ReviewPage />} />
                <Route path="login" element={<LoginPage />} />
                <Route path="register" element={<RegisterPage />} /> {/* ADD THIS ROUTE */}
                <Route path="*" element={<NotFoundPage />} />
            </Route>
        </Routes>
    );
};

export default App;