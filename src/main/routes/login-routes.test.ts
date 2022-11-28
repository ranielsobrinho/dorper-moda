import { Collection } from 'mongodb'
import { hash } from 'bcrypt'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import request from 'supertest'
import app from '../config/app'

let accountCollection: Collection
describe('Login Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL as string)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    accountCollection = MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('POST /singup', () => {
    test('Should return 200 on success', async () => {
      await request(app)
        .post('/api/signup')
        .send({
          username: 'raniel_sobrinho',
          password: '123456789',
          isAdmin: false
        })
        .expect(200)
    })

    test('Should return 400 if username already exists', async () => {
      await accountCollection.insertOne({
        username: 'any_name',
        password: 'hashed_password',
        isAdmin: false
      })
      await request(app)
        .post('/api/signup')
        .send({
          username: 'any_name',
          password: '123456789',
          isAdmin: false
        })
        .expect(400)
    })
  })

  describe('POST /login', () => {
    test('Should return 200 on success', async () => {
      const password = await hash('123456789', 12)
      await accountCollection.insertOne({
        username: 'raniel_sobrinho',
        password
      })
      await request(app)
        .post('/api/login')
        .send({
          username: 'raniel_sobrinho',
          password: '123456789'
        })
        .expect(200)
    })

    test('Should return 401 if invalid credentials are provided', async () => {
      await request(app)
        .post('/api/login')
        .send({
          username: 'raniel_sobrinho',
          password: '123456789'
        })
        .expect(401)
    })
  })
})
