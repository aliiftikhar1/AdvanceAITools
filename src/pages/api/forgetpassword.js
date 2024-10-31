import sendPasswordResetEmail from './sendforgetpasswordemail';

export default async function handler(req, res) {
  // Handle CORS for OPTIONS request
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Update with your frontend URL in production
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, POST, GET');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const { email } = req.body; 

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    console.log("Email to reset password for:", email);

    const formdata = new FormData();
    formdata.append('email', email);

    // Call the external API to check if the user exists
    const response = await fetch('https://aitools.pkstockhelper.info/api/get_userbyid.php', {
      method: 'POST',
      body: formdata, // Send the email in the POST body
    });

    const user = await response.json();
    console.log("User data is:", user);

    // Check if the user exists in the external API response
    if (user.status === "error") {
      console.log("User not found");
      return res.status(404).json({
        message: 'No user found with this email',
        status: false,
      });
    }

    // If the user exists, proceed to send the password reset email
    console.log("Sending password reset email...");
    try {
      const sendEmailResult = await sendPasswordResetEmail(email);

      if (sendEmailResult) {
        console.log("Email sent successfully");
        return res.status(200).json({
          message: 'Password reset email sent successfully',
          status: true,
        });
      } else {
        console.log("Email was not sent");
        return res.status(500).json({
          message: 'Failed to send password reset email',
          status: false,
        });
      }
    } catch (error) {
      console.error('Error sending password reset email:', error);
      return res.status(500).json({
        message: 'Failed to send password reset email',
        status: false,
        error: error.message,
      });
    }
  } catch (error) {
    console.error('Error processing request:', error);
    return res.status(500).json({
      message: 'Error processing request',
      status: false,
      error: error.message,
    });
  }
}
