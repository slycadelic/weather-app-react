/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";

const useAudio = url => {


  const [audio] = useState(new Audio(url));
  audio.loop = true;
  const [playing, setPlaying] = useState(true);

  const toggle = () => setPlaying(!playing);

  useEffect(() => {
      playing ? audio.play() : audio.pause();
    },
    [playing]
  );

//   useEffect(() => {
//     audio.addEventListener('ended', () => setPlaying(false));
//     return () => {
//       audio.removeEventListener('ended', () => setPlaying(false));
//     };
//   }, []);

  return [playing, toggle];
};

export default useAudio;