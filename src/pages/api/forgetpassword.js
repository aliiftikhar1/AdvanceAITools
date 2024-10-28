import nodemailer from 'nodemailer';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Only POST requests are allowed' });
    }

    const { email } = req.body;

    // Configure the SMTP transport
    const transporter = nodemailer.createTransport({
        service: 'gmail', 
        auth: {
            user: process.env.NEXT_PUBLIC_USER_EMAIL, 
            pass: process.env.NEXT_PUBLIC_USER_PASSWORD, 
        },
    });

    // Email content
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Password Reset Request',
        html: `
            <p>Hello,</p>
            <p>We received a request to reset your password. Click the link below to reset your password:</p>
            <a href="https://advanceaitools.vercel.app/Forgetpassword/${encodeURIComponent(email)}">Reset Password</a>
            <p>If you did not request this, please ignore this email.</p>
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ status: 'success', message: 'Password reset email sent' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ status: 'error', message: 'Failed to send password reset email' });
    }
}
