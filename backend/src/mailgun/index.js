import mailgun from "mailgun-js";
import dotenv from 'dotenv';
dotenv.config();

export const sendMailWelcome = (user,email) =>{
const api_key= process.env.MAILGUN_KEY;
const DOMAIN = 'sandboxcf5e9f4bcb834a2d9bfdb93a027a4193.mailgun.org';
const mg = mailgun({apiKey: api_key, domain: DOMAIN});
const data = {
	from: '🐌 SKUADLACK 🐌 skuadlack@gmail.com',
	to: email,
	subject: 'Hello WELCOME',
	template: "welcome",
	'h:X-Mailgun-Variables':JSON.stringify( {
        first_name: user,
        Weblink: 'https://skuadlack.netlify.app',
        Sender_Name: 'SkuadLack',
        Sender_Address: 'Barcelona',
        Sender_City: 'Catalunya',
        Sender_State: 'España'
      })
};
mg.messages().send(data, function (error, body) {
	
	

});
}; 