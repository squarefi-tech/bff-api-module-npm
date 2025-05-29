import { auth } from './auth';
import { counterparties } from './counterparties';
import { developer } from './developer';
import { exchange } from './exchange';
import { issuing } from './issuing';
import { kyc } from './kyc';
import { list } from './list';

import { orders } from './orders';
import { persona } from './persona';
import { tenants } from './tenants';
import { user } from './user';
import { virtualAccounts } from './virtual-accounts';
import { wallets } from './wallets';

type Api = {
  auth: typeof auth;
  counterparties: typeof counterparties;
  developer: typeof developer;
  exchange: typeof exchange;
  issuing: typeof issuing;
  kyc: typeof kyc;
  list: typeof list;
  orders: typeof orders;
  persona: typeof persona;
  tenants: typeof tenants;
  user: typeof user;
  virtualAccounts: typeof virtualAccounts;
  wallets: typeof wallets;
};

export const squarefi_bff_api_client: Api = {
  auth,
  counterparties,
  developer,
  exchange,
  issuing,
  kyc,
  list,
  orders,
  persona,
  tenants,
  user,
  virtualAccounts,
  wallets,
};
