// Base/src/interfaces/messages/MessageContext.ts
export interface IMessageContext {
    correlationId: string;
    tenantId: string;
    stationId: string;
    timestamp: string; // Iso Timestamp
}