import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { auth } from './config/firebase';
import { Login, Signup, Room } from './pages'; // まとめてimportできるのはなぜか？
import { Auth, LoggedInRoute } from './utils';

import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';
import { useState } from 'react';
import { Emoji } from 'emoji-mart';

function App() {
  // console.log(process.env.REACT_APP_HELOO); // .envの確認
  const [isOpen, setIsOpen] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState('');

  const emojiSelect = (emoji) => {
    console.log(emoji);
    setSelectedEmoji(emoji.native);
    setIsOpen(false);
  };

  return (
    <Router>
      <h1>Chat App</h1>
      <ul> {/* 確認用のメニュー */}
        <li><Link to='/'>ROOM</Link></li>
        <li><Link to='/login'>LOGIN</Link></li>
        <li><Link to='/signup'>SIGNUP</Link></li>
      </ul>
      <button onClick={() => auth.signOut()}>logout</button>
      <button onClick={() => setIsOpen(true)}>emoji</button>
      {selectedEmoji}
      <Emoji emoji={{ id: 'santa', skin: 3 }} size={16} />
      {isOpen && <Picker set='apple' onSelect={(emoji) => emojiSelect(emoji)} />}
      <Auth>
        <Switch>
          <LoggedInRoute exact path='/' component={Room} />
          {/* <LoggedInRoute exact path='/mypage' component={MyPage} /> */}
          <Route exact path='/login' component={Login} />
          <Route exact path='/signup' component={Signup} />
        </Switch>
      </Auth>
    </Router>
  );
}

export default App;
