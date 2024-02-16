import { Provider } from "react-redux";
import VideoPlayer from "./modules/video-player";
import { store } from "./store";
import "./App.scss";

export default function App() {
  return (
    <Provider store={store}>
      <VideoPlayer />
    </Provider>
  );
}
