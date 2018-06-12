/**
 * @author Created by felix on 18-6-7.
 * @email   307253927@qq.com
 */
import React, {PureComponent} from 'react'
import {Link} from 'react-router-dom';

export default class App extends PureComponent {
  render() {
    return (
      <div>
        <h1>demo</h1>
        <Link to="/a"> DatePicker </Link>
        &emsp;
        <Link to="/b"> page b </Link>
      </div>
  )
  }
}