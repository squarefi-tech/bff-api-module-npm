import { auth } from './auth';
import { developer } from './developer';
import { exchange } from './exchange';
import { fiat_accounts } from './fiat_accounts';
import { issuing } from './issuing';
import { kyc } from './kyc';
import { list } from './list';
import { orders } from './orders';
import { tenants } from './tenants';
import { user } from './user';
import { wallets } from './wallets';

type Api = {
  auth: typeof auth;
  developer: typeof developer;
  exchange: typeof exchange;
  fiat_accounts: typeof fiat_accounts;
  issuing: typeof issuing;
  kyc: typeof kyc;
  list: typeof list;
  orders: typeof orders;
  tenants: typeof tenants;
  user: typeof user;
  wallets: typeof wallets;
};

export const squarefiBffApiClient: Api = {
  auth,
  developer,
  exchange,
  fiat_accounts,
  issuing,
  kyc,
  list,
  orders,
  tenants,
  user,
  wallets,
};
