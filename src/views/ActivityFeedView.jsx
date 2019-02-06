import React from 'react';
import PropTypes from 'prop-types';

function ActivityFeedView({ activityFeedLines }) {
  return <ul className="activityFeed list-group-flush">{activityFeedLines}</ul>;
}

ActivityFeedView.propTypes = {
  activityFeedLines: PropTypes.shape([PropTypes.element]).isRequired,
};

export default ActivityFeedView;
