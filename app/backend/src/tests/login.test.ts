import * as sinon from 'sinon';
import * as chai from 'chai';
import Validations from '../middlewares/validationLogin';

// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import UserModel from '../database/models/User.model';
import * as JWT from 'jsonwebtoken'
import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;


describe('Testando as rotas de login', () => {
  let chaiHttpResponse: Response;

  beforeEach(function () { sinon.restore(); });

  it('Espera que retorne um erro ao enviar um body sem email', async function () {
    const body = {
      email: '',
      password: 'secret_admin',
    }

    const response = await chai.request(app).post('/login').send(body);

     expect(response.status).to.be.equal(400);
     expect(response.body).to.be.eql({message: 'All fields must be filled'});
   })

   it('Espera que retorne um erro ao enviar um body sem password', async function () {
    const body = {
      email: 'admin@admin.com',
      password: '',
    }

    const response = await chai.request(app).post('/login').send(body);

     expect(response.status).to.be.equal(400);
     expect(response.body).to.be.eql({message: 'All fields must be filled'});
   })

  it('Espera que retorne um erro ao enviar email inválido', async function () {
    const body = {
      email: 'jessica.email',
      password: 'secret_admin',
    }

    const user = {
      username: 'Admin',
      role: 'admin',
      email: 'admin@admin.com',
      password: 'secret_admin',
    }

    const mockFindOneReturn = UserModel.build(user)

    sinon.stub(UserModel, 'findOne').resolves(null);

    const response = await chai.request(app).post('/login').send(body);

     expect(response.status).to.be.equal(401);
     expect(response.body).to.be.deep.equal({message: 'Invalid email or password'});
   })

   it('ao receber um username e uma senha válida, retorne um token de login', async function () {
    const user = {
      id: 1,
      username: 'Admin',
      role: 'admin',
      email: 'admin@admin.com',
      password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
    }

    const body = {
      email: 'admin@admin.com', 
      password: 'secret_admin',
    }

    const mockFindOneReturn = UserModel.build(user);
    sinon.stub(JWT, 'sign').resolves('any-token');
    sinon.stub(UserModel, 'findOne').resolves(mockFindOneReturn);
    sinon.stub(Validations, 'validateLogin').returns(undefined);

    const httpResponse = await chai.request(app).post('/login').send(body);

    expect(httpResponse.status).to.be.equal(200);
    expect(httpResponse.body).to.be.key('token');
  });
})