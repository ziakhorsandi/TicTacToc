import React from 'react';
import ReactDOM from 'react-dom';
import Board from './components/Board'

import {Provider} from './Context'

class App extends React.Component {
  render() {
    return (
      <Provider>
        <main
          style={{
            dispslay:"flex"
          }}
        >
          <Board/>
        </main>
      </Provider>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('App'));