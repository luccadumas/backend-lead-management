import nodemailer from 'nodemailer';
import { Lead } from '../../domain/entities/Lead';
import fs from 'fs';
import path from 'path';

export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  async sendLeadAcceptedNotification(lead: Lead): Promise<void> {
    const mailOptions = {
      from: process.env.SMTP_USER,
      to: process.env.SALES_EMAIL,
      subject: 'New Lead Accepted',
      html: `
        <h1>New Lead Accepted</h1>
        <p>A new lead has been accepted:</p>
        <ul>
          <li>ID: ${lead.id}</li>
          <li>Name: ${lead.fullName}</li>
          <li>Category: ${lead.category}</li>
          <li>Price: $${lead.price}</li>
          <li>Description: ${lead.description}</li>
        </ul>
      `,
    };

    // Simulation: save the "email" as a .txt file
    try {
      const emailsDir = path.resolve(process.cwd(), 'emails');
      if (!fs.existsSync(emailsDir)) {
        fs.mkdirSync(emailsDir);
      }
      const fileName = `lead-accepted-${lead.id}-${Date.now()}.txt`;
      const filePath = path.join(emailsDir, fileName);
      const content = `To: ${mailOptions.to}\nSubject: ${mailOptions.subject}\n\n${mailOptions.html}`;
      fs.writeFileSync(filePath, content);
    } catch (error) {
      console.error('Falha ao simular envio de email:', error);
    }

    // To send to the real email, uncomment below:
    // try {
    //   await this.transporter.sendMail(mailOptions);
    // } catch (error) {
    //   console.error('Failed to send email:', error);
    // }
  }
} 