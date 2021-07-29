import nodemailer from 'nodemailer';
import { HandlebarsMailTemplate } from './HandlebarsMailTemplate';

interface IMailContact {
  name: string;
  email: string;
}

interface ITemplateVariable {
  [key: string]: string | number;
}

interface IParseMailTemplate {
  filePath: string;
  variables: ITemplateVariable;
}

interface ISendMail {
  from?: IMailContact;
  to: IMailContact;
  subject: string;
  templateData: IParseMailTemplate;
}

export class EtherealMail {
  static async sendMail({ from, to, subject, templateData }: ISendMail) {
    // Generate SMTP service account from ethereal.email
    const account = await nodemailer.createTestAccount();
    const handlebarsMailTemplate = new HandlebarsMailTemplate();

    const transporter = nodemailer.createTransport({
      host: account.smtp.host,
      port: account.smtp.port,
      secure: account.smtp.secure,
      auth: {
        user: account.user,
        pass: account.pass,
      },
    });

    let message = {
      from: {
        name: from?.name || 'Equipe API Vendas',
        address: from?.email || 'equipe@apivendas.com.br',
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject,
      html: await handlebarsMailTemplate.parse(templateData),
    };

    const response = await transporter.sendMail(message);
    console.log(`Message sent: ${response.messageId}`);
    console.log(`Preview URL: ${nodemailer.getTestMessageUrl(response)}`);
  }
}
