/**
 * Utility for capturing and persisting UTM parameters
 */

export interface UtmParams {
    utm_source?: string;
    utm_medium?: string;
    utm_campaign?: string;
    utm_term?: string;
    utm_content?: string;
}

const UTM_STORAGE_KEY = 'ic_utm_params';

/**
 * Captures UTM parameters from the current URL and saves them to sessionStorage
 */
export const captureUtmParams = (): UtmParams => {
    const urlParams = new URLSearchParams(window.location.search);
    const utms: UtmParams = {};

    const utmKeys: (keyof UtmParams)[] = [
        'utm_source',
        'utm_medium',
        'utm_campaign',
        'utm_term',
        'utm_content'
    ];

    let found = false;
    utmKeys.forEach(key => {
        const value = urlParams.get(key);
        if (value) {
            utms[key] = value;
            found = true;
        }
    });

    // Only save if we found at least one UTM parameter
    if (found) {
        sessionStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(utms));
        console.log('📊 UTM Tracking: Captured and saved UTMs:', utms);
    }

    return getStoredUtmParams();
};

/**
 * Retrieves stored UTM parameters
 */
export const getStoredUtmParams = (): UtmParams => {
    const stored = sessionStorage.getItem(UTM_STORAGE_KEY);
    if (stored) {
        try {
            return JSON.parse(stored);
        } catch (e) {
            console.error('📊 UTM Tracking: Failed to parse stored UTMs', e);
        }
    }
    return {};
};

/**
 * Appends stored UTM parameters to a URL
 */
export const appendUtmsToUrl = (url: string): string => {
    const utms = getStoredUtmParams();
    if (Object.keys(utms).length === 0) return url;

    try {
        const urlObj = new URL(url);
        Object.entries(utms).forEach(([key, value]) => {
            if (value) urlObj.searchParams.set(key, value);
        });
        return urlObj.toString();
    } catch (e) {
        // If not a valid absolute URL, try as relative
        if (url.includes('?')) {
            let utmString = '';
            Object.entries(utms).forEach(([key, value]) => {
                if (value) utmString += `&${key}=${encodeURIComponent(value)}`;
            });
            return url + utmString;
        } else {
            let utmString = '';
            Object.entries(utms).forEach(([key, value], index) => {
                if (value) {
                    utmString += (index === 0 ? '?' : '&') + `${key}=${encodeURIComponent(value)}`;
                }
            });
            return url + utmString;
        }
    }
};
