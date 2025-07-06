// framework/smartalert/alertDispatcher.ts

import fs from 'fs';
import path from 'path';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config(); // Load .env

export class AlertDispatcher {
  static sendSummaryAlert(logDir: string) {
    console.log('[SmartAlert] Received call to sendSummaryAlert...');
    console.log(`[SmartAlert] Looking for logs in: ${logDir}`);
    const files = fs.readdirSync(logDir);
    const latestLog = files
      .filter((f) => f.endsWith('.log'))
      .map((f) => ({
        name: f,
        time: fs.statSync(path.join(logDir, f)).mtime.getTime(),
      }))
      .sort((a, b) => b.time - a.time)[0];

    if (!latestLog) {
      console.log('[SmartAlert] No logs found to analyze.');
      return;
    }

    const logPath = path.join(logDir, latestLog.name);
    const logContent = fs.readFileSync(logPath, 'utf8');

    const failed = logContent.includes('❌');
    const flaky = logContent.includes('❄️');

    const subject = failed
      ? '❌ FrostQA Test Run Failed'
      : flaky
      ? '⚠️ FrostQA Flaky Test Detected'
      : '✅ FrostQA All Tests Passed';

    const body = `
      <h2>${subject}</h2>
      <pre>${logContent}</pre>
    `;

    console.log('\n📢 [SmartAlert] Test Run Summary:');
    console.log(subject);

    if (failed || flaky) {
      this.sendEmail(subject, body);
    }
  }

  static async sendEmail(subject: string, htmlContent: string) {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    try {
      const info = await transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to: process.env.EMAIL_TO,
        subject,
        html: htmlContent,
      });

      console.log(`📧 Email sent: ${info.messageId}`);
    } catch (err) {
      console.error('❌ Failed to send email:', err);
    }
  }
}