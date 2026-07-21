
import './App.css';
import { Route, Routes } from 'react-router-dom';

import Home from './Components/Home/Home';
import InfiniteScroll from './Components/InfiniteScroll.js/InfiniteScroll';
import AutoCompleteSearchResults from './Components/AutoCompleteSearchResults';
import Timer from './Components/Timer';
import JiraBoard from './Components/JiraBoard';

function App() {
  return (
    <div className='app'>
    <Routes >
      <Route path="/" Component={Home} />
      <Route path="/infinite-scroll" Component={InfiniteScroll} />
      <Route path="/auto-complete-search-results" Component={AutoCompleteSearchResults} />
      <Route path="/timer" Component={Timer} />
      <Route path="/jira-board" Component={JiraBoard} />
      
    </Routes>
    </div>
  );
}

export default App;
