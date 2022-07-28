const { htmlToText } = require('html-to-text')
const nodemailer = require('nodemailer')
const pug = require('pug')
const path = require('path')

class Email{

    constructor( to ){
        this.to = to
        this.from = process.env.MAIL_FROM
    }

    // Connect to mail service
    newTransport(){ 
        if( process.env.NODE_ENV === 'production'){
            // Connect to SendGrid
            return nodemailer.createTransport({
                service: 'SendGrid',
                auth: {
                  user: 'apikey',
                  pass: process.env.SENDGRID_KEY
                }
            })
        }
        return nodemailer.createTransport({
            host: "smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: process.env.NM_AUTH_USER,
              pass: process.env.NM_AUTH_PASS
            }
        })
    }

    // Send email
    async send( template, subject, mailData ){
        // What mail should be send ?
        const html = pug.renderFile( 
            path.join( __dirname, '..', 'views', 'emails', `${template}.pug` ), 
            mailData
        )

        // How the mail should be send ? && What data should be send ?
        await this.newTransport().sendMail({
            from: this.from,
            to: this.to,
            subject,
            html,
            text: htmlToText( html )
        })
    }

    async sendWelcome( name ){
        await this.send( 
            'welcome', 
            'Welcome to our app', 
            { name } 
        )
    }

    async sendOrder( products ){
        await this.send( 
            'newOrder',
            'TQ for placing your order',
            { products }
        )
    }
}


module.exports = {
    Email
}