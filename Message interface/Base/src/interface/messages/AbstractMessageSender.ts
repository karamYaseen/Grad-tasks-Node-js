// Base/src/interfaces/messages/AbstractMessageSender.ts
import { IMessage } from './Message';
import { IMessageConfirmation } from './MessageConfirmation';
import { OcppRequest, OcppResponse, OcppError } from '../../ocpp/rpc/message';
import { MessageState } from '.';
import { Logger, ILogObj } from 'tslog';
import { SystemConfig } from '../../config/types';

export abstract class AbstractMessageSender {
    protected _config: SystemConfig;
    protected _logger: Logger<ILogObj>;

    constructor(config: SystemConfig, logger?: Logger<ILogObj>) {
        this._config = config;
        this._logger = logger ? logger.getSubLogger({ name: this.constructor.name }) : new Logger<ILogObj>({ name: this.constructor.name });
    }

    async sendRequest(message: IMessage<OcppRequest>, payload?: OcppRequest): Promise<IMessageConfirmation> {
        const formattedMessage = this.formatMessage(message, payload, MessageState.Request);
        await this.sendToQueue(formattedMessage);
        this._logger.info(`Sent request to ${this._config.queueName}: ${JSON.stringify(formattedMessage)}`);
        return { success: true };
    }

    async sendResponse(message: IMessage<OcppResponse | OcppError>, payload?: OcppResponse | OcppError): Promise<IMessageConfirmation> {
        const formattedMessage = this.formatMessage(message, payload, MessageState.Response);
        await this.sendToQueue(formattedMessage);
        this._logger.info(`Sent response to ${this._config.queueName}: ${JSON.stringify(formattedMessage)}`);
        return { success: true };
    }

    async send(message: IMessage<OcppRequest | OcppResponse | OcppError>, payload?: OcppRequest | OcppResponse | OcppError, state?: MessageState): Promise<IMessageConfirmation> {
        const formattedMessage = this.formatMessage(message, payload, state);
        await this.sendToQueue(formattedMessage);
        this._logger.info(`Sent message to ${this._config.queueName}: ${JSON.stringify(formattedMessage)}`);
        return { success: true };
    }

    protected formatMessage(message: IMessage<any>, payload?: any, state?: MessageState): string {
        return JSON.stringify({
            ...message,
            payload: payload || message.payload,
            state: state || MessageState.Unknown,
            timestamp: new Date().toISOString(),
        });
    }

    protected abstract sendToQueue(formattedMessage: string): Promise<void>;
    abstract shutdown(): void;
}