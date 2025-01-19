const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./config/db'); 
const authRoutes = require('./routes/authRoutes'); 
const taskRoutes = require('./routes/taskRoutes'); 

dotenv.config();
const app = express();


db.connectDB()
    .then(() => {
        console.log('Подключение к базе данных успешно');
    })
    .catch((error) => {
        console.error('Ошибка подключения к базе данных:', error);
        process.exit(1);
    });

app.use(cors());
app.use(express.json());


app.use(helmet.contentSecurityPolicy({
    directives: {
        defaultSrc: ["'self'"], 
        imgSrc: ["'self'", "https://yastatic.net", "data:"], 
        
    },
}));


app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});