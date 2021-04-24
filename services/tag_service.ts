import { sequelize, models } from './database';

async function CreateTag(title: string, metaTitle: string, slug: string, content: string) {
	let tag = await models.tag.create({
		title: title,
		metaTitle: metaTitle,
		slug: slug,
		content: content,
	});

	console.log('Created: ', tag);
}

async function DeleteTag(title: string) {
	await models.tag.destroy({
		where: { title: title },
	});
}

async function GetAllTags() {
	let tags = await models.tag.findAll();
	return tags;
}

export { CreateTag };
