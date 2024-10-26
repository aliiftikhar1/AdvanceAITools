import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests allowed' });
  }

  // Define the path to the cartoon_output.mp4
  const cartoonOutputPath = path.join(process.cwd(), 'public', 'cartoon_output.mp4');
  
  // Define the path to the frames directory
  const framesDirectory = path.join(process.cwd(), 'python-scripts', 'frames');

  // Check if cartoon_output.mp4 exists and delete it if found
  if (fs.existsSync(cartoonOutputPath)) {
    fs.unlink(cartoonOutputPath, (err) => {
      if (err) {
        console.error('Error deleting cartoon_output.mp4:', err);
        return res.status(500).json({ message: 'Error deleting cartoon_output.mp4' });
      }
      console.log('cartoon_output.mp4 deleted successfully.');
    });
  } else {
    console.log('cartoon_output.mp4 not found.');
  }

  // Check if frames directory exists and delete files inside it if found
  if (fs.existsSync(framesDirectory)) {
    fs.readdir(framesDirectory, (err, files) => {
      if (err) {
        console.error('Error reading frames directory:', err);
        return res.status(500).json({ message: 'Error reading frames directory' });
      }

      files.forEach((file) => {
        const filePath = path.join(framesDirectory, file);
        if (fs.existsSync(filePath)) {
          fs.unlink(filePath, (err) => {
            if (err) {
              console.error(`Error deleting file ${file}:`, err);
            } else {
              console.log(`File ${file} deleted successfully.`);
            }
          });
        }
      });

      console.log('All frames deleted successfully.');
      res.status(200).json({ message: 'Files deleted successfully' });
    });
  } else {
    console.log('Frames directory not found.');
    return res.status(404).json({ message: 'Frames directory not found' });
  }
}
