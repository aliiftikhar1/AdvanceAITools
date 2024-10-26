import { useEffect, useRef, useState } from "react";
import { AiFillPlayCircle } from "react-icons/ai";
import { BsPauseCircleFill } from "react-icons/bs";
import { BiSolidDownload } from "react-icons/bi";
import { SiConvertio } from "react-icons/si";

const AudioPlayer = ({ audioFile, convertTextToSpeech }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [audioBlob, setAudioBlob] = useState(null); // Store the audio Blob

  const audioRef = useRef();
  const progressBarRef = useRef();

  useEffect(() => {
    const audio = audioRef.current;

    if (audioFile && audioFile.AudioStream) {
      const processAudioStream = async () => {
        const reader = audioFile.AudioStream.getReader();
        const chunks = [];
        let done, value;

        while (!done) {
          ({ done, value } = await reader.read());
          if (value) {
            chunks.push(value);
          }
        }

        // Create a Blob from the stream chunks
        const blob = new Blob(chunks, { type: "audio/mpeg" });
        setAudioBlob(blob); // Store the Blob for later use
        const audioURL = URL.createObjectURL(blob);

        // Set the audio source to the Blob URL
        audio.src = audioURL;

        // Event listeners for audio play/pause
        audio.addEventListener("loadeddata", () => {
          setDuration(audio.duration);
        });

        audio.addEventListener("timeupdate", updateProgressBar);
        audio.addEventListener("ended", () => {
          setIsPlaying(false);
        });

        return () => {
          URL.revokeObjectURL(audioURL);
          audio.removeEventListener("timeupdate", updateProgressBar);
          audio.removeEventListener("ended", () => setIsPlaying(false));
        };
      };

      processAudioStream();
    } else {
      console.error("audioFile or AudioStream is undefined");
    }
  }, [audioFile]);

  const updateProgressBar = () => {
    const audio = audioRef.current;
    const progress = (audio.currentTime / audio.duration) * 100;
    setCurrentTime(audio.currentTime);
    progressBarRef.current.style.width = `${progress}%`;
  };

  const downloadAudio = () => {
    if (audioBlob) {
      const audioURL = URL.createObjectURL(audioBlob);
      const a = document.createElement("a");
      a.href = audioURL;
      a.download = "audio.mp3"; // Set the file name
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(audioURL); // Clean up
    } else {
      console.error("Audio blob is not available for download.");
    }
  };

  const togglePlay = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="backdrop-filter backdrop-blur-lg bg-white/30 pb-4 rounded-3xl w-full mx-auto shadow-lg">
      <audio ref={audioRef} />

      {/* Controls Row */}
      <div className="flex justify-start items-start space-x-4 mb-6 pl-4">
        {/* Convert to Speech Button */}
        <button
          className="bg-gradient-to-r from-green-400 to-blue-500 text-white p-2 rounded-full shadow-md hover:shadow-lg hover:scale-110 transition-transform duration-300"
          onClick={() => convertTextToSpeech()}
        >
          <SiConvertio className="text-3xl" />
        </button>

        {/* Play/Pause Button */}
        <button
          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-2 rounded-full shadow-md hover:shadow-lg hover:scale-110 transition-transform duration-300"
          disabled={!audioBlob}
          onClick={togglePlay}
        >
          {isPlaying ? (
            <BsPauseCircleFill className="text-3xl" />
          ) : (
            <AiFillPlayCircle className="text-3xl" />
          )}
        </button>

        {/* Download Button */}
        <button
          className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white p-2 rounded-full shadow-md hover:shadow-lg hover:scale-110 transition-transform duration-300"
          disabled={!audioBlob}
          onClick={downloadAudio}
        >
          <BiSolidDownload className="text-3xl" />
        </button>
      </div>

      {/* Progress Bar */}
      <div className="progress-container mx-2 h-3 bg-gray-200 rounded-full overflow-hidden mt-4">
        <div
          ref={progressBarRef}
          className="progress-bar h-full bg-gradient-to-r from-pink-500 to-purple-600 rounded-full transition-all duration-300"
        ></div>
      </div>

      {/* Time Display */}
      <div className="mt-6 text-center text-black text-lg font-semibold">
        {Math.floor(currentTime / 60)}:
        {("0" + Math.floor(currentTime % 60)).slice(-2)} /{" "}
        {Math.floor(duration / 60)}:
        {("0" + Math.floor(duration % 60)).slice(-2)}
      </div>
    </div>
  );
};

export default AudioPlayer;
