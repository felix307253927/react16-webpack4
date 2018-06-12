/**
 * @author Created by felix on 18-6-7.
 * @email   307253927@qq.com
 */
'use strict';

/**
 * @author Created by felix on 17-7-31.
 * @email   307253927@qq.com
 */

'use strict';
import React, {PureComponent, Fragment} from 'react';
import {Route, Switch, HashRouter, Redirect} from 'react-router-dom'
import Loadable from 'react-loadable';
import Loading from './Loading';
import App from './App';
import Form from './Form';
import {CSSTransition, TransitionGroup} from 'react-transition-group'

export default class Routes extends PureComponent {
  
  /**
   * {location.key = location.pathname.split('/')[1] || "/"}
   * location.key  is not define in hashHistory
   * @return {*}
   */
  render() {
    return (
      <Fragment>
        <HashRouter>
          <Route render={({location}) => {
            location.key = location.pathname.split('/')[1] || "/"
            return (
              <Fragment>
                <TransitionGroup className="app-body">
                  <CSSTransition key={location.key} classNames="fade-in" timeout={300}>
                    <Switch location={location}>
                      <Route path="/index" component={App}/>
                      <Route path="/form" component={Form}/>
                      <Route path="/a" component={Loadable({
                        loader() {
                          return import('./A')
                        },
                        loading: Loading
                      })}/>
                      <Route path="/b" component={Loadable({
                        loader() {
                          return import('./B')
                        },
                        loading: Loading
                      })}/>
                      <Redirect from="*" to="/index"/>
                    </Switch>
                  </CSSTransition>
                </TransitionGroup>
              </Fragment>
            )
          }}/>
        </HashRouter>
      </Fragment>
    )
  }
}
