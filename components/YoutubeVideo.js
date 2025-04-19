import { useEffect, useState } from "react";
import { fetchYoutubeVideos } from "@/lib/youtube";

const YoutubeVideos = ({ query }) => {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        async function getVideos() {
            const videoResults = await fetchYoutubeVideos(query);
            setVideos(videoResults);
        }
        getVideos();
    }, [query]);

    return (
        <div>
            <h2>YouTube Videos for: {query}</h2>
            <div className="grid grid-cols-3 gap-4">
                {videos.map((video) => (
                    <div key={video.id.videoId} className="p-4 border rounded">
                        <h3>{video.snippet.title}</h3>
                        <img src={video.snippet.thumbnails.medium.url} alt={video.snippet.title} />
                        <p>{video.snippet.channelTitle}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default YoutubeVideos;
