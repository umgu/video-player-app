const getVideosData = async () => {
  return await fetch("./mocked-data/videos-data.json");
};

export const VideoPlayerServices = {
  getVideosData,
};
