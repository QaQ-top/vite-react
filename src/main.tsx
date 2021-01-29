import React from 'react'
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import routes from '@route/index';
import '@themes/index.less';
console.log(import.meta.env);
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Switch>
        {
          routes.map((i, n) => {
            return <Route key={n} {...i}/>
          })
        }
      </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)

