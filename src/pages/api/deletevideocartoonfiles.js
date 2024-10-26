import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

export async function POST(request) {
  const cartoonOutputPath = path.join(process.cwd(), 'public', 'cartoon_output.mp4');
  const framesDirectory = path.join(process.cwd(), 'python-scripts', 'frames');

  // Helper function to delete a file
  const deleteFile = (filePath) => {
    return new Promise((resolve, reject) => {
      fs.unlink(filePath, (err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  };

  try {
    // Delete cartoon_output.mp4 if it exists
    if (fs.existsSync(cartoonOutputPath)) {
      await deleteFile(cartoonOutputPath);
      console.log('cartoon_output.mp4 deleted successfully.');
    } else {
      console.log('cartoon_output.mp4 not found.');
    }

    // Delete all files in the frames directory if it exists
    if (fs.existsSync(framesDirectory)) {
      const files = fs.readdirSync(framesDirectory);
      await Promise.all(
        files.map(async (file) => {
          const filePath = path.join(framesDirectory, file);
          if (fs.existsSync(filePath)) {
            await deleteFile(filePath);
            console.log(`File ${file} deleted successfully.`);
          }
        })
      );
      console.log('All frames deleted successfully.');
      return NextResponse.json({ message: 'Files deleted successfully' });
    } else {
      console.log('Frames directory not found.');
      return NextResponse.json({ message: 'Frames directory not found' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ message: 'Error deleting files' }, { status: 500 });
  }
}
