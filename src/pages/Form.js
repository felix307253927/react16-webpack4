/**
 * @author Created by felix on 18-6-12.
 * @email   307253927@qq.com
 */
'use strict';

import React, {Component} from 'react';
import {Form} from 'antd'
const FormItem = Form.Item

export default class MyForm extends Component{
  render(){
    return (
      <div>
        <Form>
          <FormItem>
            <h1>test form</h1>
          </FormItem>
        </Form>
      </div>
    )
  }
}