const express = require('express');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const brandRoutes = require('./src/routes/brandRoutes');
const userRoutes = require('./src/routes/userRoutes')


const app = express();
const port = 3001;


app.use(express.json());


app.use('/api/v1/brands', brandRoutes);
app.use('/api/v1/users', userRoutes);

let refreshTokens = []

const posts = [
    {
        username: 'Kyle',
        title: 'Post 1'
    },
    {
        username: 'Jim',
        title: 'Post 2'
    }
]




app.get('/posts', authenticateToken, (req, res) => {
    res.json(posts.filter(post => post.username === req.user.name));
})
function authenticateToken(req, res,next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if(token == null) return res.sendStatus(401)

    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
        console.log(err)
        if(err) return res.sendStatus(403)
        req.user = user
       next()
    })

}

app.post('/token', (req, res) => {
    const refreshToken = req.body.token
    if (refreshToken == null) return res.sendStatus(401)
    if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403)
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)
        const accessToken = generateAccessToken({ name: user.name })
        res.json({ accessToken: accessToken })
    })
})

app.delete('/logout', (req, res) => {
    refreshTokens = refreshTokens.filter(token => token !== req.body.token)
    res.sendStatus(204)
})

app.post('/login', (req, res) => {
    // Authenticate User

    const username = req.body.username
    const user = { name: username }

    const accessToken = generateAccessToken(user)
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
    refreshTokens.push(refreshToken)
    const data = {
        accessToken: accessToken,
        refreshToken: refreshToken,
        expiresIn: '40s'
    }
    res.json({
        message: "Login Successful",
        status: 200,
        data: data

    })
})

function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '4h' })
}


app.listen(port, () => {
    console.log(`Server is listening on port ${port}...`);
});
