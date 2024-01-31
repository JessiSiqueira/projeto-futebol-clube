import * as sinon from 'sinon';
import * as chai from 'chai';
import { teams } from './mock/team.mock';

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
  })