const express = require('express');
const viewRouter = require('./routes/viewsRoutes')
const AppError = require('./utils/appError');
const cors = require('cors')
const path = require('path')
const dotenv = require('dotenv');
dotenv.config({path:'./config.env'})
const customErrorHandler = require('./controllers/errorController')






const app = express();
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));



const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running gracefully on port ${port}...`);
});



app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));


app.use(cors());



// Serving static files
app.use(express.static(path.join(__dirname, 'public')));



app.use(function (req, res, next) {
  res.setHeader(
    'Content-Security-Policy', "default-src 'self' * ;script-src 'self' *; frame-src 'self' *;connect-src 'self' *; worker-src 'self' blob: * ; font-src 'self' *; img-src 'self' data: *;style-src 'self' data: * 'sha256-yn0Wb1XhyC3LXpxWSUo+ag71PXN9SXk3+sAmp/2pUvk='"
  )
  next()
})





app.use('/', viewRouter);
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});


app.use(customErrorHandler)








// const io = require('socket.io')(server,{
//   cors:{
//     origin:'http://localhost:5000/'
//   }
// });

// io.on('connection', function(socket) {
//   console.log('user connected')
//     socket.on('chat message', (text) => {
  
//       async function main() {
//     const chatCompletion=await openai.chat.completions.create({
//       model:'gpt-3.5-turbo',
//       messages:[
//         {role:'user',context:'What is the captal of lagos'}
//       ]
//     })
//     console.log(chatCompletion)
//       }
         

// main()


     
//         //socket.emit('bot reply', aiText)
//     });
//   });
  
