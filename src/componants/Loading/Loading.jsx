import React, {useEffect} from 'react'
import Splitting from 'splitting';
import './Loading.css';

function Loading() {
    useEffect(() => {
        Splitting();
      }, []);

  return (
    <div className="loading-overlay">
    <div className="custom-app">
      <div className="custom-root">
        <div className="ball splitting">
          <div className="ball-top"></div>
        </div>

        <div className="phrase splitting" data-splitting="items">
          <span className="word slide splitting" data-splitting="chars">
            Never
          </span>
          <span className="word slide splitting" data-splitting="chars">
            Give
          </span>
          <span className="word slide splitting" data-splitting="chars">
            Up
          </span>
          <span className="word smiley splitting" data-splitting="chars">
            Try
          </span>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Loading
