const express = require('express')
const server = express()
const nunjucks = require('nunjucks')

const { pageLanding, pageStudy, pageGiveClass, saveClass } = require('./page.js')

// configuração do nunjucks
nunjucks.configure('src/view', {
    express: server,
    noCache: true,
})


// receber os dados do re.body
server.use(express.urlencoded({ extended: true }))

// configuração de arquivos estaticos (html, css, scripts, img )
server.use(express.static("public"))
    // rotas da aplicação
    .get("/", pageLanding)
    .get("/study", pageStudy)
    .get("/give-class", pageGiveClass)
    .post("/save-class", saveClass)

    .listen(5500)
