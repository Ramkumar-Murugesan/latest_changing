import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
//import {Router , Route, browserHistory} from 'react-router';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { render } from 'react-dom';
import parent from './component/parentComponent'
import child from './component/childComponent'


// ReactDOM.render(<App />, document.getElementById('root'));
// render(

//     <Router>
//         <Route path="/" component = {parent} />
//         <Route path = "/child" component = {child} />
//     </Router>,
// // document.getElementById("root");

// );
// registerServiceWorker();

// ReactDOM.render (
//     <Router histroy={browserHistory}>
//     <Route>
//         <Route path="/" component={App}/>
//         <Route path="/child" component={child}/>
//         <Route path="/parent" component={parent}/>
//     </Route>
// </Router>,
// document.getElementById('root')
// )

ReactDOM.render(
    <Router>
        <div>
          <Route exact path="/" component={App} />
          <Route path="/child" component={child} />
        </div>
    </Router>,
    document.getElementById('root')
  )