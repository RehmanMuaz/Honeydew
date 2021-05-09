import { models } from '../services/databaseService';

// Get all tags as json
export const getCountries = async (req, res) => {    
    res.send(await models.country.findAll());
}

// Get specific country using ID
export const getCountryFromID = async (req, res) => {
    res.send(
		await models.country.findOne({
			where: {
				id: req.params.id,
			},
		})
	);
}

// Create a new country from json
export const createCountry = async (req, res) => {
    let tag = await models.country.create({
		name: req.body[0].name,
	});
    res.sendStatus(200);
}

export const createCountries = async (req, res) => {
    let i;
    for (i = 0; i < req.body.length; i++)
    {
        let tag = await models.country.create({
            name: req.body[i].name,
        });
    }
    res.sendStatus(200);
}

// Delete specific country using ID
export const deleteCountry = async (req, res) => {
    await models.country.destroy({
		where: { id: req.params.id },
	});
    res.sendStatus(200);
}

// Edit specific country using ID with json
export const editCountry = async (req, res) => {
    await models.country.findOne({
        where: {
            id: req.params.id,
        },
    }).then(function(instance) {
        instance.name = req.body[0].name;
        instance.save().then(function() {
          console.log('Country Edited');
        });
      });

    res.sendStatus(200);

}