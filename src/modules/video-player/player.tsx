import { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactPlayer from "react-player";
import { setCurrentSelectedVideo, setVideosData } from "./reducer";
import { AppDispatch } from "../../store";
import { Video } from "./typing";

export default function Player() {
  const [currentVideo, setCurrentVideo] = useState<Video | null>(null);
  const { currentPlayingVideo, videosData, isAutoplay } = useSelector(
    (store: any) => store.VideoPlayer
  );
  const [autoPlay, setAutoplay] = useState<boolean>(isAutoplay);
  const dispatch: AppDispatch = useDispatch();
  const playerRef = useRef<ReactPlayer>(null);

  useEffect(() => {
    if (Object.keys(currentPlayingVideo).length && !currentVideo) {
      setCurrentVideo(currentPlayingVideo);
    } else {
      const currentTime = playerRef?.current?.getCurrentTime();
      const totalDuration = playerRef?.current?.getDuration();

      // add seek time in current playing video detail before changing to selected one
      const seekTime = currentTime === totalDuration ? 0 : currentTime;
      const addedSeekTimeVideoDetail = { ...currentVideo, seekTime };
      dispatch(
        setVideosData(
          videosData.map((data: Video) =>
            data.id === currentVideo?.id ? addedSeekTimeVideoDetail : data
          )
        )
      );
      setCurrentVideo(currentPlayingVideo);
      setAutoplay(isAutoplay);
    }
  }, [currentPlayingVideo]);

  const handleVideoEnded = () => {
    const currentPlayingVideoIndex = videosData.findIndex(
      (data: Video) => data.id === currentPlayingVideo.id
    );
    const nextVideoDetail =
      videosData[(currentPlayingVideoIndex + 1) % videosData.length];

    dispatch(setCurrentSelectedVideo(nextVideoDetail));
  };

  return (
    <ReactPlayer
      url={currentVideo?.sources}
      controls
      className="react-palyer"
      onEnded={handleVideoEnded}
      ref={playerRef}
      playing={autoPlay}
      onStart={() => {
        playerRef?.current?.seekTo(currentVideo?.seekTime || 0);
      }}
    // light={
    //   <img
    //     src={currentPlayingVideo?.thumb}
    //     alt="Thumbnail"
    //     style={{ width: "100%", height: "100%" }}
    //   />
    // }
    />
  );
}
