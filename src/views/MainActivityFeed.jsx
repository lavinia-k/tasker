import React from 'react';
import { ActivityFeedLine } from './ActivityFeedLine';

export class MainActivityFeed extends React.Component {
    render() {
        let activityItems = this.props.data.activity_feed;
        let profiles = this.props.data.profiles;
        let tasks = this.props.data.tasks;

        return (
            <ul className="activityFeed list-group-flush" >
                {activityItems.map((activityItem, index) => 
                <ActivityFeedLine activityItem={activityItem} 
                profiles={profiles.filter(profile => activityItem.profile_ids.includes(profile.id))}
                task={tasks.filter(task => activityItem.task_id === task.id)} key={index} 
                changeUrlPreview={this.props.changeUrlPreview}/>
                )}
            </ul>
        );
    }
}