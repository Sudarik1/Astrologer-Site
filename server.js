
// set up

import nodemailer from "nodemailer";
import http from "http"
import fs from "fs/promises"
import url from "url";
import path from "path";

import connectDB from "./controler/db.js";

import Comment from "./model/commentModel.js";

connectDB()

const PORT = process.env.PORT

const __filename = url.fileURLToPath(import.meta.url)
const __controlerDirname = path.dirname(__filename)
const __rootDirname = __controlerDirname
console.log(__filename, __controlerDirname, __rootDirname)



// middlewares

const postRequestHandler = async(req, res, next) => {
  if (req.method === 'POST'){
    req.body = await getRequestBody(req)
    console.log(req.body)
    next()
  }
  else{
    next()
  }
}

// router

const routeHandler = async function(req, res){

  console.log('Requested URL:', req.url)

  if (req.method === 'GET'){
    let filePath
    let contentType

    if (req.url === '/' || req.url === '/index' || req.url === '/index.html'){
      filePath = path.join(__rootDirname, 'view', 'html', 'index.html')
      contentType = 'text/html'
    }
    else if (req.url === '/about' || req.url === '/about.html'){
      filePath = path.join(__rootDirname, 'view', 'html', 'about.html')
      contentType = 'text/html'
    }
    else if (req.url === '/birthday-map' || req.url === '/birthday-map.html'){
      filePath = path.join(__rootDirname, 'view', 'html', 'birthday-map.html')
      contentType = 'text/html'
    }
    else if (req.url === '/election' || req.url === '/election.html'){
      filePath = path.join(__rootDirname, 'view', 'html', 'election.html')
      contentType = 'text/html'
    }
    else if (req.url === '/guest-room' || req.url === '/guest-room.html'){
      filePath = path.join(__rootDirname, 'view', 'html', 'guest-room.html')
      contentType = 'text/html'
    }
    else if (req.url === '/harary' || req.url === '/harary.html'){
      filePath = path.join(__rootDirname, 'view', 'html', 'harary.html')
      contentType = 'text/html'
    }
    else if (req.url === '/karma' || req.url === '/karma.html'){
      filePath = path.join(__rootDirname, 'view', 'html', 'karma.html')
      contentType = 'text/html'
    }
    else if (req.url === '/medical' || req.url === '/medical.html'){
      filePath = path.join(__rootDirname, 'view', 'html', 'medical.html')
      contentType = 'text/html'
    }
    else if (req.url === '/notes' || req.url === '/notes.html'){
      filePath = path.join(__rootDirname, 'view', 'html', 'notes.html')
      contentType = 'text/html'
    }
    else if (req.url === '/poetry' || req.url === '/poetry.html'){
      filePath = path.join(__rootDirname, 'view', 'html', 'poetry.html')
      contentType = 'text/html'
    }
    else if (req.url === '/prediction' || req.url === '/prediction.html'){
      filePath = path.join(__rootDirname, 'view', 'html', 'prediction.html')
      contentType = 'text/html'
    }
    else if (req.url === '/profession' || req.url === '/profession.html'){
      filePath = path.join(__rootDirname, 'view', 'html', 'profession.html')
      contentType = 'text/html'
    }
    else if (req.url === '/rectification' || req.url === '/rectification.html'){
      filePath = path.join(__rootDirname, 'view', 'html', 'rectification.html')
      contentType = 'text/html'
    }
    else if (req.url === '/reference' || req.url === '/reference.html'){
      filePath = path.join(__rootDirname, 'view', 'html', 'reference.html')
      contentType = 'text/html'
    }
    else if (req.url === '/relationship' || req.url === '/relationship.html'){
      filePath = path.join(__rootDirname, 'view', 'html', 'relationship.html')
      contentType = 'text/html'
    }
    else if (req.url === '/relocate' || req.url === '/relocate.html'){
      filePath = path.join(__rootDirname, 'view', 'html', 'relocate.html')
      contentType = 'text/html'
    }
    else if (req.url.endsWith('.css')) {
      filePath = path.join(__rootDirname, 'view', 'css', req.url);
      contentType = 'text/css';
    }
    else if (req.url === '/index.js' || req.url === '/about.js' || req.url === '/notes.js' || req.url === '/guestRoomView.js'){
      filePath = path.join(__rootDirname, 'view', 'js', req.url)
      contentType = 'application/javascript'
    }
    else if (req.url.endsWith('/db.js')){
      filePath = path.join(__rootDirname, 'controler', 'db.js')
      contentType = 'application/javascript'
    }
    else if (req.url.endsWith('/noteControler.js')){
      filePath = path.join(__rootDirname, 'controler', 'noteControler.js')
      contentType = 'application/javascript'
    }
    else if (req.url.endsWith('/commentControler.js')){
      filePath = path.join(__rootDirname, 'controler', 'commentControler.js')
      contentType = 'application/javascript'
    }
    else if (req.url.endsWith('/applicatonModel.js')){
      filePath = path.join(__rootDirname, 'model', 'applicatonModel.js')
      contentType = 'application/javascript'
    }
    else if (req.url.endsWith('/noteModel.js')){
      filePath = path.join(__rootDirname, 'model', 'noteModel.js')
      contentType = 'application/javascript'
    }
    else if (req.url.endsWith('/commentModel.js')){
      filePath = path.join(__rootDirname, 'model', 'commentModel.js')
      contentType = 'application/javascript'
    }
    else if (req.url.endsWith('.jpg') || req.url.endsWith('.jpeg')) {
      filePath = path.join(__rootDirname, req.url);
      contentType = 'image/jpeg';
    }
    else if (req.url.endsWith('.png')) {
      filePath = path.join(__rootDirname, req.url);
      contentType = 'image/png';
    }
    else if (req.url.endsWith('.ico')){
      filePath = path.join(__rootDirname, req.url);
      contentType = 'image/x-icon'
    }
    else if (req.url.endsWith('.mp3')) {
      filePath = path.join(__rootDirname, req.url);
      contentType = 'audio/mpeg';
    }
    else if (req.url === '/sendMail'){
      await sendEmail()
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ message: "Email sent successfully!" }))
    }
    else if (req.url === '/fetchComments'){
      try {
        const comments = await Comment.find();
        if (comments.length === 0) {
          res.writeHead(200, { 'Content-Type': 'application/json' })
          res.end(JSON.stringify({ message: 'There are no comments.' }))
        } else {
          res.writeHead(200, { 'Content-Type': 'application/json' })
          res.end(JSON.stringify(comments))
        }
      } catch (error) {
        res.writeHead(500, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ message: "Failed to fetch comments"}))
      }
    }

    else{
      console.log('Resolved file path:', filePath);
    }

    if (req.url !=='/sentMail' && req.url !=='/fetchComments'){
      const data = await fs.readFile(filePath);
      res.setHeader('Content-Type', contentType )
      res.write(data)
      res.end()
    }
  }
  else if (req.method === 'POST'){
    if (req.url === '/createComment'){
      try{
        console.log(req.body)
        const { name, comment} = req.body 
  
        const newComment = await Comment.create({
        name: name,
        body: comment,
        })
        console.log('New comment sucessfully created')
      }
      catch (error) {
        res.writeHead(500, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ message: "Failed to create comment"}))
      }
    }
    else{
      console.log('POST method detected. During handling problems occured')
    }
  }  
  
  else {
    console.log('Method not allowed')
  }
}



// functionality

const getRequestBody = (req) => {
  return new Promise((resolve, reject) => {
    const chunks = [];

    req.on('data', (chunk) => {
      chunks.push(chunk);
    });

    req.on('end', () => {
      try {
        const data = Buffer.concat(chunks);
        const stringData = data.toString();
        const bodyJSON = JSON.parse(stringData);
        resolve(bodyJSON); // Successfully parsed data
      } catch (error) {
        reject(error); // Parsing error
      }
    });

    req.on('error', (err) => {
      reject(err); // General error
    });
  });
};

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
      postRequestHandler(req, res, ()=> {
        routeHandler(req, res)
      })
  }
  catch (error) {
    console.log(`Server error ${error}`)
  }
});



server.listen(PORT, () => {
  console.log(`Server running at ${PORT}`);
});
