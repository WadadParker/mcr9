import logo from './logo.svg';
import './App.css';
import {Routes,Route} from "react-router-dom";

import { Home } from './pages/home/Home';
import { Explore } from './pages/explore/Explore';
import { Playlists } from './pages/playlists/Playlists';
import { WatchLater } from './pages/watchLater/WatchLater';
import { VideoListing } from './pages/videoListing/VideoListing';
import { Video } from './pages/singleVideo/Video';

function App() {
  return (
    <div className="App">
     <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/explore" element={<Explore />} />
      <Route path="/playlists" element={<Playlists />} />
      <Route path="/watchlater" element={<WatchLater />} />
      <Route path="/categories/:category" element={<VideoListing />} />
      <Route path="/videos/:videoId" element={<Video />} />
     </Routes>
    </div>
  );
}

export default App;
