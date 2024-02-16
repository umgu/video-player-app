import { VideoPlayerServices } from "./services";
import { AppDispatch } from "../../../store";
import { setVideosData } from ".";

const getVideosData = () => async (dispatch: AppDispatch) => {
  try {
    const res = await VideoPlayerServices.getVideosData();
    const data = await res.json();
    console.log({ data });

    dispatch(setVideosData(data));
  } catch (error: any) {
    dispatch(setVideosData([]));
  }
};

export const VideoPlayerActions = {
  getVideosData,
};
