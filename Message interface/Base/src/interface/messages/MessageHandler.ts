// Base/src/interfaces/messages/MessageHandler.ts
import { IMessage } from './Message';
import { OcppRequest, OcppResponse, OcppError, CallAction } from '../../ocpp/rpc/message';
import { HandlerProperties } from '.';

export interface IMessageHandler {
    subscribe(identifier: string, actions?: CallAction[], filter?: { [k: string]: string }): Promise<boolean>;
    unsubscribe(identifier: string): Promise<boolean>;
    handle(message: IMessage<OcppRequest | OcppResponse | OcppError>, props?: HandlerProperties): Promise<void>;
    shutdown(): void;
}