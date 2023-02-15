import authRouter from './modules/auth/auth.router.js';
import userRouter from './modules/user/user.router.js'
import commentRouter from './modules/comment/comment.router.js';
import mongoose from 'mongoose';
import connectionDb from '../DB/connection.js';



const initApp = (app, express) => {

    app.use(express.json({}))
    mongoose.set('strictQuery', false)
    connectionDb()
    app.get('/', (req, res) => res.send('Hello World!'))

    app.use('/auth', authRouter)
    app.use('/user', userRouter)
    app.use('/comment', commentRouter)

    app.use("*" , (req,res)=>{
        return res.json({message:"404 Page Not Found"})
    })

}


export default initApp