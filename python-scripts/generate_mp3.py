import sys
from gtts import gTTS

def generate_mp3(text, language):
    lang_code = "en" if language == "English" else "ur"
    mp3_filename = "output.mp3"
    
    try:
        tts = gTTS(text, lang=lang_code)
        tts.save(mp3_filename)
        print(mp3_filename)  # This is printed to stdout and captured by Node.js
    except Exception as e:
        print(f"Error: {str(e)}", file=sys.stderr)

if __name__ == "__main__":
    text = sys.argv[1]
    language = sys.argv[2]
    generate_mp3(text, language)
