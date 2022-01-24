export interface AuthInfoType
  extends Pick<DecodeTokenType, 'memberId' | 'companyId'> {
  accessToken: string;
}

export interface DecodeTokenType {
  exp: number;
  memberId: number;
  companyId: number;
  roleType: string;
  // eslint-disable-next-line camelcase
  user_name: string;
}
