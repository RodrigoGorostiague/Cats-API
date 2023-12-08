const { faker } = require('@faker-js/faker')
const boom = require('@hapi/boom');

class CatsService{

    constructor(){
        this.cats = [];
        this.generate(10);
    }

    generate(size){        
        for (let i = 0; i < size; i++) {
            this.cats.push({
                id: i,
                name: faker.animal.cat(),
                color: faker.color.cmyk( {format: 'css'} ),
                image: faker.image.urlLoremFlickr({ category: 'cats' })
            })
        }
    }

    async find(){
        return this.cats;
    }

    async findOne(catId){
        const cat = this.cats.find(cat => cat.id === parseInt(catId));
        if (!cat) {
            throw boom.notFound('Cat not found');
        }else{
            return cat;
        }
    }

    async create(cat){
        const newCat = {
            id: this.cats.length,
            ...cat
        }
        this.cats.push(newCat);
        return newCat;
    }

    async update(catId, catChange){
        const index = this.cats.findIndex(cat => cat.id === parseInt(catId));
        if (index === -1) {
            throw boom.notFound('Cat not found');
        }else{
            const cat = this.cats[index];
            this.cats[index] = {
                ...cat,
                ...catChange
            }
            return this.cats[index];
        }
    }

    async delete(catId){
        const index = this.cats.findIndex(cat => cat.id === parseInt(catId));
        if (index === -1) {
            throw boom.notFound('Cat not found');
        }else{
            this.cats.splice(index, 1);
            return { message: `Cat ${catId} deleted.` };
        }

    }

}

module.exports = CatsService;