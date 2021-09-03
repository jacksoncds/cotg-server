class Profile {
    constructor(provider, id, inGameName) {
        this.provider = provider;
        this.id = id;
        this.inGameName = inGameName;
        this.db = require('mongoose').connection;
    }

    get(){
        let self = this;
        return new Promise(function(resolve, reject){
            this.db.models.member.findOne(
                {
                    provider: self.provider,
                    providerId: self.id
                },
                "",
                function(err, member){
                    if (err) {
                        reject(err);
                    }

                    if (member.inGameName === inGameName) {
                        resolve(member);
                    } else {
                        resolve({
                            inGameName: member.inGameName,
                            joinOnDate: member.joinOnDate
                        });
                    }
                }
            );
        });
    }

    update(data){
        let self = this;
        return new Promise(function(resolve, reject){
            this.db.models.member.update(
                {
                    provider: self.provider,
                    providerId: self.id,
                },
                {
                    email: data.email
                },
                function(err, member){
                    if (err) {
                        reject(err);
                    }

                    resolve(member);
                }
            )
        });
    }
}

module.exports = Profile;