import React, { useRef, useState } from 'react';
import './Player.css';
import { ReactDOM } from 'react';
import { faHome, faPause, faPlayCircle, faStepBackward, faStepForward, faVolumeDown, faVolumeUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee } from '@fortawesome/free-solid-svg-icons'


export default function Player({ song, songsList }) {

    // const [isPlaying, setIsPlaying] = useState(false);
    // const [updateTimer, setUpdateTimer] = useState();
    // const [currentTime, setCurrentTime] = useState('');
    //  const [totalDuration, setTotalDuration] = useState('');
    // const [seekSlider, setSeekSlider] = useState(0);
    // const [currentIndex, setCurrentIndex] = useState(0);
    //const [currentTrack, setCurrentTrack] = useState();

    const updateTimer = useRef(null);
    const index = useRef(0);
    const isPlaying = useRef(false);
    const currentTrack = useRef(null);
    const playButton = useRef(null);
    const currentTime = useRef('');
    const duration = useRef('');
    const slider = useRef(0);

    function loadTrack(songIndex) {

        currentTrack.current = document.createElement('audio');
        clearInterval(updateTimer);
        resetValues();
        currentTrack.current.src = songsList[songIndex].path;
        currentTrack.current.load();
        updateTimer.current = setInterval(seekUpdate, 1000);
        currentTrack.current.addEventListener("ended", nextTrack);
    }


    return (

        songsList != 0
            ?
            <div>
                <div className="player">
                    <div className="details">
                        <img className="track-img" src={'http://localhost:5242/api/trysound/image/' + song.id} />
                        <div className="track-name">{song.description}</div>
                        <div className="track-artist">{song.title}</div>
                    </div>

                    <div className="buttons">
                        <div className="prev-track" onclick="prevTrack()">
                            <FontAwesomeIcon className="fa fa-step-backward fa-2x" icon={faStepBackward} />
                        </div>
                        <div className="playpause-track" onClick={(event) => {
                            playButton.current = event.target;
                            playPauseTrack();
                            alert(playButton.current)
                        }}>
                            <FontAwesomeIcon className="fa fa-play-circle fa-5x" icon={faPlayCircle} />
                        </div>
                        <div className="next-track" onclick="nextTrack()">
                            <FontAwesomeIcon className="fa fa-step-forward fa-2x" icon={faStepForward} />
                        </div>
                    </div>

                    <div className="slider_container">
                        <div className="current-time">00:00</div>
                        <input type="range" min="1" max="100"
                            value="0" class="seek_slider" onchange="seekTo()" />
                        <div className="total-duration">00:00</div>
                    </div>

                    <div className="slider_container">
                        <FontAwesomeIcon className="fa fa-volume-down" icon={faVolumeDown} />
                        <input type="range" min="1" max="100"
                            value="99" className="volume_slider" onchange="setVolume()" />
                        <FontAwesomeIcon className="fa fa-volume-up" icon={faVolumeUp} />
                    </div>
                </div>
            </div>
            :
            <div></div>
    )

    // Function to reset all values to their default
    function resetValues() {
        currentTime.current = '00:00';
        duration.current = '00:00';
        slider.current = 0;
    }

    function playPauseTrack() {



        if (!isPlaying.current)
            playTrack();
        else
            pauseTrack();
    }

    function playTrack() {
        // Play the loaded track
        // currentTrack.current.play();
        // isPlaying.current = true;

        // Replace icon with the pause icon
       // playButton.current = 'FontAwesomeIcon className="fa fa-pause-circle fa-5x" icon={faStepForward}';
    }

    function pauseTrack() {
        // Pause the loaded track
        currentTrack.current.pause();
        isPlaying.current = false;

        // Replace icon with the play icon
        //   playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
    }

    function nextTrack() {
        // Go back to the first track if the
        // current one is the last in the track list
        if (index.current < songsList.length - 1)
            index.current = index.current + 1;
        else
            index.current = 0;

        // Load and play the new track
        loadTrack(index.current);
        playTrack();
    }

    // function prevTrack() {
    //     // Go back to the last track if the
    //     // current one is the first in the track list
    //     if (currentIndex > 0)
    //         setCurrentIndex(currentIndex - 1);
    //     else
    //         setCurrentIndex(songsList - 1);


    //     // Load and play the new track
    //     loadTrack(track_index);
    //     playTrack();
    // }

    // function seekTo() {
    //     // Calculate the seek position by the
    //     // percentage of the seek slider
    //     // and get the relative duration to the track
    //     seekto = curr_track.duration * (seek_slider.value / 100);

    //     // Set the current track position to the calculated seek position
    //     curr_track.currentTime = seekto;
    // }

    // function setVolume() {
    //     // Set the volume according to the
    //     // percentage of the volume slider set
    //     curr_track.volume = volume_slider.value / 100;
    // }

    function seekUpdate() {

        let seekPosition = 0;

        // Check if the current track duration is a legible number
        if (!isNaN(currentTrack.current.duration)) {

            seekPosition = currentTrack.current.currentTime * (100 / currentTrack.current.duration);
            slider.current = seekPosition;

            // Calculate the time left and the total duration
            const currentMinutes = Math.floor(currentTrack.current.currentTime / 60);
            const currentSeconds = Math.floor(currentTrack.current.currentTime - currentMinutes * 60);
            const durationMinutes = Math.floor(currentTrack.current.duration / 60);
            const durationSeconds = Math.floor(currentTrack.current.duration - durationMinutes * 60);

            // Add a zero to the single digit time values
            if (currentSeconds < 10)
                currentSeconds = "0" + currentSeconds;
            if (durationSeconds < 10)
                durationSeconds = "0" + durationSeconds;
            if (currentMinutes < 10)
                currentMinutes = "0" + currentMinutes;
            if (durationMinutes < 10)
                durationMinutes = "0" + durationMinutes;

            // Display the updated duration
            currentTrack.current.textContent = currentMinutes + ":" + currentSeconds;
            duration.current.textContent = durationMinutes + ":" + durationSeconds;
        }
    }


}
