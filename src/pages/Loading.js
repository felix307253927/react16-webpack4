/**
 * @author Created by felix on 18-6-7.
 * @email   307253927@qq.com
 */
'use strict';
import React from 'react'

function reload() {
  location.reload()
}

export default function Loading(props) {
  if (props.isLoading) {
    if (props.timedOut) {
      return <div className="loader">页面加载失败, <a href="javascript:;" onClick={reload}>尝试刷新页面</a></div>;
    } else if (props.pastDelay) {
      return <div className="loader">Loading...</div>;
    } else {
      return null;
    }
  } else if (props.error) {
    return <div className="loader">页面加载失败, <a href="javascript:;" onClick={reload}>尝试刷新页面</a></div>;
  } else {
    return null;
  }
}