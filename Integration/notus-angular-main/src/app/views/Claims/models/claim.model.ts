export class Claim {
    idClaim: number;
    title: string;
    description: string;
    date: Date;
    user: object;
    status: string;
    classification: string;
    claimType: ClaimType;
  }

export enum ClaimType {
  BUG_REPORT = 'BUG_REPORT',
  FEATURE_REQUEST = 'FEATURE_REQUEST',
  FEEDBACK = 'FEEDBACK',
  SERVICE = 'SERVICE'
}
  