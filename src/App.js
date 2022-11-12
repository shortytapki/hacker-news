import { BrowserRouter, Route } from 'react-router-dom';
import Home from './routes/Home.jsx';
import PostView from './routes/PostView.jsx';
import './App.css';

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Route exact path="/" component={Home} />
        <Route path="/post/:id" component={PostView} />
      </BrowserRouter>
    </div>
  );
}

export default App;
