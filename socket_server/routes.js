const Importer = new require('./import.js');

module.exports = function(path, client, data, options) {
    switch (path) {
        case 'import/military':
            // let importer = new Importer();
            // importer.military(client.member, data);
            try {
                client.connection.send(`Imported millitary for ${client.member.inGameName}.`);
                let importer = new Importer();
                importer.military(client.member.inGameName, data);
            } catch (error) {
                console.log(error);
            }
            break;
        case 'import/city':
            break;
        case 'import/player/ranking':
            break;
        case 'import/alliance/ranking':
            break;
        default:
            break;
    }
};

