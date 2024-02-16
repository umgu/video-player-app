import { Provider } from "react-redux";
import VideoPlayer from "./modules/video-player";
import { store } from "./store";
import "./App.scss";
import ErrorBoundary from "./common/error-boundary";

export default function App() {
  return (
    <Provider store={store}>
      <ErrorBoundary>
        <VideoPlayer />
      </ErrorBoundary>
    </Provider>
  );
}
