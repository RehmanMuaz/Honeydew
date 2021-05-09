import { models } from '../services/databaseService';

// Get all tags as json
export const getTags = async (req, res) => {    
    res.send(await models.tag.findAll());
}

// Get specific tag using ID
export const getTagFromID = async (req, res) => {
    res.send(
		await models.tag.findAll({
			where: {
				id: req.params.id,
			},
		})
	);
}

// Create a new tag from json
export const createTag = async (req, res) => {
    let tag = await models.tag.create({
		title: req.body[0].title,
		metaTitle: req.body[0].metaTitle,
		slug: req.body[0].slug,
		content: req.body[0].content,
	});
    res.sendStatus(200);
}

// Delete specific tag using ID
export const deleteTag = async (req, res) => {
    await models.tag.destroy({
		where: { id: req.params.id },
	});
    res.sendStatus(200);
}

// Edit specific tag using ID with json
export const editTag = async (req, res) => {
    await models.tag.findOne({
        where: {
            id: req.params.id,
        },
    }).then(function(instance) {
        instance.title = req.body[0].title;
        instance.metaTitle = req.body[0].metaTitle;
        instance.slug = req.body[0].slug;
        instance.content = req.body[0].content;
        instance.save().then(function() {
          console.log('Tag Edited');
        });
      });

    res.sendStatus(200);
}