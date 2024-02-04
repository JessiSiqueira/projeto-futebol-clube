import * as sinon from 'sinon';
import * as chai from 'chai';
import { matches } from './mock/match.mock';

// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import MatchModel from '../database/models/Match.model';

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

  afterEach(sinon.restore);
})