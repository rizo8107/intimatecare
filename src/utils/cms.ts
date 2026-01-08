import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';

/**
 * Hook to use dynamic content from Supabase CMS
 * @param page The page identifier (e.g., 'newyear-bundle')
 * @param key The specific content key (e.g., 'hero_title')
 * @param defaultValue The fallback value if CMS is unavailable
 */
export const useContent = (page: string, key: string, defaultValue: string) => {
    const [content, setContent] = useState(defaultValue);

    useEffect(() => {
        const fetchContent = async () => {
            try {
                const { data, error } = await supabase
                    .from('site_cms')
                    .select('value')
                    .eq('page', page)
                    .eq('key', key)
                    .single();

                if (data && data.value) {
                    setContent(data.value);
                }
            } catch (err) {
                // Fallback to default on error
                console.warn(`CMS Fetch Error for ${page}.${key}:`, err);
            }
        };

        fetchContent();
    }, [page, key]);

    return content;
};

/**
 * Admin utility to update CMS content
 */
export const updateCMSContent = async (page: string, key: string, value: string) => {
    const { data, error } = await supabase
        .from('site_cms')
        .upsert({ page, key, value, last_updated: new Date().toISOString() }, { onConflict: 'page,key' });

    if (error) throw error;
    return data;
};
