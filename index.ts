// ts errors fixed by removing
//	"type": "module", from package.json

import Express from 'express';
import Joi from 'joi';
import { models, sequelize } from './services/database';
import { CreateTag } from './services/tag_service';

const app = Express();
const port = process.env.PORT || 3000;

app.use(Express.json());

const schema = Joi.object({
	title: Joi.string().alphanum().min(3).max(15).required(),
	metaTitle: Joi.string().alphanum().min(3).max(15).required(),
	slug: Joi.string().alphanum().min(3).max(15).required(),
	content: Joi.string().alphanum().min(3).max(15).required(),
});

app.get(`/`, async (req, res) => {});

app.get(`/user`, async (req, res) => {
	res.send(await models.user.findAll());
});

app.get(`/tag`, async (req, res) => {
	res.send(await models.tag.findAll());
});

app.get(`/tag/:id`, async (req, res) => {
	res.send(
		await models.tag.findAll({
			where: {
				id: req.params.id,
			},
		})
	);
});

// Delete Tag
app.delete(`/tag/:id`, (req, res) => {});

// Create New Tag
app.post(`/tag`, async (req, res) => {
	CreateTag(req.body[0].title, req.body[0].metaTitle, req.body[0].slug, req.body[0].content);
	res.sendStatus(200);
});

app.listen(port, () => console.log(`Listening on port: ${port}`));
