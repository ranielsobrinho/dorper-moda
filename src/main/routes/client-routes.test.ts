import { Collection } from 'mongodb'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import request from 'supertest'
import app from '../config/app'
import { sign } from 'jsonwebtoken'
import env from '../config/env'

const makeAccessToken = async (): Promise<string> => {
  const account = await accountCollection.insertOne({
    username: 'any_name',
    password: 'hashed_password',
    isAdmin: false
  })
  return sign(account.insertedId.toString(), env.jwtToken)
}

let clientsCollection: Collection
let accountCollection: Collection
describe('Sales Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL as string)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    clientsCollection = MongoHelper.getCollection('clients')
    accountCollection = MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
    await clientsCollection.deleteMany({})
  })

  describe('POST /clients', () => {
    test('Should return 204 on success', async () => {
      const accessToken = await makeAccessToken()
      await request(app)
        .post('/api/clients')
        .set('x-access-token', accessToken)
        .send({
          name: 'any_name',
          address: 'any_address',
          cpf: 'any_cpf',
          telephone: 'any_telephone',
          baseFee: 10
        })
        .expect(200)
    })

    test('Should return 400 if missing a required field', async () => {
      const accessToken = await makeAccessToken()
      await request(app)
        .post('/api/clients')
        .set('x-access-token', accessToken)
        .send({
          name: 'any_name',
          address: 'any_address',
          cpf: 'any_cpf',
          telephone: 'any_telephone'
        })
        .expect(400)
    })

    test('Should return 403 if is missing access token', async () => {
      await request(app)
        .post('/api/clients')
        .send({
          name: 'any_name',
          address: 'any_address',
          cpf: 'any_cpf',
          telephone: 'any_telephone',
          baseFee: 10
        })
        .expect(403)
    })

    test('Should return 400 if cpf is already taken', async () => {
      const accessToken = await makeAccessToken()
      await clientsCollection.insertOne({
        name: 'any_name',
        address: 'any_address',
        cpf: 'any_cpf',
        telephone: 'any_telephone',
        baseFee: 10
      })
      await request(app)
        .post('/api/clients')
        .set('x-access-token', accessToken)
        .send({
          name: 'any_name',
          address: 'any_address',
          cpf: 'any_cpf',
          telephone: 'any_telephone',
          baseFee: 10
        })
        .expect(400)
    })
  })

  describe('GET /clients', () => {
    test('Should return 200 on success', async () => {
      const accessToken = await makeAccessToken()
      await request(app)
        .get('/api/clients')
        .set('x-access-token', accessToken)
        .expect(200)
    })

    test('Should return 403 if is missing access token', async () => {
      await request(app).get('/api/clients').expect(403)
    })
  })

  describe('GET /clients/:cpf', () => {
    test('Should return 200 on success', async () => {
      const accessToken = await makeAccessToken()
      await clientsCollection.insertOne({
        name: 'any_name',
        address: 'any_address',
        cpf: 'any_cpf',
        telephone: 'any_telephone',
        baseFee: 10
      })
      await request(app)
        .get('/api/clients/any_cpf')
        .set('x-access-token', accessToken)
        .expect(200)
    })

    test('Should return 400 if wrong cpf is provided', async () => {
      const accessToken = await makeAccessToken()
      await request(app)
        .get('/api/clients/any_cpf')
        .set('x-access-token', accessToken)
        .expect(400)
    })

    test('Should return 403 if is missing access token', async () => {
      await request(app).get('/api/clients').expect(403)
    })
  })
})
