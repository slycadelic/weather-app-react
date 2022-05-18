import useAudio from '../../hooks/useAudio';
import url1  from '../../assets/Sounds/Rain.mp3' 

const AudioPlayer = () => {
    const [playing, toggle] = useAudio(url1);
  
    return (
      <div>
        <button onClick={toggle}>{playing ? "Pause" : "Play"}</button>
      </div>
    );
  };
  
  export default AudioPlayer;