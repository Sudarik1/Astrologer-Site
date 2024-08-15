
// set up

import nodemailer from "nodemailer";
import http from "http"
import fs from "fs/promises"
import url from "url";
import path from "path";

const PORT = process.env.PORT

const __filename = url.fileURLToPath(import.meta.url)
const __controlerDirname = path.dirname(__filename)
const __viewDirname = path.join(__controlerDirname, '..');
console.log(__filename, __controlerDirname, __viewDirname)

// other

const routeHandler = async function(req, res){
  console.log('Requested URL:', req.url);

  if (req.method === 'GET'){
    let filePath
    let contentType

    if (req.url === '/' || req.url === '/index' || req.url === '/index.html'){
      filePath = path.join(__viewDirname, 'view', 'html', 'index.html')
      contentType = 'text/html'
    }
    else if (req.url === '/about' || req.url === '/about.html'){
      filePath = path.join(__viewDirname, 'view', 'html', 'about.html')
      contentType = 'text/html'
    }
    else if (req.url === '/birthday-map' || req.url === '/birthday-map.html'){
      filePath = path.join(__viewDirname, 'view', 'html', 'birthday-map.html')
      contentType = 'text/html'
    }
    else if (req.url === '/election' || req.url === '/election.html'){
      filePath = path.join(__viewDirname, 'view', 'html', 'election.html')
      contentType = 'text/html'
    }
    else if (req.url === '/guest-room' || req.url === '/guest-room.html'){
      filePath = path.join(__viewDirname, 'view', 'html', 'guest-room.html')
      contentType = 'text/html'
    }
    else if (req.url === '/harary' || req.url === '/harary.html'){
      filePath = path.join(__viewDirname, 'view', 'html', 'harary.html')
      contentType = 'text/html'
    }
    else if (req.url === '/karma' || req.url === '/karma.html'){
      filePath = path.join(__viewDirname, 'view', 'html', 'karma.html')
      contentType = 'text/html'
    }
    else if (req.url === '/medical' || req.url === '/medical.html'){
      filePath = path.join(__viewDirname, 'view', 'html', 'medical.html')
      contentType = 'text/html'
    }
    else if (req.url === '/notes' || req.url === '/notes.html'){
      filePath = path.join(__viewDirname, 'view', 'html', 'notes.html')
      contentType = 'text/html'
    }
    else if (req.url === '/poetry' || req.url === '/poetry.html'){
      filePath = path.join(__viewDirname, 'view', 'html', 'poetry.html')
      contentType = 'text/html'
    }
    else if (req.url === '/prediction' || req.url === '/prediction.html'){
      filePath = path.join(__viewDirname, 'view', 'html', 'prediction.html')
      contentType = 'text/html'
    }
    else if (req.url === '/profession' || req.url === '/profession.html'){
      filePath = path.join(__viewDirname, 'view', 'html', 'profession.html')
      contentType = 'text/html'
    }
    else if (req.url === '/rectification' || req.url === '/rectification.html'){
      filePath = path.join(__viewDirname, 'view', 'html', 'rectification.html')
      contentType = 'text/html'
    }
    else if (req.url === '/reference' || req.url === '/reference.html'){
      filePath = path.join(__viewDirname, 'view', 'html', 'reference.html')
      contentType = 'text/html'
    }
    else if (req.url === '/relationship' || req.url === '/relationship.html'){
      filePath = path.join(__viewDirname, 'view', 'html', 'relationship.html')
      contentType = 'text/html'
    }
    else if (req.url === '/relocate' || req.url === '/relocate.html'){
      filePath = path.join(__viewDirname, 'view', 'html', 'relocate.html')
      contentType = 'text/html'
    }
    else if (req.url.endsWith('.html')){
      filePath = path.join(__viewDirname, 'view', 'html', req.url)
      contentType = 'text/html'
    }
    else if (req.url.endsWith('.css')) {
      filePath = path.join(__viewDirname, 'view', 'css', req.url);
      contentType = 'text/css';
    }
    else if (req.url.endsWith('.js')) {
      filePath = path.join(__viewDirname, 'view', 'js', req.url);
      contentType = 'application/javascript';
    }
    else if (req.url.endsWith('.jpg') || req.url.endsWith('.jpeg')) {
      filePath = path.join(__viewDirname, req.url);
      contentType = 'image/jpeg';
    }
    else if (req.url.endsWith('.png')) {
      filePath = path.join(__viewDirname, req.url);
      contentType = 'image/png';
    }
    else if (req.url = '/favicon.ico'){
      filePath = path.join(__viewDirname, 'assets', req.url);
      contentType = 'image/x-icon'
    }
    else if (req.url.endsWith('.mp3')) {
      filePath = path.join(__viewDirname, req.url);
      contentType = 'audio/mpeg';
    }
    else if (req.url === '/send'){
      await sendEmail()
    }
    else{
      console.log('Resolved file path:', filePath);
    }

    const data = await fs.readFile(filePath);
    res.setHeader('Content-Type', contentType )
    res.write(data)
    res.end()
  }
  
  else {
    console.log('Method not allowed')
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
  }
  catch (error) {
    console.log(`Server error ${error}`)
  }
});



server.listen(PORT, () => {
  console.log(`Server running at ${PORT}`);
});
