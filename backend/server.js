import express from 'express';
import cors from 'cors';
import surveyData from './questions.js';
import fs from 'fs';

// TODO: need to add nodemon

const app = express();
const port = process.env.PORT || 5000;

app.use(cors())

app.listen(port, () => {
    console.log(`Server at http://localhost:${port}`)
});


app.get('/', (req, res) => {
    res.send('Server is ready');
});



app.post('/getsurveydata', (req, res) => {

    if (req.query.answer !== undefined) {
        let answer = JSON.parse(req.query.answer);
        saveFile(answer);
        res.send(getNextQuestion(answer));
    } else {
        res.send(getNextQuestion());
    }
});



/* We can save following code to another file */

const saveFile = (obj) => {

    let data = JSON.stringify(obj, null, 2);
    /* May be instead of time we may use userid or ipaddress or some unique token */
    let filename = new Date().getTime().toString();
    fs.writeFileSync(`./public/${filename}.json`, data);
}


// May not be best logic to handle this situation
const getNextQuestion = (answer) => {
    let quest = ''

    if (answer === undefined) {
        quest = 'page1'
    } else {
        surveyData.pages.forEach(page => {
            if (page.conditions !== undefined) {
                page.conditions.forEach(condition => {
                    switch(condition.test) {
                        case 'lessthan':
                            if (condition.value > parseInt(answer.answer)) {
                                quest = page.id;
                            }
                            break;
                        case 'greaterthan':
                            if (condition.value < parseInt(answer.answer)) {
                                quest = page.id;
                            }
                            break;
                    }
                })
            }
        });
    }

    if (isLastQuestion(answer?.questionName)) {
        return surveyData.thank_you_text;
    }

    return surveyData.pages.find(page => page.id === quest )
}

// May not be best logic to handle this situation
const isLastQuestion = (lastQuestion) => {
    return (lastQuestion === 'question1' || lastQuestion === 'question2')
}