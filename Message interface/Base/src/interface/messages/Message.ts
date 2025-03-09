// Base/src/interfaces/messages/Message.ts
import { IMessageContext } from './MessageContext';
import { OcppRequest, OcppResponse, CallAction } from '../../ocpp/rpc/message';
import { EventGroup, MessageOrigin, MessageState } from '.';

export interface IMessage<T extends OcppRequest | OcppResponse> {
    get origin(): MessageOrigin;
    set origin(value: MessageOrigin);
    get eventGroup(): EventGroup;
    set eventGroup(value: EventGroup);
    get action(): string;
    set action(value: string);
    get state(): MessageState;
    set state(value: MessageState);
    get context(): IMessageContext;
    set context(value: IMessageContext);
    get payload(): T;
    set payload(value: T);
}

export class Message<T extends OcppRequest | OcppResponse> implements IMessage<T> {
    protected _origin: MessageOrigin;
    protected _eventGroup: EventGroup;
    protected _action: string;
    protected _state: MessageState;
    protected _context: IMessageContext;
    protected _payload: T;

    constructor(
        origin: MessageOrigin,
        eventGroup: EventGroup,
        action: string,
        state: MessageState,
        context: IMessageContext,
        payload: T
    ) {
        this._origin = origin;
        this._eventGroup = eventGroup;
        this._action = action;
        this._state = state;
        this._context = context;
        this._payload = payload;
    }

    get origin(): MessageOrigin { return this._origin; }
    set origin(value: MessageOrigin) { this._origin = value; }
    get eventGroup(): EventGroup { return this._eventGroup; }
    set eventGroup(value: EventGroup) { this._eventGroup = value; }
    get action(): string { return this._action; }
    set action(value: string) { this._action = value; }
    get state(): MessageState { return this._state; }
    set state(value: MessageState) { this._state = value; }
    get context(): IMessageContext { return this._context; }
    set context(value: IMessageContext) { this._context = value; }
    get payload(): T { return this._payload; }
    set payload(value: T) { this._payload = value; }
}