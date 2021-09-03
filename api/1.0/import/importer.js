class Importer {
    constructor(){
        
    }

    addImportDate(data){
        data.forEach(element => {
            element.importedDate = Date.now();
        });
    }
}

module.exports = Importer;