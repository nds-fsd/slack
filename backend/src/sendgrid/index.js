import dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()
import  sgMail  from '@sendgrid/mail'


 export const sendMailWelcome = () =>{
    const apiKey = process.env.SENDGRID_API_KEY;
    sgMail.setApiKey(apiKey);
    console.log(apiKey)
    let msg = {
      to: 'jcano@bloobirds.com',
      from:  'skuadlack@gmail.com',
     
      
      subject: 'This is the email\'s subject',
      text: 'and easy to do anywhere, even with Node.js',
      html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    };
    sgMail.send(msg)
    .then(() => {
      console.log('Email sent')
    })
    .catch((error) => {
      console.error(error)
    })
}
