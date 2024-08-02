import sgMail from "@sendgrid/mail"
import mailConfig from '../config/mail'
import { prisma } from "../util/prisma.util";
import { DepositRepositoryPrisma } from "../repositories/deposit/prisma/deposit.repository.prisma";
import { DepositServiceImplementation } from "../services/deposit/implementation/deposit.service.implementation";
import { numberFormatterBRL } from "../util/numberFormatter.util";

export default {
    key: 'RegistrationMail',
    async handle(data: any) {
        sgMail.setApiKey(mailConfig.apiKey ?? "")
        const { amount, email, id } = data.data;

        const msg = {
            to: email,
            from: mailConfig.mailHost ?? "",
            subject: 'Seu depósito foi processado com sucesso!',
            text: 'Você depositou com sucesso ' + numberFormatterBRL(amount) + ' reais.'
        }
        sgMail
            .send(msg)
            .then(() => {
                const aRepository = DepositRepositoryPrisma.build(prisma);
                const aService = DepositServiceImplementation.build(aRepository);

                aService.updateEmailSentStatus(id);
            })
         
        .catch((error) => {
            console.error(error)
            console.error(error.response.body)
        })
    },
    options: {
        delay: 1000,
    },
}