import { useSelector } from "react-redux";

export default function VideoDetail() {
  const {
    currentPlayingVideo: { title, subtitle, description },
  } = useSelector((store: any) => store.VideoPlayer);

  return (
    <div className="video-detail-container custom-scrollbar">
      <div className="general-detail">
        <p className="title">{title}</p>
        <p className="channel text-muted">{subtitle}</p>
        <p className="description">{description}</p>
      </div>
      <div className="comment-container"></div>
    </div>
  );
}
