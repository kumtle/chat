// 종속 모듈 불러오기
const express = require('express');
const bodyParser  = require('body-parser');
const { db } = require('./models/user');
const path = require('path');
// 설정
const port = process.env.PORT || 3000;

// 서버 생성
var app = express();

// Body Parser 미들웨어 사용
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

// API
app.get('/', (req, res, next) => {
    res.sendFile(path.resolve(path.join(__dirname + '/public'), 'login.html'));
});

app.post('/signup', (req, res, next) => {
    const { id, email, name, password, repassword } = req.body;

    if (password !== repassword) {
        return res.send('비밀번호가 일치하지 않습니다');
    }
    db.insert({
       id, 
       email, 
       name,
       password
    }, (err, doc) => {
        if (err) {
            return res.send('에러 발생');
        }
        return res.send(doc); 
    });
});

app.post('/login', (req, res, next) => {
    const { id, password } = req.body;
    
    db.findOne({ id }, (err, doc) => {
        if (err) {
            return res.send('에러발생');
        }
        if (doc) {
            if (password !== doc.password) {
                return res.send('비밀번호가 일치하지 않습니다');
            }
            else {
                return res.send('로그인 성공');
            }
        }
        else {
            return res.send('등록 되지 않은 아이디 입니다');
        }
    })
});

// 서버 실행
app.listen(port, () => {
    console.log(`Express server is running on port ${port}`);
});
