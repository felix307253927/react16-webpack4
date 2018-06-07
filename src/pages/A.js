/**
 * @author Created by felix on 18-6-7.
 * @email   307253927@qq.com
 */
'use strict';

import React, {PureComponent} from 'react'
import {Link} from 'react-router-dom';


export default class A extends PureComponent {
  render() {
    return (
      <div> page A <Link to="/index">return</Link></div>
    )
  }
}