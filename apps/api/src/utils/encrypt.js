
const crypto = require('crypto');

const algorithm = 'aes-256-gcm';

const key = crypto
    .createHash('sha256')
    .update(process.env.IBAN_SECRET || 'super_secret_key')
    .digest();

function encryptIBAN(iban) {

    const iv = crypto.randomBytes(16);

    const cipher = crypto.createCipheriv(
        algorithm,
        key,
        iv
    );

    let encrypted =
        cipher.update(iban, 'utf8', 'hex');

    encrypted += cipher.final('hex');

    const tag =
        cipher.getAuthTag().toString('hex');

    return {

        iv: iv.toString('hex'),

        encrypted,

        tag

    };

}

function decryptIBAN(iv, encrypted, tag) {

    if (!iv || !encrypted || !tag) {
        return '';
    }

    const decipher = crypto.createDecipheriv(
        algorithm,
        key,
        Buffer.from(iv, 'hex')
    );

    decipher.setAuthTag(
        Buffer.from(tag, 'hex')
    );

    let decrypted =
        decipher.update(encrypted, 'hex', 'utf8');

    decrypted += decipher.final('utf8');

    return decrypted;

}

module.exports = {
    encryptIBAN,
    decryptIBAN
};
