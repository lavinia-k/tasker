import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import ReactStringReplace from 'react-string-replace';
import ActivityFeedLink from './ActivityFeedLink';

class ActivityFeedLine extends React.Component {
  constructor(props) {
    super(props);
    this.getData = this.getData.bind(this);
    this.getDataAndFormatForActivityLine = this.getDataAndFormatForActivityLine.bind(this);
  }

  getData(type, id) {
    const data = _.get(this.props, type).find(object => object.id.toString() === id);
    return data;
  }

  getDataAndFormatForActivityLine(reference, index) {
    const [type, id] = _.split(_.trim(reference), ':', 2);
    const object = this.getData(type, id);

    const { changeUrlPreview } = this.props;

    let url;
    if (type === 'profiles') {
      url = `/users/${object.slug}`;
      return (
        <ActivityFeedLink
          url={url}
          content={object.abbreviated_name}
          changeUrlPreview={changeUrlPreview}
          key={index}
        />
      );
    }

    if (type === 'task') {
      url = `/task/${object.slug}`;
      return (
        <ActivityFeedLink
          url={url}
          content={object.name}
          changeUrlPreview={changeUrlPreview}
          key={index}
        />
      );
    }

    return (
      <ActivityFeedLink
        url="#"
        content={object.name}
        changeUrlPreview={changeUrlPreview}
        key={index}
      />
    );
  }

  render() {
    const { activityItem: activity } = this.props;
    const reactStringReplace = ReactStringReplace;
    const formattedActivityTemplate = reactStringReplace(
      activity.template,
      /{\s*([\w-_]+[:][\d]+)\s*}/g,
      (match, i) => this.getDataAndFormatForActivityLine(match, i),
    );

    return <li className="activityItemLine list-group-item">{formattedActivityTemplate}</li>;
  }
}

ActivityFeedLine.propTypes = {
  activityItem: PropTypes.shape({
    template: PropTypes.string.isRequired,
  }).isRequired,
  changeUrlPreview: PropTypes.func.isRequired,
};

export default ActivityFeedLine;
