import * as sinon from 'sinon';
import * as chai from 'chai';
import { teams, team } from './mock/team.mock';

// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import ModelTeams from '../database/models/Team.model';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;


describe('Testando as rotas de teams', () => {
  /**
   * Exemplo do uso de stubs com tipos
   */

  let chaiHttpResponse: Response;

  it('Deve retornar um array de times', async () => {
      sinon.stub(ModelTeams, 'findAll').resolves(teams as any)
      const {status, body} = await chai
      .request(app)
      .get("/teams");
  
    expect(status).to.be.equal(200);
    expect(body).to.be.deep.equal(teams)
  });

  it('Deve retornar um time', async () => {
      sinon.stub(ModelTeams, 'findByPk').resolves(team as any)
      const {status, body} = await chai
      .request(app)
      .get("/teams/2");

    expect(status).to.be.equal(200);
    expect(body).to.be.deep.equal(team)
  });

  it("Deve retornar 'not found' caso o time não exista", async () => {
    sinon.stub(ModelTeams, 'findByPk').resolves(null);

    const {status, body} = await chai
    .request(app)
    .get("/teams/9999");

    expect(status).to.be.equal(404);
    expect(body.message).to.be.equal('Team 9999 not found')
  })

  afterEach(sinon.restore);
  })