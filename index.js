import express from 'express';


const porta = 3000;
const host = '0.0.0.0';

const app = express();

//indicando para a aplicação como servir arquivos estaticos localizados na pasta 'paginas'
app.use(express.static('./paginas'));

app.get('/', (requisicao, resposta) => {
    resposta.end(`
            <!DOCTYPE html>
                <html lang="pt-br">
            <head>
                <title>Cadastro</title>
            </head>
            <body>
                <h1>MENU</h1>
                <ul>
                    <li><a href="/cadastraUsuario.html">Cadastrar usuario</a><li>
                </ul>
            </body>
            </html>
    `)
})

app.listen(porta, host, () => {
    console.log(`Servidor executando na url http://${host}:${porta}`);
});


