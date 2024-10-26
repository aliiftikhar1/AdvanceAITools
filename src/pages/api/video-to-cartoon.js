import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';
import formidable from 'formidable';

export const config = {
  api: {
    bodyParser: false, // Disable built-in body parser to handle file uploads
  },
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    // Set up formidable for file parsing
    const form = formidable({
      uploadDir: path.join(process.cwd(), 'public/uploads'), // Directory to store uploaded files
      keepExtensions: true, // Keep file extensions for uploaded files
      multiples: false, // Only allow a single file upload
    });

    // Parse the incoming request to handle file upload
    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error('Error parsing the form:', err);
        return res.status(500).json({ error: 'Form parsing failed' });
      }

      console.log('Parsed files:', files);

      // Extract the uploaded file - handling different scenarios
      let uploadedFile;
      if (files.inputVideo && Array.isArray(files.inputVideo)) {
        uploadedFile = files.inputVideo[0]; // Handle if formidable returns an array
      } else if (files.inputVideo) {
        uploadedFile = files.inputVideo; // Handle if formidable returns a single object
      }

      if (!uploadedFile || !uploadedFile.filepath) {
        console.error('No valid video file uploaded.');
        return res.status(400).json({ error: 'No valid file uploaded' });
      }

      // Filepath to the uploaded video
      const videoPath = uploadedFile.filepath;
      console.log(`Uploaded video file path: ${videoPath}`);

      // Define the output path for the cartoon video (saving directly in the public folder)
      const outputVideoPath = path.join(process.cwd(), 'public', 'cartoon_output.mp4');
      // Path to the ONNX model
      const modelPath = path.join(process.cwd(), 'python-scripts', 'Hayao-60.onnx');
      // Path to save frames directory (created under the script directory)
      const outputFramesDir = path.join(process.cwd(), 'python-scripts', 'frames');

      // Ensure that the output frames directory exists
      if (!fs.existsSync(outputFramesDir)) {
        fs.mkdirSync(outputFramesDir, { recursive: true });
      }

      try {
        // Call the Python script to perform video-to-cartoon conversion
        const pythonScript = path.join(process.cwd(), 'python-scripts', 'video-to-cartoon.py');

        // Spawn the Python process with necessary arguments
        const pythonProcess = spawn('python', [
          pythonScript, // Path to Python script
          videoPath, // Input video path
          outputVideoPath, // Output video path
          modelPath, // ONNX model path
          outputFramesDir, // Directory to save frames
        ]);

        // Handle output and error logs from the Python script
        pythonProcess.stdout.on('data', (data) => {
          console.log(`Python stdout: ${data}`);
        });

        pythonProcess.stderr.on('data', (data) => {
          console.error(`Python stderr: ${data}`);
        });

        // Once the Python process completes, handle the response
        pythonProcess.on('close', (code) => {
          if (code === 0) {
            console.log(`Video processed successfully and saved to: ${outputVideoPath}`);
            return res.status(200).json({ videoUrl: '/cartoon_output.mp4' }); // Send back correct URL for the video
          } else {
            console.error(`Python process exited with code ${code}`);
            return res.status(500).json({ error: 'Video processing failed' });
          }
        });
      } catch (error) {
        console.error('Error processing file:', error);
        res.status(500).json({ error: 'Failed to process the file' });
      }
    });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
