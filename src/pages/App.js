/**
 * @author Created by felix on 18-6-7.
 * @email   307253927@qq.com
 */
import React, {PureComponent} from 'react'
import {Link} from 'react-router-dom';
import {Button, Input} from 'antd';

export default class App extends PureComponent {
  
  state={
    input:''
  }
  
  render() {
    return (
      <div>
        <h1>demo</h1>
        <Link to="/a"> DatePicker </Link>
        &emsp;
        <Link to="/b"> page b </Link>
        &emsp;
        <Link to="/form"> FormItem </Link>
        <br/><br/>
        <Button>antd Button</Button>
        <br/><br/>
        <Input onInput={(e)=>this.setState({input:e.target.value})} placeholder="antd input"/>
        <br/><br/>
        <h3> {this.state.input}</h3>
      </div>
  )
  }
}