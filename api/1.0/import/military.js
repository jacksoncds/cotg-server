const Importer = require('./importer.js');
const mongoose = require("mongoose");

class MilitaryImport extends Importer {
    constructor(data, member){
        super();
        if (!member) {
            throw new Error("member must exist before import data.");
        }
        this.member = member;
        this.data = data;
        // this.data = this.sanitize(this.data);
        this.addImportDate(this.data);
    }
    
    save(){
        let self = this;
        return new Promise(function(resolve, reject){
            mongoose.models.member.update({providerId: self.member}, {$push: {military: self.data}}, function(err, result){
                if (err) {
                    reject(err);
                }
    
                resolve(result);
            });
        });
    }
}

module.exports = MilitaryImport;