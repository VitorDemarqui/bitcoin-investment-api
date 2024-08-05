import sgMail from "@sendgrid/mail"
import mailConfig from '../config/mail'

export default {
    key: 'RegistrationMail',
    async handle(data: any) {
        sgMail.setApiKey(mailConfig.apiKey ?? "")
        const { email, id, subject, text } = data.data;

        const msg = {
            to: email,
            from: mailConfig.mailHost ?? "",
            subject,
            text
        }
        sgMail
        .send(msg)
        .catch((error) => {
            console.error(error)
            console.error(error.response.body)
        })
    },
    options: {
        delay: 1000,
    },
}