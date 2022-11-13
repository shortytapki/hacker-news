import { BrowserRouter, Route } from 'react-router-dom';
import Home from './routes/Home.jsx';
import PostView from './routes/PostView.jsx';
import { Provider } from 'react-redux';
import { store } from './store/store.js';
import './App.css';

function App() {
  // const {} = useAppSelector((state) => state.postsReducer);
  return (
    <Provider store={store}>
      <div className="app">
        <BrowserRouter>
          <Route exact path="/" component={Home} />
          <Route path="/post/:id" component={PostView} />
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
