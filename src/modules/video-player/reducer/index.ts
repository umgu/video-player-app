import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Video } from "../typing";

interface VideoPlayerState {
  videosData: Video[],
  currentPlayingVideo: Video | {},
  isAutoplay: boolean
}

const initialState: VideoPlayerState = {
  videosData: [],
  currentPlayingVideo: {},
  isAutoplay: false,
};

export const videoPlayerSlice = createSlice({
  name: "VideoPlayer",
  initialState,
  reducers: {
    setVideosData: (state: VideoPlayerState, action: PayloadAction<Video[]>) => {
      state.videosData = action.payload;
    },
    setCurrentSelectedVideo: (state: VideoPlayerState, action: PayloadAction<Video>) => {
      state.currentPlayingVideo = action.payload;
    },
    setAutoplay: (state: VideoPlayerState, action: PayloadAction<boolean>) => {
      state.isAutoplay = action.payload;
    },
  },
});

export const { setVideosData, setCurrentSelectedVideo, setAutoplay } =
  videoPlayerSlice.actions;

export default videoPlayerSlice.reducer;
