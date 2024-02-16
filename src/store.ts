import { configureStore } from "@reduxjs/toolkit";
import VideoPlayerReducer from "./modules/video-player/reducer";

export const store = configureStore({
  reducer: {
    VideoPlayer: VideoPlayerReducer,
  },
});

export type AppDispatch = typeof store.dispatch
