import React from 'react';
import ReactDOM from 'react-dom';
import Board from './components/Board';
import NotFound from './components/pages/NotFound'
import Initial from './components/Initial';
import {BrowserRouter as Router , Route , Switch} from 'react-router-dom'

import {Provider} from './Context'


class App extends React.Component {
  render() {
    return (
      <Provider>
        <Router>
          <main>
            <Switch>
              <Route exact path="/" component={Initial} />
              <Route exact path="/board" component={Board} />
              <Route component={NotFound} />
            </Switch>
          </main>
        </Router>
      </Provider>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('App'));