const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const config = require('./config/config');
// const pgClient = require('./pg-config');
const { sequelize, models, Sequelize } = require('./config/sequelize-config');
const helper = require('./services/helper');
const { isAuthorised, multerupload } = require('./middleware/middleware');
const { mailConfig, transporter } = require('./config/email-config');
const Op = Sequelize.Op;

// create application/json parser
const jsonParser = bodyParser.json();

// create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(jsonParser);
app.use(urlencodedParser);

app.use('/uploads', express.static(__dirname + '/uploads'));

app.post('/save-user', async function (req, res) {
    const usersCreate = await models.users.create({
        name: req.body.name,
        username: req.body.username,
        password: req.body.password,
    });

    res.json({
        usersCreate
    });
});

app.post('/test-mail', async function (req, res) {
    const options = {
        from: `sender<${mailConfig.email}>`,
        to: 'gopu@mindwaveventures.com',
        subject: 'test mail',
        // text: 'test content', // plain text body
        html: `<button>test mail ${otp} </button> <a href="${url}" target="_blank">View</a>`, // html body
    };

    transporter.sendMail(options, (error, info) => {
        if (error) console.log('\n mail error..', error);
        return console.log('\n success...', info);;
    });

    return res.json('sending mail');
});

app.post('/upload', multerupload('').single('file'), async function (req, res) {
    console.log('\n req.file...', req.file);
    return res.json({
        file: req.file
    });
});

app.patch('/update-user', async function (req, res) {
    const usersUpdate = await models.users.update({
        name: req.body.name
    }, {
        where: {
            uuid: req.body.userid
        },
        returning: true
    });

    return res.json({
        usersUpdate
    });
});

app.post('/login', async function (req, res) {
    try {
        const usersFind = await models.users.findOne({
            where: {
                username: req.body.username
            },
            logging: true,
        });

        const passwordMatch = await helper.comparePassword(req.body.password, usersFind.password);

        if (passwordMatch) {
            const payload = {
                uuid: usersFind.uuid,
                name: usersFind.name,
                username: usersFind.username,
            };
            const token = jwt.sign(payload, config.jwtSecret, { expiresIn: '1h' });
            return res.json({
                token
            });
        }
        return res.status(403).send('Not valid');

    } catch (error) {
        console.log('\n error...', error);
        return res.send(error);
    }
});

app.get('/get-account', isAuthorised, async function (req, res) {
    try {
        const usersFind = await models.users.findOne({
            attributes: ['name', 'username'],
            where: {
                uuid: req.query.userId || req.decoded.uuid
            },
            logging: true,
        });
        return res.json({
            usersFind
        });

    } catch (error) {
        console.log('\n error...', error);
        return res.send(error);
    }
});

app.get('/', isAuthorised, async function (req, res) {
    try {
        const usersFind = await models.users.findAndCountAll({
            attributes: ['name'],
            where: {
                name: {
                    [Op.iLike]: `%${req.query.name}`
                }
            },
            logging: true,
            include: [
                {
                    model: models.posts,
                    as: 'posts',
                    required: false,
                    where: {
                        content: {
                            [Op.not]: null
                        }
                    }
                }
            ]
        });
        return res.json({
            usersFind
        });

    } catch (error) {
        console.log('\n error...', error);
        return res.send(error);
    }
});

app.delete('/remove', async function (req, res) {
    const pgRes = await pgClient.query('DELETE from users where userid=$1 RETURNING userid', [req.query.userid]);

    res.json({
        rows: pgRes.rows,
        count: pgRes.rowCount,
    });
});

app.listen(config.port, config.host, () => {
    console.log(`Server running at http://${config.host}:${config.port}/`);
});