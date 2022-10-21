import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import css from './modal.module.css';
const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.hendleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.hendleKeyDown);
  }
  hendleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };
  onCloseOverlay(e) {
    if (e.target === e.currentTarget) {
      this.props.onClose();
    }
  }
  render() {
    return createPortal(
      <div className={css.Overlay} onClick={e => this.onCloseOverlay(e)}>
        <div className={css.Modal}>{this.props.children}</div>
      </div>,
      modalRoot
    );
  }
}
