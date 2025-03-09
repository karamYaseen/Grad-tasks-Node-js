// Base/src/interfaces/messages/MessageSender.ts
import { IMessage } from './Message';
import { IMessageConfirmation } from './MessageConfirmation';
import { OcppError, OcppRequest, OcppResponse } from '../../ocpp/rpc/message';
import { MessageState } from '.';

export interface IMessageSender {
    sendRequest(message: IMessage<OcppRequest>, payload?: OcppRequest): Promise<IMessageConfirmation>;
    sendResponse(message: IMessage<OcppResponse | OcppError>, payload?: OcppResponse | OcppError): Promise<IMessageConfirmation>;
    send(message: IMessage<OcppRequest | OcppResponse | OcppError>, payload?: OcppRequest | OcppResponse | OcppError, state?: MessageState): Promise<IMessageConfirmation>;
    shutdown(): void;
}