import * as sinon from 'sinon';
import * as chai from 'chai';
import * as jwt from 'jsonwebtoken';
import { finishedMatch, matchInProgress, matches, newMatch, token, invalidMatch } from './mock/match.mock';

// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import MatchModel from '../database/models/Match.model';
import ValidateMatch from '../middlewares/validateMatch';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;


describe('Testando as rotas de macthes', () => {
  /**
   * Exemplo do uso de stubs com tipos
   */

  let chaiHttpResponse: Response;

  it('Deve retornar um array de macthes', async () => {
      sinon.stub(MatchModel, 'findAll').resolves(matches as any)
      const {status, body} = await chai
      .request(app)
      .get("/matches");
  
    expect(status).to.be.equal(200);
    expect(body).to.be.deep.equal(matches)
  });


  it('Deve ser possível retornar apenas as partidas em andamento', async function () {
    sinon.stub(MatchModel, 'findAll').resolves(matchInProgress as any);

    const {status, body} = await chai
    .request(app)
    .get("/matches?inProgress=true")

    expect(status).to.be.equal(200)
    expect(body).to.be.deep.equal(matchInProgress)
  })


  it('Deve ser possível retornar apenas as partidas finalizadas', async function () {
    sinon.stub(MatchModel, 'findAll').resolves(finishedMatch as any);

    const {status, body} = await chai
    .request(app)
    .get("/matches?inProgress=false")

    expect(status).to.be.equal(200)
    expect(body).to.be.deep.equal(finishedMatch)
  })

  it('deve retornar um erro caso não tenha um token', async function () {
    const { status, body } = await chai
    .request(app)
    .post("/matches")
    .send(newMatch)

    expect(status).to.be.equal(401)
    expect(body).to.be.deep.equal({ message: 'Token not found' })
  })

  it('Não deve ser possível criar uma partida com times iguais', async function () { 
    sinon.stub(jwt, 'verify').resolves({ role: "admin"});
    sinon.stub(ValidateMatch, 'validateTeams').resolves(false)

    const { status, body } = await chai
    .request(app)
    .post("/matches")
    .set({'Authorization': `Bearer ${token}`})
    .send(invalidMatch)

    expect(status).to.be.equal(422)
    expect(body).to.be.deep.equal({ message: 'It is not possible to create a match with two equal teams' })
  })

  afterEach(sinon.restore);
})