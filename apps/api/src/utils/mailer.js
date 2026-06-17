const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    },
    // debug: true,
    // logger: true
})

if (process.env.NODE_ENV !== 'production') {
    transporter.verify((error, success) => {
        if (error) {
            console.error('Mail error:', error)
        } else {
            console.log('Mail server klaar ✅')
        }
    })
}

module.exports = { transporter };