import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { captureUtmParams } from '@/utils/utm';

/**
 * Component to capture UTM parameters from the URL on every route change
 */
const UtmTracker = () => {
    const location = useLocation();

    useEffect(() => {
        captureUtmParams();
    }, [location]);

    return null;
};

export default UtmTracker;
