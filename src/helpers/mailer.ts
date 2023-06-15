import nodemailer, { TestAccount } from "nodemailer";

//   var mailOptions = {
//     from: 'youremail@gmail.com',
//     to: 'myfriend@yahoo.com',
//     subject: 'Sending Email using Node.js',
//     text: 'That was easy!'
//   };

async function sendMail(mailOptions: object) {
  return new Promise(async (resolve, reject) => {
    try {
      let acccount = await nodemailer.createTestAccount();
      var transporter = nodemailer.createTransport({
        service : 'gmail',
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASSWORD_EMAIL
        }
        
        // auth: {
        //   user: acccount.user, // generated ethereal user
        //   pass: acccount.pass, // generated ethereal password
        // },
      });
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          throw error;
        } else {
          console.log("Email sent: " + info.response);
          console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
          resolve("Email sent: " + info.response);
        }
      });
    } catch (error) {
      reject(error);
    }
  });
}

export = sendMail;
