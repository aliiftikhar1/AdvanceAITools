import os
import sys
import moviepy.editor as mp
from gtts import gTTS
from pydub import AudioSegment
import shutil  # To move the file

# Set the path to FFmpeg
ffmpeg_path = r"C:/ffmpeg/bin/ffmpeg.exe"  # Ensure this path is correct
AudioSegment.converter = ffmpeg_path
mp.ffmpeg_tools.ffmpeg_binary = ffmpeg_path

def generate_video(text, avatar, voice):
    try:
        # Directory of the current script
        script_dir = os.path.dirname(os.path.abspath(__file__))
        avatar_video_path = avatar  # Use the path directly passed from the frontend

        # Ensure the avatar video exists
        if not os.path.exists(avatar_video_path):
            raise FileNotFoundError(f"Avatar video not found at {avatar_video_path}")

        # Generate audio from text using gTTS
        lang_code = "en" if voice == "Male Voice" else "ur"  # Check voice selection
        tts = gTTS(text, lang=lang_code)

        # Save the audio as MP3
        output_audio = os.path.join(script_dir, "generated_audio.mp3")
        tts.save(output_audio)

        # Convert the audio from MP3 to WAV
        audio = AudioSegment.from_mp3(output_audio)
        output_wav_audio = os.path.join(script_dir, "generated_audio.wav")
        audio.export(output_wav_audio, format="wav")

        # Get audio duration
        audio_duration = audio.duration_seconds

        # Load the avatar video
        video_clip = mp.VideoFileClip(avatar_video_path)
        video_duration = video_clip.duration

        # Repeat avatar video if audio is longer than the video
        if audio_duration > video_duration:
            num_loops = int(audio_duration // video_duration) + 1
            video_clip = mp.concatenate_videoclips([video_clip] * num_loops)

        # Trim the video to match the audio duration
        final_video_clip = video_clip.subclip(0, audio_duration)

        # Set the audio to the video
        audio_clip = mp.AudioFileClip(output_wav_audio)
        final_clip = final_video_clip.set_audio(audio_clip)

        # Save the video as "generated_video.mp4"
        output_video = os.path.join(script_dir, "generated_video.mp4")
        final_clip.write_videofile(output_video, verbose=False, logger=None)

        # Move the video to the public folder for Next.js access
        public_video_path = os.path.join(script_dir, "..", "public", "generated_video.mp4")
        shutil.move(output_video, public_video_path)  # Move the file to the public directory

        return public_video_path  # Return the video path

    except Exception as e:
        print(f"Error: {str(e)}", file=sys.stderr)
        sys.exit(1)

if __name__ == "__main__":
    text = sys.argv[1]
    avatar = sys.argv[2]
    voice = sys.argv[3]
    video_path = generate_video(text, avatar, voice)
    print(video_path)
