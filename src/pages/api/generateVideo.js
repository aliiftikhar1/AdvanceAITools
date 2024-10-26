import { spawn } from 'child_process';
import path from 'path';
import { NextResponse } from 'next/server';

export async function POST(request) {
  
  const { text, avatar, voice } = await request.json();

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
  return new Promise((resolve) => {
    pythonProcess.on('exit', (code) => {
      if (code !== 0) {
        console.error(`Python process exited with code ${code}`);
        resolve(NextResponse.json({ error: 'Failed to generate video.' }, { status: 500 }));
      } else {
        const videoUrl = `/generated_video.mp4`;  // Video relative path in the public folder
        resolve(NextResponse.json({ videoUrl }));
      }
    });
  });
}
