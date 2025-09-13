import React from 'react';
import { useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';
import { Box } from '@mui/material';

const TrailerPage: React.FC = () => {
    const { ytTrailerId } = useParams<{ ytTrailerId: string }>();

    return (
        <Box sx={{ position: 'relative', paddingTop: '56.25%' /* 16:9 Aspect Ratio */ }}>
            <ReactPlayer
                url={`https://www.youtube.com/watch?v=${ytTrailerId}`}
                playing={true}
                controls={true}
                width="100%"
                height="100%"
                style={{ position: 'absolute', top: 0, left: 0 }}
            />
        </Box>
    );
};

export default TrailerPage;