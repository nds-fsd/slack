import dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()
import  sgMail  from '@sendgrid/mail'



 export const sendMailWelcome = (email,user) =>{
    const apiKey = process.env.SENDGRID_API_KEY;
    sgMail.setApiKey(apiKey);
    console.log(apiKey)
    let msg = {
      to: email,
      from: {
        email: 'skuadlack@gmail.com',
        name: 'SkuadLack'
      },      
      subject: 'This is the email\'s subject',
      templateId: 'd-87ca6d64dc1a4ed48224d8632e408d61',
      dynamicTemplateData: {
        first_name: user,
        Weblink: 'https://skuadlack.netlify.app',
        Sender_Name: 'SkuadLack',
        Sender_Address: 'Barcelona',
        Sender_City: 'Catalunya',
        Sender_State: 'España'
      }
    };
    sgMail.send(msg)
    .then(() => {
      console.log('Email sent')
    })
    .catch((error) => {
      console.error(error)
    })
}
