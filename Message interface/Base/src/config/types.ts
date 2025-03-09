// 00_Base/src/config/types.ts
export interface SystemConfig {
    queueName?: string;
    rabbitmqUrl?: string;
    [key: string]: any;
  }