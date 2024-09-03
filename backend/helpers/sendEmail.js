import nodemailer from "nodemailer";

const sendEmail = async (email,subject,text) => {
    try {
        const transporter = nodemailer.createTransport({
            host:'smtp.gmail.com',
            port:465,
            secure:true,
            auth:{
                user:process.env.USER,
                pass:process.env.PASS
            }
        })

        await transporter.sendMail({
            from:process.env.USER,
            to:email,
            subject:subject,
            html:text
        })

        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

export default sendEmail;