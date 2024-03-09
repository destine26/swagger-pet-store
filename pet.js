const { spec } = require('pactum');
const fs = require('fs');

describe('Add a new pet to the store', () => {
  it('should add a new pet with specified tags and status', async () => {
    await spec()
      .post('https://petstore.swagger.io/v2/pet')
      .withJson({
        id: 1,
        category: { id: 1, name: 'Dogs' },
        name: 'Dog',
        photoUrls: ['string'],
        tags: [{ id: 1, name: 'Dog' }],
        status: 'available'
      })
      .expectStatus(200)
      .expectResponseTime(3000)
      .expectBodyContains('Dog');
 });

  it('Create at least 4 pets with different tags & status', async () => {
    const pet1 = {
      id: 2,
      name: 'Cat',
      photoUrls: ['url1'],
      tags: [{ id: 2, name: 'Cat' }],
      status: 'available'
    };
    const pet2 = {
      id: 3,
      name: 'Rabbit',
      photoUrls: ['url2'],
      tags: [{ id: 3, name: 'Rabbit' }],
      status: 'available'
    };
    const pet3 = {
      id: 4,
      name: 'Dog',
      photoUrls: ['url3'],
      tags: [{ id: 4, name: 'Dog' }],
      status: 'pending'
    };
    const pet4 = {
      id: 5,
      name: 'Monkey',
      photoUrls: ['url4'],
      tags: [{ id: 5, name: 'Monkey' }],
      status: 'sold'
    };

    await Promise.all([
      spec()
        .post('https://petstore.swagger.io/v2/pet')
        .withJson(pet1)
        .expectStatus(200)
        .expectResponseTime(3000)
        .expectBodyContains('Cat'),
      spec()
        .post('https://petstore.swagger.io/v2/pet')
        .withJson(pet2)
        .expectStatus(200)
        .expectResponseTime(3000)
        .expectBodyContains('Rabbit'),
      spec()
        .post('https://petstore.swagger.io/v2/pet')
        .withJson(pet3)
        .expectStatus(200)
        .expectResponseTime(3000)
        .expectBodyContains('Dog'),
      spec()
        .post('https://petstore.swagger.io/v2/pet')
        .withJson(pet4)
        .expectStatus(200)
        .expectResponseTime(3000)
        .expectBodyContains('Monkey')
    ]);
  });

  it('should store the id of the new pet in a JSON file', async () => {
    const pet = {
      id: 6,
      name: 'Persian Cat',
      photoUrls: ['url5'],
      tags: [{ id: 6, name: 'Persian Cat' }],
      status: 'available'
    };

    const response = await spec()
      .post('https://petstore.swagger.io/v2/pet')
      .withJson(pet)
      .expectStatus(200)
      .expectResponseTime(3000)
      .expectBodyContains('Persian Cat');

    const petId = response.body.id;
    let petIds;
    try {
      petIds = JSON.parse(fs.readFileSync('petIds.json', 'utf-8'));
    } catch (err) {
      petIds = [];
    }

    petIds.push(petId);
    fs.writeFileSync('petIds.json', JSON.stringify(petIds, null, 2));
  });
  
  it('should update an existing pet', async () => {
    const updatedPet = {
      id: 1,
      name: 'Labrador Dog',
      photoUrls: ['url1'],
      tags: [{ id: 1, name: 'Labrador Dog' }],
      status: 'sold'
    };

    await spec()
      .put('https://petstore.swagger.io/v2/pet')
      .withJson(updatedPet)
      .expectStatus(200)
      .expectResponseTime(3000)
      .expectBodyContains('Dog');
  });

  it('should find pets by status', async () => {
    await spec()
      .get('https://petstore.swagger.io/v2/pet/findByStatus')
      .withQueryParams({ status: 'available' })
      .expectStatus(200)
      .expectResponseTime(3000)
      .expectBodyContains('Dog');
  });

  it('should find pets by tags', async () => {
    await spec()
      .get('https://petstore.swagger.io/v2/pet/findByTags')
      .withQueryParams({ tags: 'Dog' })
      .expectStatus(200)
      .expectResponseTime(3000)
      .expectBodyContains('Dog');
  });
});
