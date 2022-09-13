const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const studentModel = require('./models/students');
const app = express();
const port = process.env.PORT || 8080;
app.listen(port);

app.use(express.json());
app.use(cors());

const url = 'mongodb+srv://test103:test103@userdatabase.doye8.mongodb.net/UserDatabase?retryWrites=true&w=majority';
mongoose.connect(url, { useUnifiedTopology: true, useNewUrlParser: true }).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => { console.log(err) });


app.get('/', (req, res) => {
    studentModel.find((err, data) => {
        if (err) {
            res.send(err);
        } else {
            res.send(data);
        }
    });
});

app.post('/', (req, res) => {
    const student = new studentModel({
        name: req.body.name,
        email: req.body.email,
        standard: req.body.standard,
        gender: req.body.gender
    });

    student.save().then(data => {
        res.send(data);
    }).catch(e => {
        res.send(e);
    })
})

app.delete('/', (req, res)=>{
    studentModel.findByIdAndDelete(req.query.id , (err, data) => {
        if (err) {
            res.send(err);
        } else {
            res.send(data);
        }
    })
})

app.put('/', (req, res) => {
    studentModel.findOneAndUpdate({_id: req.body._id}, {name: req.body.name, email: req.body.email, standard: req.body.standard, gender: req.body.gender }, (err, data) => {
        if (err) {
            res.send(err);
        } else {
            res.send(data);
        }
    })
});