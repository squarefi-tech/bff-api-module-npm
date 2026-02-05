import { auth } from './auth';
import { bankData } from './bank-data';
import { counterparties } from './counterparties';
import { developer } from './developer';
import { exchange } from './exchange';
import { frontend } from './frontend';
import { issuing } from './issuing';
import { kyc } from './kyc';
import { list } from './list';
import { orders } from './orders';
import { persona } from './persona';
import { referrals } from './referrals';
import { storage } from './storage';
import { tenants } from './tenants';
import { totp } from './totp';
import { user } from './user';
import { virtualAccounts } from './virtual-accounts';
import { wallets } from './wallets';

type Api = {
  auth: typeof auth;
  bankData: typeof bankData;
  counterparties: typeof counterparties;
  developer: typeof developer;
  exchange: typeof exchange;
  frontend: typeof frontend;
  issuing: typeof issuing;
  kyc: typeof kyc;
  list: typeof list;
  orders: typeof orders;
  persona: typeof persona;
  referrals: typeof referrals;
  storage: typeof storage;
  tenants: typeof tenants;
  totp: typeof totp;
  user: typeof user;
  virtualAccounts: typeof virtualAccounts;
  wallets: typeof wallets;
};

export const squarefi_bff_api_client: Api = {
  auth,
  bankData,
  counterparties,
  developer,
  exchange,
  frontend,
  issuing,
  kyc,
  list,
  orders,
  persona,
  referrals,
  storage,
  tenants,
  totp,
  user,
  virtualAccounts,
  wallets,
};
