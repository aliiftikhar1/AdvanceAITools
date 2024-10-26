import { spawn } from 'child_process';
import path from 'path';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { text, avatar, voice } = req.body;

    // Path to the Python script
    const pythonScript = path.resolve('python-scripts/generate_video.py');
    console.log('Executing Python script at:', pythonScript);

    let videoFilePath = '';

    // Spawn the Python process
    const pythonProcess = spawn('python', [pythonScript, text, avatar, voice]);

    // Capture stdout data (video file path)
    pythonProcess.stdout.on('data', (data) => {
      videoFilePath = data.toString().trim();  // Get the path to the generated video
    });

    // Capture stderr data (Python script errors)
    pythonProcess.stderr.on('data', (data) => {
      console.error('Error from Python script:', data.toString());
    });

    // When the Python process exits, return the video URL to the frontend
    pythonProcess.on('exit', (code) => {
      if (code !== 0) {
        console.error(`Python process exited with code ${code}`);
        return res.status(500).json({ error: 'Failed to generate video.' });
      }

      const videoUrl = `/generated_video.mp4`;  // Video relative path in the public folder
      return res.status(200).json({ videoUrl });
    });

  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
