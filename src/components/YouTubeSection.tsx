import { useState, useEffect, useRef } from 'react';
import OptimizedImage from './ui/optimized-image';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink } from 'lucide-react';
import { trackButtonClick } from './ClarityEvents';

interface YouTubeVideo {
  id: string;
  title: string;
  link: string;
  thumbnail: string;
  publishedAt: string;
}

const YouTubeSection = () => {
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Channel ID for Sexed with Khushboo
  const channelID = "UClzuIsSjP2aAYw6rCqE_8CQ"; // Updated channel ID

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);
        const reqURL = "https://www.youtube.com/feeds/videos.xml?channel_id=";
        const response = await fetch(
          `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(reqURL + channelID)}`
        );
        
        if (!response.ok) {
          throw new Error(`Failed to fetch videos: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.status !== 'ok') {
          throw new Error(`API returned error: ${data.message || 'Unknown error'}`);
        }
        
        // Process the videos from the RSS feed
        const fetchedVideos: YouTubeVideo[] = data.items.slice(0, 3).map((item: any) => {
          // Extract video ID from link
          const link = item.link;
          const id = link.substr(link.indexOf("=") + 1);
          
          return {
            id,
            title: item.title,
            link: item.link,
            thumbnail: item.thumbnail || `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`,
            publishedAt: item.pubDate
          };
        });
        
        setVideos(fetchedVideos);
        setError(null);
      } catch (error) {
        console.error('Error fetching YouTube videos:', error);
        setError('Failed to load videos. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [channelID]);

  const handleVideoClick = (videoId: string) => {
    trackButtonClick('youtube_video_click', videoId);
    window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
  };

  const handleChannelClick = () => {
    trackButtonClick('youtube_channel_click', 'channel_page');
    window.open('https://www.youtube.com/@SexedwithKhushboo', '_blank');
  };

  return (
    <section className="py-12 md:py-20 bg-slate-50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Watch My Latest Videos
            </h2>
            <p className="mx-auto max-w-[700px] text-slate-500 md:text-xl">
              Explore my YouTube channel for educational content on intimacy, relationships, and sexual wellness.
            </p>
          </div>
        </div>
        
        {/* Featured latest video */}
        <div className="mb-12">
          <h3 className="text-2xl font-semibold mb-6 text-center">Latest Video</h3>
          <div className="max-w-3xl mx-auto aspect-video">
            {loading ? (
              <div className="flex justify-center items-center h-full bg-slate-100 rounded-lg">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
            ) : error ? (
              <div className="flex justify-center items-center h-full bg-slate-100 rounded-lg">
                <p className="text-red-500">{error}</p>
              </div>
            ) : videos.length > 0 ? (
              <iframe 
                ref={iframeRef}
                src={`https://www.youtube.com/embed/${videos[0].id}?controls=1&rel=0`}
                title={videos[0].title}
                className="w-full h-full rounded-lg shadow-lg"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            ) : (
              <div className="flex justify-center items-center h-full bg-slate-100 rounded-lg">
                <p>No videos found</p>
              </div>
            )}
          </div>
        </div>
        
        {/* More recent videos */}
        {!loading && !error && videos.length > 1 && (
          <div className="mt-10">
            <h3 className="text-2xl font-semibold mb-6 text-center">More Recent Videos</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.slice(1).map((video) => (
                <Card key={video.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <div className="relative aspect-video cursor-pointer" onClick={() => handleVideoClick(video.id)}>
                    <OptimizedImage 
                      src={video.thumbnail} 
                      alt={video.title} 
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      width={320}
                      height={180}
                      blurEffect={true}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-primary/80 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                          <polygon points="5 3 19 12 5 21 5 3" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-medium text-lg line-clamp-2 mb-2">{video.title}</h3>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
        
        <div className="flex justify-center mt-10">
          <Button onClick={handleChannelClick} className="flex items-center gap-2">
            Visit My YouTube Channel
            <ExternalLink size={16} />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default YouTubeSection;
