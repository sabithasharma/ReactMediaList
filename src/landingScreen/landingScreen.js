/**
 * @name - LandingScreen
 * @description - screen fetches and displays a list of media files
 */
import React from 'react';
import MediaPlayer from '../mediaPlayer/mediaPlayer';
import './landingScreen.css';
import { media } from './../constants'

class LandingScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            medias: []
        };
    }
    /**
     * @name componentDidMount
     * @description once the component is mounted media list is fetched from the url and state is set for displaying media
     */
    componentDidMount() {
        fetch(media.url)
            .then(res => res.json())
            .then(
                (result) => {
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
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    /**
     * @name render
     * @description displays media once the list is loaded
     */
    render() {
        const { error, isLoaded, medias } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else if (isLoaded) {
            return (
                <div id="container">
                    {this.listMedia(medias)}
                </div>
            );
        }
    }

    /**
     * @name listMedia
     * @description lists the media based on the json response
     */
    listMedia(medias) {
        return medias.map(media => {
            var mediaArray = [];
            if (media.asset) {
                for (let resource in media.asset.resources) {
                    let resources = media.asset.resources;
                    let renditions = resources[resource].renditions;
                    if (renditions && renditions.length) {
                        for (let rendition in renditions) {
                            let links = renditions[rendition].links;
                            for (var link in links) {
                                let srcMedia = links[link].href;
                                let caption = media.metadata.title || "No caption found";
                                mediaArray.push(<MediaPlayer key = {srcMedia} href={srcMedia} caption={caption} />)
                            }
                        }
                    }
                }
            }
            return mediaArray;
        });
    }
}

export default LandingScreen