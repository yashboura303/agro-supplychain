import './App.css';
import React from 'react';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Main from './Main';

function App() {
    return (
        <Router>
            <Switch>
                <Route path="/:batchNo" exact>
                    <Main />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
