import React from 'react';
import PropTypes from 'prop-types';

function LargePlainTextView({ cssClass, text }) {
  return <span className={`largePlainTextView ${cssClass}`}>{text}</span>;
}

LargePlainTextView.propTypes = {
  cssClass: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default LargePlainTextView;
