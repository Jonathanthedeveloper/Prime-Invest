const nodemailer = require('nodemailer');
const ejs = require('ejs')
const { convert } = require('html-to-text')

class Email {

  constructor(user, link) {
    this.to = user.email
    this.name = user.name
    this.link = link
  }

  async _createTransporter() {
    return nodemailer.createTransport({

      host: "bh-alpha.bergeservers.com",
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: "info@primefinanceltd.com",
        pass: "information123$",
      }
    })
  }


  async _send(template, subject) {
    const html = await ejs.renderFile(`${__dirname}/../views/emails/${template}.ejs`, { link: this.link })

    const mailOptions = {
      from: 'Prime Finance Limited <info@primefinanceltd.com>', // sender address
      to: this.to,
      subject: subject,
      html,
      text: convert(html),
    }

    const transporter = await this._createTransporter()
    transporter.sendMail(mailOptions)
  }

  async sendWelcome() {
    await this._send("welcome", "Welcome to Prime Finance Limited")
  }
  async sendDeposit() {
    await this._send("deposit", "Welcome to Prime Finance Limited")
  }
  async sendInvestment() {
    await this._send("investment", "Welcome to Prime Finance Limited")
  }
  async sendWithdrawal() {
    await this._send("withdrawal", "Welcome to Prime Finance Limited")
  }
  async sendForgotPassword() {
    await this._send("forgotPassword", "Welcome to Prime Finance Limited")
  }


}



module.exports = Email