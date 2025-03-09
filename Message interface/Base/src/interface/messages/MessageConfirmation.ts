// Base/src/interfaces/messages/MessageConfirmation.ts
export interface IMessageConfirmation {
    success: boolean;
    payload?: string | object;
}