import logo from './logo.svg';
import './App.css';
import {Routes,Route} from "react-router-dom";

import { Home } from './pages/home/Home';
import { Explore } from './pages/explore/Explore';
import { Playlists } from './pages/playlists/Playlists';
import { WatchLater } from './pages/watchLater/WatchLater';

function App() {
  return (
    <div className="App">
     <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/explore" element={<Explore />} />
      <Route path="/playlists" element={<Playlists />} />
      <Route path="/watchlater" element={<WatchLater />} />
     </Routes>
    </div>
  );
}

export default App;
