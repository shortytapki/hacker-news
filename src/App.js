import { BrowserRouter, Route, Switch, useParams } from 'react-router-dom';
import Home from './routes/Home.jsx';
import PostView from './routes/PostView.jsx';
import Post from './components/Post/Post.jsx';
import { Provider } from 'react-redux';
import { store } from './store/store.js';

import './App.css';
import Header from './components/Header/Header.jsx';

function App() {
  return (
    <Provider store={store}>
      <Header>
        <></>
      </Header>
      <div className="app">
        <BrowserRouter>
          <Route exact path="/" component={Home} />
          <Route path="/post/:id" component={View} />
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;

const View = () => {
  const ch = {
    by: 'dhouston',
    descendants: 71,
    id: 8863,
    kids: [
      8952, 9224, 8917, 8884, 8887, 8943, 8869, 8958, 9005, 9671, 8940, 9067,
      8908, 9055, 8865, 8881, 8872, 8873, 8955, 10403, 8903, 8928, 9125, 8998,
      8901, 8902, 8907, 8894, 8878, 8870, 8980, 8934, 8876,
    ],
    score: 111,
    time: 1175714200,
    title: 'My YC app: Dropbox - Throw away your USB drive',
    type: 'story',
    url: 'http://www.getdropbox.com/u/2/screencast.html',
  };
  return (
    <div className="view">
      <div className="wrap">
        <Post>{ch}</Post>
      </div>
    </div>
  );
};
