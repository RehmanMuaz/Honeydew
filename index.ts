// ts errors fixed by removing
//	"type": "module", from package.json

import Express, { response } from 'express';
import Joi from 'joi';
import { models, sequelize } from './services/databaseService';

const app = Express();
const port = process.env.PORT || 3000;

app.use(Express.json());


const schema = Joi.object({
	title: Joi.string().alphanum().min(3).max(15).required(),
	metaTitle: Joi.string().alphanum().min(3).max(15).required(),
	slug: Joi.string().alphanum().min(3).max(15).required(),
	content: Joi.string().alphanum().min(3).max(15).required(),
});


app.get(`/`, async (req, res) => {response.send("Hello world")});

app.use('/auth/google', require("./routes/authRoute"));

app.get(`/user`, async (req, res) => {
	res.send(await models.user.findAll());
});

app.use(`/tag`, require("./routes/tagsRoute"));
app.use(`/country`, require("./routes/countryRoute"));

app.listen(port, () => console.log(`Listening on port: ${port}`));
