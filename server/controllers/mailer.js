import nodemailer from 'nodemailer';
import Mailgen from 'mailgen';
import ENV from '../config.js';

export default async function registerMail(req, res) {

    const { userEmail, username, text, subject } = req.body;

    let config = {
        service : 'gmail',
        auth : {
            user: ENV.EMAIL,
            pass: ENV.PASSWORD
        }
    }

    let transporter = nodemailer.createTransport(config);

    let mailGenerator = new Mailgen({

        theme: "default",
        product: {
            name: "Flyavionic",
            link: "https://flyavionic.com/"
        }
    })

    let response  = {
        body: {
            name : username,
            intro:  "Welcome to Login App! We are Excited to Serve Best Content ",
            outro: text || "Need help and Have any Question Feel free to ASK with us!"
        }
    }

    let mail = mailGenerator.generate(response);

    let message = {
        from: ENV.EMAIL,
        to: userEmail,
        subject: subject || "Signup Successfull",
        html: mail
    }

    const mailSend = transporter.sendMail(message);
    
    if (mailSend) {
        return res.status(200).json({
            msg : "You Should Receive an Email"
        }); 
    }else{
        return res.status(500).json({error})
    }

    }