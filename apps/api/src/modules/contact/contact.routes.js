const express = require('express');
const escape = require('escape-html');
const { transporter } = require('../../utils/mailer.js');

module.exports = function (app) {

    app.post('/api/contact', async (req, res) => {
        console.log('ROUTE HIT')

        try {

            const { message, email } = req.body

            if (!email || !email.trim()) {
                return res.status(400).json({ message: 'E-mailadres is verplicht.' });
            }

            if (!message || !message.trim()) {
                return res.status(400).json({ message: 'Bericht is verplicht.' });
            }

            if (message.trim().length > 500) {
                return res.status(400).json({ message: 'Bericht mag niet langer zijn dan 500 tekens.' });
            }

            const safeMessage = escape(message.trim())
                .split('\n')
                .map(line => `<p>${line}</p>`)
                .join('')

            console.log('MAIL WORDT VERSTUURD')

            const mailResult = await transporter.sendMail({
                from: process.env.MAIL_USER,
                to: process.env.MAIL_RECIPIENT,
                replyTo: email,
                subject: 'Nieuw contactbericht via kerkhovenbeheer.nl',
                html: `<p><strong>Afzender:</strong> ${email}</p>
                       <p><strong>Bericht:</strong></p>
                       <p>${safeMessage}</p>`
            })
            console.log(mailResult)
            res.status(200).json({ message: 'Bericht succesvol verzonden!' })
        } catch (error) {
            console.error('Fout bij verzenden e-mail:', error);
            res.status(500).json({ message: 'Er is een fout opgetreden bij het verzenden van het bericht. Probeer het later opnieuw.' })

        }
    })
}
