import React from 'react';
import { MainActivityFeed } from './MainActivityFeed';
import data from '../activity_feed.json';
import { UrlPreview } from './UrlPreview';

export class ActivityFeedPage extends React.Component {

    constructor(props) {
        super(props);
        this.initialUrlPreviewText = 'Mouse over a user or task to get their path.';
        this.state = { data: data, urlPreview: this.initialUrlPreviewText };
        this.changeUrlPreview = this.changeUrlPreview.bind(this);
    }

    changeUrlPreview(newUrl) {
        this.setState({
            urlPreview: newUrl === '' ? this.initialUrlPreviewText : newUrl
        });
    }

    render() {
        return (
            <div className="page activityFeedPage">
                <MainActivityFeed data={data} changeUrlPreview={this.changeUrlPreview}/>
                <UrlPreview url={this.state.urlPreview}/>
            </div>
          );
    }
}