/**
 * Generated by orval v7.0.1 🍺
 * Do not edit manually.
 * Distimer Swagger API
 * OpenAPI spec version: 1.0
 */

export interface GroupctrlModifyGroupReq {
  description?: string;
  /**
   * @minimum 0
   * @maximum 2
   */
  invite_policy: number;
  name: string;
  nickname_policy?: string;
  /**
   * @minimum 0
   * @maximum 2
   */
  reveal_policy: number;
}