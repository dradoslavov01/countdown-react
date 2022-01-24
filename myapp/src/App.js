import './App.css';
import React from 'react';

import Countdown from './Components/Countdown/Countdown';

class App extends React.Component {

  render() {
    return (
      <div className="App">
        <Countdown moment={'2 days, 3 hours, 30 minutes'} message={'The day has ended!'} />
        <Countdown moment={'1 years, 2 months, 4 weeks, 4 days, 1 hours, 20 minutes'} message={'The year has ended!'} />
      </div>

    );
  };
}

export default App;
