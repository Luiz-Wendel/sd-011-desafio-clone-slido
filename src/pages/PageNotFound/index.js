import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRobot } from '@fortawesome/free-solid-svg-icons';
import style from './style.module.css';

export default class index extends React.Component {
  render() {
    return (
      <>
        <FontAwesomeIcon icon={ faRobot } size="8x" className={ style.svg } />
        <h1>404 - Page not found!</h1>
      </>
    );
  }
}
