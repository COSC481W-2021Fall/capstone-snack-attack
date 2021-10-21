import crypto from "crypto"
import dotenv from "dotenv"

dotenv.config()

export default class PasswordEncryption {
    static encryptPassword(password) {
        var algorithm = process.env.ENCRYPT_ALGORITHM
        var key = process.env.ENCRYPT_KEY

        var cipher = crypto.createCipher(algorithm, Buffer.from(key))
        var encryptedPassword = cipher.update(password, 'utf8', 'hex') + cipher.final('hex')
        
        return encryptedPassword
    }

    static decryptPassword(password) {
        var algorithm = process.env.ENCRYPT_ALGORITHM
        var key = process.env.ENCRYPT_KEY

        var decipher = crypto.createDecipher(algorithm, Buffer.from(key))
        var decryptedPassword = decipher.update(password, 'hex', 'utf8') + decipher.final('utf8')
    
        return decryptedPassword
    }
}