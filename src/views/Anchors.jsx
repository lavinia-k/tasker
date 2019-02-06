/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';

export function Anchor({ url, content }) {
  return <a href={url}>{content}</a>;
}

Anchor.propTypes = {
  url: PropTypes.string.isRequired,
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
};

export function AnchorWithMouseEvents({
  url,
  content,
  onClick,
  handleMouseEnter,
  handleMouseLeave,
  handleMouseOver,
  handleMouseOut,
  handleFocus,
  handleBlur,
}) {
  return (
    <a
      href={url}
      onClick={onClick}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      {content}
    </a>
  );
}

AnchorWithMouseEvents.propTypes = {
  url: PropTypes.string.isRequired,
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
  // Only event handlers that we want to attach need to be passed in as props, the rest are optional
  onClick: PropTypes.func,
  handleMouseEnter: PropTypes.func,
  handleMouseLeave: PropTypes.func,
  handleMouseOver: PropTypes.func,
  handleMouseOut: PropTypes.func,
  handleFocus: PropTypes.func,
  handleBlur: PropTypes.func,
};
