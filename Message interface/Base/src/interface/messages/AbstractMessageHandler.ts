// Base/src/interfaces/messages/AbstractMessageHandler.ts
import { ILogObj, Logger } from 'tslog';
import { IMessage } from './Message';
import { IMessageHandler } from './MessageHandler'; 
import { OcppRequest, OcppResponse, OcppError, CallAction } from '../../ocpp/rpc/message';
import { HandlerProperties } from '.';
import { IMessageConfirmation } from './MessageConfirmation';
import { SystemConfig } from '../../config/types';

export abstract class AbstractMessageHandler implements IMessageHandler {
    protected _config: SystemConfig;
    protected _logger: Logger<ILogObj>;

    constructor(config: SystemConfig, logger?: Logger<ILogObj>) {
        this._config = config;
        this._logger = logger ? logger.getSubLogger({ name: this.constructor.name }) : new Logger<ILogObj>({ name: this.constructor.name });
    }

    async handle(message: IMessage<OcppRequest | OcppResponse | OcppError>, props?: HandlerProperties): Promise<void> {
        try {
            const response = await this.processMessage(message, props);
            await this.sendResponse(message, response);
            this._logger.info(`Handled message: ${message.action}`);
        } catch (error) {
            this._logger.error(`Handling failed: ${error.message}`);
            await this.sendErrorResponse(message, error);
        }
    }

    protected abstract processMessage(message: IMessage<OcppRequest | OcppResponse | OcppError>, props?: HandlerProperties): Promise<IMessageConfirmation>;
    protected abstract sendResponse(message: IMessage<OcppRequest | OcppResponse | OcppError>, response: IMessageConfirmation): Promise<void>;
    protected async sendErrorResponse(message: IMessage<OcppRequest | OcppResponse | OcppError>, error: any): Promise<void> {
        const errorResponse: IMessageConfirmation = { success: false, payload: error.message || 'Unknown error' };
        await this.sendResponse(message, errorResponse);
    }

    abstract subscribe(identifier: string, actions?: CallAction[], filter?: { [k: string]: string }): Promise<boolean>;
    abstract unsubscribe(identifier: string): Promise<boolean>;
    abstract shutdown(): void;
}