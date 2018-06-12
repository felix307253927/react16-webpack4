/**
 * @author Created by felix on 18-6-7.
 * @email   307253927@qq.com
 */
'use strict';

import React, {PureComponent} from 'react'
import {Link} from 'react-router-dom';
import {DatePicker} from 'antd';


export default class A extends PureComponent {
  render() {
    return (
      <div>
        page A
        <br/>
        <DatePicker/>
        <br/>
        <Link to="/index">return</Link>
      </div>
    )
  }
}