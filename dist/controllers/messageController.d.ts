import { NextFunction, Request, Response } from "express";
export declare const sendMessage: (req: any, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getMessages: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const deleteMessage: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const uploadFile: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getUnreadCount: (req: any, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=messageController.d.ts.map