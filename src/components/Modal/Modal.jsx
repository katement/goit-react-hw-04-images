import React from 'react';

import PropTypes from 'prop-types';

import { StyledOverlay, StyledModal } from './Modal.styled';

import { useEffect } from 'react';

const Modal = ({ visibleData, onCloseModal }) => {
  useEffect(() => {
    const handleKeyDown = event => {
      if (event.code === 'Escape') {
        onCloseModal();
      }
    };
    console.log('Модалка успішно змонтована');
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onCloseModal]);
  const handleOverlayClick = event => {
    if (event.target === event.currentTarget) {
      onCloseModal();
    }
  };

  return (
    <StyledOverlay onClick={handleOverlayClick}>
      <StyledModal>
        <button onClick={onCloseModal}>&times;</button>

        <ul>
          {Array.isArray.visibleData &&
            visibleData.map(comment => (
              <li key={comment.id}>{comment.body}</li>
            ))}
          <img
            src={visibleData.largeImageURL}
            alt={visibleData.tags}
            style={{
              display: 'block',
              maxWidth: 'calc(100vw - 48px)',
              height: 'auto',
            }}
          />
        </ul>
      </StyledModal>
    </StyledOverlay>
  );
};

Modal.propTypes = {
  image: PropTypes.shape({
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }),
  onCloseModal: PropTypes.func.isRequired,
};

export default Modal;
