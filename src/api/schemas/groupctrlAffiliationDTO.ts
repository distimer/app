/**
 * Generated by orval v7.0.1 🍺
 * Do not edit manually.
 * Distimer Swagger API
 * OpenAPI spec version: 1.0
 */

export interface GroupctrlAffiliationDTO {
  group_id: string;
  joined_at: string;
  nickname: string;
  /**
   * @minimum 0
   * @maximum 2
   */
  role: number;
  user_id: string;
}
