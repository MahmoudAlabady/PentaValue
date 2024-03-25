// scheduledNotifications.js

const cron = require('node-cron');
const nodemailer = require('nodemailer');

// Initialize Nodemailer transporter
const transporter = nodemailer.createTransport({
    // Configure your email server settings here
    // For example, SMTP or OAuth2 settings
});

// Define scheduled task to run daily
cron.schedule('0 0 * * *', async () => {
    try {
        // Logic to calculate latest note stats for each user
        // Fetch user data from the database and calculate stats

        // Example: Fetch users from database and send personalized notifications
        let users = await pool.query(`SELECT id, name, email
        FROM public._user;`).rows

        users.forEach(async (user) => {
            let getNotesCongrats = await pool.query(`SELECT toid, user_id, note_title, note_body, note_type_id, creation_datetime
            FROM public.note
            WHERE deleted = false
            AND user_id = $1 AND note_type_id = 1
            ;`,[user.id]).rows   
            let getNotesinvitations = await pool.query(`SELECT toid, user_id, note_title, note_body, note_type_id, creation_datetime
            FROM public.note
            WHERE deleted = false
            AND user_id = $1 AND note_type_id = 2
            ;`,[user.id]).rows                     
            const mailOptions = {
                from: 'your-email@example.com',
                to: user.email,
                subject: 'Your Latest Note Stats',
                text: `Dear ${user.name},\n\nYou got new ${getNotesCongrats.length} congrats notes, ${getNotesCongrats.length} invitations notes, etc.\n\nBest regards,\nYour Application`
            };

            await transporter.sendMail(mailOptions);
        });

        console.log('Scheduled task executed successfully.');
    } catch (error) {
        console.error('Error executing scheduled task:', error);
    }
});
