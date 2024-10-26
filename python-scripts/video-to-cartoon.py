# import sys
# import onnxruntime as ort
# import cv2
# import numpy as np
# import os
# import subprocess

# def process_image(img):
#     img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB).astype(np.float32) / 127.5 - 1.0
#     return img

# def convert_frame(img, session):
#     x = session.get_inputs()[0].name
#     y = session.get_outputs()[0].name
#     fake_img = session.run(None, {x: img})[0]
#     images = (np.squeeze(fake_img) + 1.) / 2 * 255
#     images = np.clip(images, 0, 255).astype(np.uint8)
#     return cv2.cvtColor(images, cv2.COLOR_RGB2BGR)

# def process_video(input_video, output_frames_dir, model_path):
#     print(f"Processing video: {input_video}")
#     print(f"Model path: {model_path}")
#     print(f"Frames will be saved to: {output_frames_dir}")

#     session = ort.InferenceSession(model_path, providers=['CPUExecutionProvider'])
#     vid = cv2.VideoCapture(input_video)

#     if not vid.isOpened():
#         print("Error: Could not open input video.")
#         return

#     total_frames = int(vid.get(cv2.CAP_PROP_FRAME_COUNT))
#     width = int(vid.get(cv2.CAP_PROP_FRAME_WIDTH))
#     height = int(vid.get(cv2.CAP_PROP_FRAME_HEIGHT))

#     print(f"Total frames in video: {total_frames}")
#     print(f"Video resolution: {width}x{height}")

#     # Ensure the frames directory exists
#     os.makedirs(output_frames_dir, exist_ok=True)
#     frame_count = 0

#     while True:
#         ret, frame = vid.read()
#         if not ret:
#             print("No more frames to read.")
#             break
        
#         print(f"Processing frame {frame_count}...")

#         # Process the frame
#         frame = np.expand_dims(process_image(frame), 0)
#         fake_img = convert_frame(frame, session)
        
#         # Save the processed frame
#         output_frame_path = os.path.join(output_frames_dir, f"frame_{frame_count:04d}.png")
#         cv2.imwrite(output_frame_path, fake_img)

#         if os.path.exists(output_frame_path):
#             print(f"Frame {frame_count} saved successfully to {output_frame_path}.")
#         else:
#             print(f"Error: Failed to write frame {frame_count} to {output_frame_path}.")
#             break
        
#         frame_count += 1

#     vid.release()

# def create_video_from_frames(output_frames_dir, output_video, fps):
#     print(f"Creating video from frames at {output_frames_dir}")
#     command = [
#         'ffmpeg',
#         '-r', str(fps),
#         '-i', f'{output_frames_dir}/frame_%04d.png',
#         '-vcodec', 'libx264',
#         '-pix_fmt', 'yuv420p',
#         output_video
#     ]

#     result = subprocess.run(command, stdout=subprocess.PIPE, stderr=subprocess.PIPE)

#     if result.returncode != 0:
#         print(f"ffmpeg error: {result.stderr.decode()}")
#     else:
#         print(f"Video created successfully at {output_video}")

# if __name__ == "__main__":
#     input_video = sys.argv[1]           # Input video file
#     output_video = sys.argv[2]          # Output video file
#     model_path = sys.argv[3]            # Path to ONNX model
#     output_frames_dir = sys.argv[4]     # Path to save frames (relative to script location)
    
#     # Process the video to generate frames
#     process_video(input_video, output_frames_dir, model_path)
    
#     # Create video from generated frames
#     fps = cv2.VideoCapture(input_video).get(cv2.CAP_PROP_FPS)
#     create_video_from_frames(output_frames_dir, output_video, fps)
