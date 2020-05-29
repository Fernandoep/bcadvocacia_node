const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');

let app = express();

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());


var transporter = nodemailer.createTransport({
    host: 'smtp.hostinger.com.br',
    port: 587,
    secure: false,
    auth: {
        user: 'site@bcadvocacia.com',
        pass: 'paranhos2020'
   }
});




app.get('/', (req, res) => res.send('servidor rodando'));

app.post('/login', function (req, res) {
    console.log('Body ===>', req.body);
    var mailOptions = {
        from: 'site@bcadvocacia.com',
        to: 'bruna.carvalho@bcadvocacia.com',
        subject: 'Contato BCADVOCACIA',
        text: ` Telefone: ${req.body.telefone}\n Mensagem: ${req.body.conteudo}\n E-mail: ${req.body.email}`
    }
    transporter.sendMail(mailOptions, function(err, info){
        if(err){
            res.send(err);
        }else{
            res.send('Mensagem enviada com sucesso');
       
        }
    });

})

let port = process.env.PORT || 5000 ;
app.listen(port, () => console.log('servidor rodando'));