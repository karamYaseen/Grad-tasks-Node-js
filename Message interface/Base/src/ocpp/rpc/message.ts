// Base/src/ocpp/rpc/message.ts
export type OcppRequest = { [key: string]: any };
export type OcppResponse = { [key: string]: any };
export type OcppError = { code: string; message: string };
export type CallAction = string;