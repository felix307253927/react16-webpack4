/**
 * @author Created by felix on 18-6-7.
 * @email   307253927@qq.com
 */

import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './pages/Routes';
import './scss/style.scss';

let root = document.getElementById('root');

ReactDOM.render(<Routes/>, root)
