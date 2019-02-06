import React from 'react';
import PropTypes from 'prop-types';
import ActivityFeedLine from './ActivityFeedLine';
import ActivityFeedView from '../views/ActivityFeedView';
import { hasValidCoordinates, getDistanceBetweenTwoCoordinates } from '../utils/GeoUtils';
import LargePlainTextView from '../views/LargePlainTextView';

const initialUrlPreviewText = 'Mouse over a user or task to get their path.';
const activityFilteringDistanceInMeters = 300000; // Modify this to test location filtering

class ActivityFeed extends React.Component {
  constructor(props) {
    super(props);

    this.initialUrlPreviewText = 'Mouse over a user or task to get their path.';
    this.state = {
      activityFeedItems: props.data.activity_feed,
      urlPreviewText: this.initialUrlPreviewText,
    };
    this.userCoordinatesFromLocalStorage = localStorage.getItem('userCoords');

    this.changeUrlPreview = this.changeUrlPreview.bind(this);
    this.isActivityWithinNearbyRadius = this.isActivityWithinNearbyRadius.bind(this);
  }

  componentDidMount() {
    const { useGeolocationFiltering } = this.props;
    if (useGeolocationFiltering && hasValidCoordinates(this.userCoordinatesFromLocalStorage)) {
      const {
        data: { activity_feed: activityFeed },
      } = this.props;

      const activityFeedFilteredByLocation = activityFeed.filter(
        activity => this.getArrayOfLocations(activity).some(this.isActivityWithinNearbyRadius),
      );

      this.setState({
        activityFeedItems: activityFeedFilteredByLocation,
      });
    }
  }

  getArrayOfLocations(activityItem) {
    const {
      data: { profiles, tasks, locations },
    } = this.props;
    const linkedLocationIds = new Set();
    const linkedLocations = [];

    // Get profiles and tasks associated with the current activity item
    const filteredProfiles = profiles.filter(p => activityItem.profile_ids.includes(p.id));
    const filteredTasks = tasks.filter(t => activityItem.task_id === t.id);

    // Get location IDs from the filtered profiles/tasks
    filteredProfiles.forEach(profile => linkedLocationIds.add(profile.default_location_id));
    filteredTasks.forEach(task => linkedLocationIds.add(task.default_location_id));

    linkedLocationIds.forEach(id => linkedLocations.push(locations.find(l => id === l.id)));

    return linkedLocations;
  }

  changeUrlPreview(newUrl) {
    this.setState({
      urlPreviewText: newUrl === '' ? initialUrlPreviewText : newUrl,
    });
  }

  generateActivityFeedLines() {
    const {
      data: { profiles, tasks },
    } = this.props;
    const { activityFeedItems } = this.state;

    const activityItems = activityFeedItems.sort(
      (activityA, activityB) => new Date(activityB.created_at) - new Date(activityA.created_at),
    );

    return activityItems.map((activityItem, index) => (
      <ActivityFeedLine
        activityItem={activityItem}
        profiles={profiles.filter(profile => activityItem.profile_ids.includes(profile.id))}
        task={tasks.filter(task => activityItem.task_id === task.id)}
        // eslint-disable-next-line react/no-array-index-key
        key={index}
        changeUrlPreview={this.changeUrlPreview}
      />
    ));
  }

  isActivityWithinNearbyRadius(activityLinkedLocation) {
    // For the purposes of this feed, activities with no associated locations should be included
    if (activityLinkedLocation === undefined) {
      return true;
    }

    const distance = getDistanceBetweenTwoCoordinates(
      activityLinkedLocation,
      JSON.parse(this.userCoordinatesFromLocalStorage),
    );
    return distance < activityFilteringDistanceInMeters;
  }

  render() {
    const { urlPreviewText } = this.state;

    return (
      <div className="page activityFeedPage">
        <ActivityFeedView activityFeedLines={this.generateActivityFeedLines()} />
        <LargePlainTextView text={urlPreviewText} cssClass="activityFeedUrlPreview" />
      </div>
    );
  }
}

ActivityFeed.propTypes = {
  data: PropTypes.shape({
    tasks: PropTypes.array,
    profiles: PropTypes.array,
    activity_feed: PropTypes.array,
  }).isRequired,
  useGeolocationFiltering: PropTypes.bool.isRequired,
};

export default ActivityFeed;
