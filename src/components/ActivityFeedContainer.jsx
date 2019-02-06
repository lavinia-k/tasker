import React from 'react';
import axios from 'axios';
import _ from 'lodash';
import ActivityFeed from './ActivityFeed';
import ActivityFeedNotification from '../views/ActivityFeedNotification';
import Loading from '../views/Loading';
import {
  hasValidCoordinates,
  saveCoordinatesForUserFromGivenPosition,
  getCurrentCoordinatesForUserAndTriggerSuccessCallback,
} from '../utils/GeoUtils';

const activityFeedJsonFilePath = '../activity_feed.json';
const activityFeedDataPollingIntervalInMs = 10000;
const useGeolocationFiltering = true; // Set to false if you don't need location-based filtering
const userCoordinatesFromLocalStorage = localStorage.getItem('userCoords');

// When using geolocation filtering, don't wait for the location API to return past this time limit.
// If any data was returned, it will be saved in localStorage and accessed on the next refresh.
const geolocationRequestTimeoutInMs = 1500;

class ActivityFeedContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: undefined,
      dataChanged: false,
      loadingData: true,
      loadingGeoData: useGeolocationFiltering,
    };
    this.visitorCoordinates = userCoordinatesFromLocalStorage;

    this.getActivityFeedData = this.getActivityFeedData.bind(this);
    this.saveGeolocationDataAndUpdateLoadState = this.saveGeolocationDataAndUpdateLoadState.bind(
      this,
    );
    this.setGeolocationDataLoadingStateToFalse = this.setGeolocationDataLoadingStateToFalse.bind(
      this,
    );
  }

  componentDidMount() {
    // Get activity feed data and poll for data every X seconds
    this.getActivityFeedData();
    this.interval = setInterval(
      () => this.getActivityFeedData(),
      activityFeedDataPollingIntervalInMs,
    );

    // Get geolocation data if enabled
    if (useGeolocationFiltering) {
      getCurrentCoordinatesForUserAndTriggerSuccessCallback(
        this.saveGeolocationDataAndUpdateLoadState,
      );

      // Don't hold up rendering if localStorage coordinates exist
      if (hasValidCoordinates(userCoordinatesFromLocalStorage)) {
        this.setGeolocationDataLoadingStateToFalse();
      } else {
        // Set timeout if no coordinates exist in localStorage
        this.geolocationRequestOverTimeLimit = setTimeout(
          this.setGeolocationDataLoadingStateToFalse,
          geolocationRequestTimeoutInMs,
        );
      }
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
    clearTimeout(this.geolocationRequestOverTimeLimit);
  }

  getActivityFeedData() {
    const { data } = this.state;

    axios
      .get(activityFeedJsonFilePath)
      .then((response) => {
        const dataChanged = !_.isEqual(data, response.data);

        if (data === undefined) {
          // Populate data for the first time

          this.setState({
            loadingData: false,
            data: response.data,
          });
        } else if (dataChanged) {
          // If fetched data is different from initial data, keep track of this change, but don't
          // update the main data object/view immediately as this can be seen as bad UX

          this.setState({
            // eslint-disable-next-line react/no-unused-state
            newData: response.data,
            dataChanged: true,
          });
        }
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error);

        this.setState({
          loadingData: false,
          data: {},
        });
      });
  }

  setGeolocationDataLoadingStateToFalse() {
    const { loadingGeoData } = this.state;
    if (loadingGeoData) {
      this.setState({
        loadingGeoData: false,
      });
      clearTimeout(this.geolocationRequestOverTimeLimit);
    }
  }

  saveGeolocationDataAndUpdateLoadState(position) {
    if (saveCoordinatesForUserFromGivenPosition(position)) {
      this.setGeolocationDataLoadingStateToFalse();
    }
  }

  render() {
    const {
      data, loadingData, loadingGeoData, dataChanged,
    } = this.state;

    if (loadingData || loadingGeoData) {
      return <Loading />;
    }

    return (
      <div className="page activityFeedPage">
        <ActivityFeedNotification dataChanged={dataChanged} />
        <ActivityFeed data={data} useGeolocationFiltering={useGeolocationFiltering} />
      </div>
    );
  }
}

export default ActivityFeedContainer;
