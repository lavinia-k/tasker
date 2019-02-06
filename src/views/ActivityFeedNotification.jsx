import React from 'react';
import PropTypes from 'prop-types';

function ActivityFeedNotification({ dataChanged }) {
  if (dataChanged) {
    return (
      <p className="activityFeedNotification active">
        Please refresh the page to see the latest events.
      </p>
    );
  }
  return <p className="activityFeedNotification inactive" />;
}

ActivityFeedNotification.propTypes = {
  dataChanged: PropTypes.bool.isRequired,
};

export default ActivityFeedNotification;
