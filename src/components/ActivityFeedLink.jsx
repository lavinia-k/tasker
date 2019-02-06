import React from 'react';
import PropTypes from 'prop-types';
import { AnchorWithMouseEvents } from '../views/Anchors';

class ActivityFeedLink extends React.Component {
  constructor(props) {
    super(props);
    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
  }

  handleMouseOver() {
    const { changeUrlPreview, url } = this.props;
    changeUrlPreview(url);
  }

  handleMouseOut() {
    const { changeUrlPreview } = this.props;
    changeUrlPreview('');
  }

  render() {
    const { url, content } = this.props;
    return (
      <AnchorWithMouseEvents
        url={url}
        content={content}
        handleMouseOver={this.handleMouseOver}
        handleMouseOut={this.handleMouseOut}
      />
    );
  }
}

ActivityFeedLink.propTypes = {
  url: PropTypes.string.isRequired,
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
  changeUrlPreview: PropTypes.func.isRequired,
};

export default ActivityFeedLink;
