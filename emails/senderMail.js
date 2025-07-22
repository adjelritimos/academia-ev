const email = require('nodemailer')
require('dotenv/config')

module.exports = {

    enviarEmail: async (user) => {
        const transport = email.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSE
            }
        })

        transport.sendMail({
            from: `Academia Evangelistica <${process.env.EMAIL}>`,
            to: user.email,
            subject: 'Bem-vindo à Academia Evangelística!',
            html:
                `
           <body
    style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 20px; background-color: #ECF2F5;">
    <div
        style="max-width: 600px; margin: 0 auto; padding: 20px; background: #fff; border: 1px solid #ddd; border-radius: 8px;">
        <h2 style="color:#0dcaf0;">Bem-vindo(a) à Academia Evangelística!</h2>
        <p>Olá, <strong>${user.name}</strong>,</p>
        <p>Seja bem-vindo(a) ao Academia Evangelística! foste adicionado como um dos membro da academia de treinamento evangelístico. </p>
        <h3 style="color:#0dcaf0;">O que você precisa saber:</h3>
        <ul style="padding-left: 20px;">
            <li>
                <strong>Acesso:</strong> Você poderá acessar usando:
                <ul style="padding-left: 20px;">
                    <li style="color:#0dcaf0; text-decoration: none;">Nome de utilizador: ${user.username}</li>
                    <li style="text-decoration: none;">A sua palavra-passe é: ${user.password}</li>.
                </ul>
            </li>
            <li>
                <strong>Suporte:</strong> Para qualquer dúvida ou necessidade, nossa equipe está disponível através do e-mail<a href="mailto:academiaevangelistica@gmail.com"
                    style="color:#0dcaf0; text-decoration: none;">academiaevangelistica@gmail.com</a>
            </li>
        </ul>
        <p>Estamos aqui para apoiar você em sua jornada na <strong>academia Evangelística</strong> Seja muito bem-vindo(a) a uma nova jornada como soldado de Cristo, e a uma 
            nova experiência cristã.</p>
        <div style="text-align: center; margin: 20px 0;">
        </div>
        <p>Atenciosamente,</p>
        <p><strong>Academia Evangelística</strong></p>
    </div>
            </body>
            `
        })
            .then(() => { console.log("Email enviado com sucesso") })
            .catch((err) => { console.log("Erro ao enviar email: ", err) })
    }
}