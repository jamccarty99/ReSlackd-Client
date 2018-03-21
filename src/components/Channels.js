import React, { Component } from 'react';
import { fetchChannels, setCurrentChannel, fetchDirectMessages, fetchCurrentChannelMessages } from '../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux"
import Modal from './Modal'

class Channels extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    if (this.props.messageType === "channel") {
      this.props.fetchChannels()
    } else {
      this.props.fetchDirectMessages()
    }
  }

  handleClick(event) {
    //  the syntax here is weird. I can't get access to the 'key' property of the div
    const channelId = event.target.getAttribute('channel-id')
    const channelArray = this.props.messageType === "channel" ? this.props.channels : this.props.directMessages
    const currentChannel = channelArray.find( (channel) => {
      return channel.cID == channelId
    })
    this.props.setCurrentChannel(currentChannel, (cID) => {
      this.props.fetchCurrentChannelMessages(currentChannel.cID)
    })
  }

  render() {
    const channelType = this.props.messageType === "channel" ? "Channels" : "Direct Messages"
    const channelArray = this.props.messageType === "channel" ? this.props.channels : this.props.directMessages
    return (
      <div className="mb-3 channels">
        <p>
          {channelType}
          <span className="add-channel-icon float-right ml-2" role="button"><Modal messageType={this.props.messageType}/></span>
        </p>
        <div className='pl-2'>
          {channelArray.map(channel => {
            return (
              <div className="channel-item" channel-id={channel.cID} key ={channel.cID} onClick={this.handleClick}>
                {channel.name}
              </div>
            )
          })
          }
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { channels: state.channels, directMessages: state.directMessages }
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchDirectMessages, fetchChannels, setCurrentChannel, fetchCurrentChannelMessages }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Channels);
