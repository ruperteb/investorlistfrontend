export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: 'Query';
  investors?: Maybe<Array<Maybe<Investor>>>;
  selectedInvestors?: Maybe<Array<Maybe<SelectedInvestor>>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  postInvestor: Investor;
  updateInvestor: Investor;
  deleteInvestor: Investor;
  postContact: Contact;
  login?: Maybe<AuthPayload>;
};

export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};



export type MutationPostInvestorArgs = {
  investorName: Scalars['String'];
  commercial?: Maybe<Scalars['Boolean']>;
  industrial?: Maybe<Scalars['Boolean']>;
  retail?: Maybe<Scalars['Boolean']>;
  residential?: Maybe<Scalars['Boolean']>;
  hotel?: Maybe<Scalars['Boolean']>;
  wc?: Maybe<Scalars['Boolean']>;
  gau?: Maybe<Scalars['Boolean']>;
  kzn?: Maybe<Scalars['Boolean']>;
  allregions?: Maybe<Scalars['Boolean']>;
  contactName?: Maybe<Scalars['String']>;
  contactPosition?: Maybe<Scalars['String']>;
  contactOfficeNo?: Maybe<Scalars['String']>;
  contactMobileNo?: Maybe<Scalars['String']>;
  contactEmail?: Maybe<Scalars['String']>;
  minInvest?: Maybe<Scalars['Int']>;
  maxInvest?: Maybe<Scalars['Int']>;
  listed?: Maybe<Scalars['Boolean']>;
  unlisted?: Maybe<Scalars['Boolean']>;
  private?: Maybe<Scalars['Boolean']>;
  bee?: Maybe<Scalars['Boolean']>;
  notes?: Maybe<Scalars['String']>;
};

export type MutationUpdateInvestorArgs = {
  investorId: Scalars['Int'];
  investorName?: Maybe<Scalars['String']>;
  commercial?: Maybe<Scalars['Boolean']>;
  industrial?: Maybe<Scalars['Boolean']>;
  retail?: Maybe<Scalars['Boolean']>;
  residential?: Maybe<Scalars['Boolean']>;
  hotel?: Maybe<Scalars['Boolean']>;
  wc?: Maybe<Scalars['Boolean']>;
  gau?: Maybe<Scalars['Boolean']>;
  kzn?: Maybe<Scalars['Boolean']>;
  allregions?: Maybe<Scalars['Boolean']>;
  contactId?: Scalars['Int'];
  contactName?: Maybe<Scalars['String']>;
  contactPosition?: Maybe<Scalars['String']>;
  contactOfficeNo?: Maybe<Scalars['String']>;
  contactMobileNo?: Maybe<Scalars['String']>;
  contactEmail?: Maybe<Scalars['String']>;
  minInvest?: Maybe<Scalars['Int']>;
  maxInvest?: Maybe<Scalars['Int']>;
  listed?: Maybe<Scalars['Boolean']>;
  unlisted?: Maybe<Scalars['Boolean']>;
  private?: Maybe<Scalars['Boolean']>;
  bee?: Maybe<Scalars['Boolean']>;
  notes?: Maybe<Scalars['String']>;
};

export type MutationDeleteInvestorArgs = {
  investorId?: Maybe<Scalars['Int']>;
};


export type MutationPostContactArgs = {
  name?: Maybe<Scalars['String']>;
  position?: Maybe<Scalars['String']>;
  officeNo?: Maybe<Scalars['String']>;
  mobileNo?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  investorID?: Maybe<Scalars['Int']>;
};

export type Investor = {
  __typename?: 'Investor';
  id: Scalars['Int'];
  investorName: Scalars['String'];
  commercial?: Maybe<Scalars['Boolean']>;
  industrial?: Maybe<Scalars['Boolean']>;
  retail?: Maybe<Scalars['Boolean']>;
  residential?: Maybe<Scalars['Boolean']>;
  hotel?: Maybe<Scalars['Boolean']>;
  contacts?: Maybe<Array<Maybe<Contact>>>;
  wc?: Maybe<Scalars['Boolean']>;
  gau?: Maybe<Scalars['Boolean']>;
  kzn?: Maybe<Scalars['Boolean']>;
  allregions?: Maybe<Scalars['Boolean']>;
  minInvest?: Maybe<Scalars['Int']>;
  maxInvest?: Maybe<Scalars['Int']>;
  listed?: Maybe<Scalars['Boolean']>;
  unlisted?: Maybe<Scalars['Boolean']>;
  private?: Maybe<Scalars['Boolean']>;
  bee?: Maybe<Scalars['Boolean']>;
  notes?: Maybe<Scalars['String']>;
};

export type SelectedInvestor = {
  __typename?: 'SelectedInvestor';
  id?: Scalars['Int'];
  investorName?: Scalars['String'];
  selected?: Maybe<Scalars['Boolean']>;
  commercial?: Maybe<Scalars['Boolean']>;
  industrial?: Maybe<Scalars['Boolean']>;
  retail?: Maybe<Scalars['Boolean']>;
  residential?: Maybe<Scalars['Boolean']>;
  hotel?: Maybe<Scalars['Boolean']>;
  contacts?: Maybe<Array<Maybe<SelectedContact>>>;
  wc?: Maybe<Scalars['Boolean']>;
  gau?: Maybe<Scalars['Boolean']>;
  kzn?: Maybe<Scalars['Boolean']>;
  allregions?: Maybe<Scalars['Boolean']>;
  minInvest?: Maybe<Scalars['Int']>;
  maxInvest?: Maybe<Scalars['Int']>;
  listed?: Maybe<Scalars['Boolean']>;
  unlisted?: Maybe<Scalars['Boolean']>;
  private?: Maybe<Scalars['Boolean']>;
  bee?: Maybe<Scalars['Boolean']>;
  notes?: Maybe<Scalars['String']>;
};

export type Contact = {
  __typename?: 'Contact';
  id: Scalars['Int'];
  name: Scalars['String'];
  position?: Maybe<Scalars['String']>;
  officeNo?: Maybe<Scalars['String']>;
  mobileNo?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  investorName?: Maybe<Investor>;
};

export type SelectedContact = {
  __typename?: 'SelectedContact';
  id?: Scalars['Int'];
  name?: Scalars['String'];
  position?: Maybe<Scalars['String']>;
  officeNo?: Maybe<Scalars['String']>;
  mobileNo?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  investorName?: Maybe<Investor>;
};


export type Investors = {
  __typename?: 'Investors';
  investors?: Maybe<Investor>;
};

export type AuthPayload = {
  __typename?: 'AuthPayload';
  token?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  name: Scalars['String'];
  email: Scalars['String'];
};
