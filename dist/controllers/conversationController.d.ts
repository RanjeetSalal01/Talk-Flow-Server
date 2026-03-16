import { NextFunction, Request, Response } from "express";
export declare const createConversation: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getConversations: (req: any, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=conversationController.d.ts.map