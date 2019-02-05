import React from 'react';
import _ from 'lodash';
import { ActivityFeedLink } from './ActivityFeedLink';


export class ActivityFeedLine extends React.Component {

    constructor(props) {
        super(props);
        this.getData = this.getData.bind(this);
        this.getDataAndFormatForActivityLine = this.getDataAndFormatForActivityLine.bind(this);
    }

    getData(type, id) {
        var data = _.get(this.props, type).find(object => object.id.toString() === id);
        return data;
    }

    getDataAndFormatForActivityLine(reference) {
        var [type, id] = _.split(_.trim(reference), ':', 2);
        var object = this.getData(type, id);
        if (type === 'profiles') {
            var url = '/users/' + object.slug;
            return <ActivityFeedLink url={url} content={object.abbreviated_name} changeUrlPreview={this.props.changeUrlPreview}/>;
        } else if (type === 'task') {
            var url = '/task/' + object.slug;
            return <ActivityFeedLink url={url} content={object.name} changeUrlPreview={this.props.changeUrlPreview}/>;
        }
    }

    render() {
        let activity = this.props.activityItem;
        const reactStringReplace = require('react-string-replace')
        var formattedActivityTemplate = reactStringReplace(activity.template, /{\s*([\w-_]+[:][\d]+)\s*}/g, (match, i) => (
            this.getDataAndFormatForActivityLine(match)
            )
        );

        return (
            <li className="activityItemLine list-group-item">
                {formattedActivityTemplate}
            </li>
          );
    }
}