import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { setCurrentSelectedVideo, setVideosData, setAutoplay } from "./reducer";
import WaveLoader from "./../../common/wave-loader";
import { AppDispatch } from "../../store";
import { Video } from "./typing";

export default function Playlist() {
  const { videosData, currentPlayingVideo, isAutoplay } = useSelector(
    (store: any) => store.VideoPlayer
  );
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (videosData.length && !Object.keys(currentPlayingVideo).length) {
      dispatch(setCurrentSelectedVideo(videosData[0]));
    }
  }, [videosData]);

  const handleOnDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items: Video[] = [...videosData];
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    dispatch(setVideosData(items));
  };

  const handleVideoClick = (detail: Video) => {
    dispatch(setCurrentSelectedVideo(detail));
  };

  const handleAutoplayClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setAutoplay(e.target.checked));
  };

  return (
    <>
      <div className="autoplay-switch">
        <label>
          <input
            type="checkbox"
            onChange={handleAutoplayClick}
            checked={isAutoplay}
          />
          Auto Play
        </label>
      </div>
      <div className="playlist-container custom-scrollbar">
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="videos">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {videosData.map((item: Video, index: number) => {
                  return (
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="playlist-card"
                          onClick={() => handleVideoClick(item)}
                        >
                          <div className="card-img-container">
                            <img src={item.thumb} alt="thumb..." />
                          </div>
                          <div className="card-detail">
                            <p className="title text-overflow-wrap">
                              {item.title}
                            </p>
                            <p className="channel-name text-muted text-overflow-wrap">
                              {item.subtitle}
                            </p>
                            <p className="description text-overflow-wrap">
                              {item.description}
                            </p>
                          </div>
                          {currentPlayingVideo?.id === item.id && (
                            <div className="selected">
                              <WaveLoader />
                            </div>
                          )}
                        </div>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </>
  );
}
