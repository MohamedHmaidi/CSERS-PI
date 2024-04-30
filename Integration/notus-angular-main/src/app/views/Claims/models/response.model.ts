import { Claim } from "./claim.model";

export class ClaimResponse {
    idResponse: number;
    content: string;
    date: Date;
    claim: Claim;
    user: object;
  }
