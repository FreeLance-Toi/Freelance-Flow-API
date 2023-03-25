const axios = require("axios");

module.exports = (app) => {
    app.get('/api/v1/sirinfos/:sir', async (req, res) => {
        let sir = req.params.sir
        if(!sir)
            return res.status(400).send({error: 'Missing siret or siren'})
        sir = sir.replaceAll(' ', '')
        let siren = sir
        if (sir.length === 14) // SIREN
            siren = sir.substring(0, 9)
        axios.get(`https://data.siren-api.fr/v3/unites_legales/${siren}`).then((request) => {
            const data = request.data.unite_legale
            const siret = data.etablissement_siege.siret
            const firstNames = [data.prenom_usuel, data.prenom_2, data.prenom_3, data.prenom_4].filter((name) => name !== null)
            const lastName = data.nom
            const companyName = data.etablissement_siege.denomination_usuelle
            if (lastName === null)
                return null
            // Address
            const number = data.etablissement_siege.numero_voie
            const address = data.etablissement_siege.type_voie + ' ' + data.etablissement_siege.libelle_voie
            const complement = data.etablissement_siege.complement_adresse
            const zipCode = data.etablissement_siege.code_postal
            const city = data.etablissement_siege.libelle_commune
            // Country not provided by API
            const returnData = {
                facility_infos: {
                    siret,
                    firstNames,
                    lastName,
                    companyName,
                    address: {
                        number,
                        address,
                        complement,
                        city,
                        zipCode,
                        country: 'FRANCE'
                    }
                }
            }
            res.status(200).json(returnData)
        }).catch((error) => {
            res.status(400).json({error: 'SIREN not found'})
        });
    })
}