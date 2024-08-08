
// set up

import nodemailer from "nodemailer";
import http from "http"
import fs from "fs/promises"
import url from "url";
import path from "path";

const PORT = process.env.PORT

const __filename = url.fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
console.log(__filename, __dirname)


// middlewares

const mailSender = (req, res, next) => {
  console.log(`${req.method} ${req.url}`)
  next()
}

// other

const routeHandler = async function(req, res){
  if (req.method === 'GET'){
    let filePath
    if (req.url === '/'){
      filePath = path.join(__dirname, 'index.html')
    }
    else if (req.url === '/about'){
      filePath = path.join(__dirname, 'about.html')
    }
    else if (req.url === '/send'){
      await sendEmail()
    }
    else{
      throw new Error('Not Found')
    }

    const data = await fs.readFile(filePath);
    res.setHeader('Content-Type', 'text/html')
    res.write(data)
    res.end()
  }
  
  else {
    throw new Error('Method not allowed')
  }
}

async function sendEmail() {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com", 
    port: 465, 
    secure: true,
    auth: {
      user: "borzovmisa172@gmail.com",
      pass: "lfdh hkay efcp rigr", 
    },
    tls: {
        rejectUnauthorized: false,
      },
  });
  
  let info = await transporter.sendMail({
    from: '"You" borzovmisa172@gmail.com',
    to: "olonichevy@gmail.com",
    subject: "Testing, testing, 123",
    html: `
    <h1>Hello there</h1>
    <p>Isn't NodeMailer useful?</p>
    `,
  });

  console.log(info.messageId);
}

// run server

const server = http.createServer((req, res) => {
  try{
    routeHandler(req, res)
    // mailSender(req, res, ()=>{
    //   mailStatusRender(req, res)
    // })
  }
  catch (error) {
    // to do
  }
});



server.listen(PORT, () => {
  console.log(`Server running at ${PORT}`);
});
