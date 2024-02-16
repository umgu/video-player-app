import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { VideoPlayerActions } from "./reducer/actions";
import { AppDispatch } from "../../store";
import Loader from "../../common/loader";
import VideoDetail from "./video-detail";
import Playlist from "./playlist";
import Player from "./player";
import "./index.scss";

export default function VideoPlayer() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const disptach: AppDispatch = useDispatch();

  useEffect(() => {
    disptach(VideoPlayerActions.getVideosData()).then(() => {
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section id="video-player-main-section">
      <section id="video-player-section">
        <Player />
      </section>
      <section id="video-detail-section">
        <VideoDetail />
      </section>
      <section id="playlist-section">
        <Playlist />
      </section>
    </section>
  );
}
