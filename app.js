const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');

// Connexion à MongoDB

async function connectDatabase() {
    try {
    await
    mongoose.connect(process.env.MONGO_URL);    
        console.log('Connexion à MongoDB réussie !');
    } catch (error) {
        console.error('Erreur de connexion à la base de données :', error);
    }
  }
  connectDatabase();


const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);

app.get('/api/user', (req, res) => {
    res.send('bonjour');
  });


module.exports = app;


// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));




// const express = require("express");
// const app = express();
// const mongoose = require("mongoose");
// const dotenv = require("dotenv");
// const helmet = require("helmet"); 

// dotenv.config();

// const authRoutes = require('./routes/authRoutes');
// // const postRoute = require("./routes/posts");

// const postRoutes = require('./routes/postRoutes')
// const userRoutes = require('./routes/userRoutes')


// async function connectDatabase() {
//     try {
//     await
//     mongoose.connect(process.env.MONGO_URL);    
//         console.log('Connexion à MongoDB réussie !');
//     } catch (error) {
//         console.error('Erreur de connexion à la base de données :', error);
//     }
//   }
//   connectDatabase();


//   //middleware
// app.use(express.json());
// app.use(helmet());


// app.use("/api/auth", authRoute);
// app.use('/api/user', userRoutes)
// app.use('/api/post', postRoutes)

// // app.use("/api/posts", postRoute);




