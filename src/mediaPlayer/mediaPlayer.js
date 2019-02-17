/**
 * @name - MediaPlayer
 * @description - Plays the media based on the source
 */
import React from 'react';
import "./mediaPlayer.css"

class MediaPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
    };
  }
  /**
   * @name render
   * @description uses HTML5 control to load and play media
   */
  render() {
    const { isLoaded } = this.state;
    if (!isLoaded) {
      return <div className = "mediaNotFound"></div>;
    } else if (isLoaded) {
      return <div className="media">
        <div className="videoControls">
          <video controls>
            <source src={this.props.href} type={this.props.type} />
          </video>
        </div>
        <label> {this.props.caption} </label>
      </div>
    }
  }

  /**
   * @name componentDidMount
   * @description loads the media once the url is reachable
   */

  componentDidMount() {
    fetch(this.props.href)
      .then(
        () => {
          this.setState({
            isLoaded: true
          });
        },
        (error) => {
          this.setState({
            isLoaded: false,
            error
          });
        }
      )
  }
}

export default MediaPlayer;

