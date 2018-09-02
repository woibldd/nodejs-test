const Koa = require("koa")
const Router = require("koa-router")
const static = require("koa-static")
const pug = require('pug')
let fs = require("fs")

const app = new Koa();
const router = new Router();

app.use(static(__dirname + '/static'))
// app.use((ctx) =>{
//     //ctx.body = "test";
//     console.log("test"); 
// })

router.get('/', async (ctx) => {
    console.log('1')
    let result = await new Promise((resolve, reject) => { 
        fs.readFile('./html/index.html','utf8', (err, data) => { 
            if(err){
                console.log('没找到')
                reject(err)
            }
            resolve(data)
        }) 
    });  
    ctx.body = result; 
})

router.get('/pug', ctx => {
    ctx.body = pug.renderFile('./pug/index.pug',{
        title: "这是一个神奇的网站"
    })
})




app.use(router.routes())
app.use(router.allowedMethods())
app.listen(3000)