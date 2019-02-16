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
      return <div></div>;
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

  componentDidMount() {
    fetch(this.props.href)
      .then(
        (result) => {
          console.log(result);
          this.setState({
            isLoaded: true,
            medias: result
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
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

