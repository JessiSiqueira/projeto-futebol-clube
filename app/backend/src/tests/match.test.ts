import * as sinon from 'sinon';
import * as chai from 'chai';
import * as jwt from 'jsonwebtoken';
import { 
  finishedMatch, 
  matchInProgress, 
  matches, 
  newMatch, 
  token, 
  invalidMatch, 
  validUpdateMatch,
} from './mock/match.mock';

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

  it('Deve ser possível criar uma partida com requisição POST para /matches', async function () {
    const match = {
      homeTeamId: 12,
      awayTeamId: 8,
      homeTeamGoals: 2,
      awayTeamGoals: 2
    }
    
    const validNewTeam = {
      id: 49,
      ...match,
      inProgress: true,
    }
    
    sinon.stub(jwt, 'verify').resolves({ role: "admin"});
    const newTeam = MatchModel.build(validNewTeam);
    sinon.stub(MatchModel, 'create').resolves(newTeam);

    const { status, body } = await chai
    .request(app)
    .post("/matches")
    .set({'Authorization': `Bearer ${token}`})
    .send(match)

    expect(status).to.be.equal(201)
    expect(body).to.be.deep.equal(validNewTeam)
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

  it('Não deve ser possível criar uma partida com um time que não existe', async function () { 
    const invalidTeam = {
      homeTeamId: 9999,
      awayTeamId: 8,
      homeTeamGoals: 2,
      awayTeamGoals: 2
    };
    sinon.stub(jwt, 'verify').resolves({ role: "admin"});
    sinon.stub(ValidateMatch, 'validateTeams').resolves(false)

    const { status, body } = await chai
    .request(app)
    .post("/matches")
    .set({'Authorization': `Bearer ${token}`})
    .send(invalidTeam)

    expect(status).to.be.equal(404)
    expect(body).to.be.deep.equal({ message: 'There is no team with such id!' })
  })

  afterEach(sinon.restore);
})