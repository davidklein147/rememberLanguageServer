const con = require("../utils/sql");

const axios = require('axios');
const url = `https://translation.googleapis.com/language/translate/v2/?key=`;
const key = process.env.GOOGLE_TRANSLATE_API_KEY;

let data; 
const googleTranslateHendler = async (body)=>{
}

const googleHendlar = () => {
    const translate = async (req, res) => {
        console.log("translate");
        if (req.body) {
            // googleTranslateHendler(req.body);
         try {
                // console.log(body)
                data = await axios.post(`${url}${key}`, req.body)
                console.log(data.data.data.translations[0].translatedText)
                return res.status(200).send(data.data)
            }
            catch (err) {
                console.log(err);
            }
        } else {
            return res.status(400).send("hello")
        }
    }

    return { translate }
}

module.exports = googleHendlar()