import { Request, Response } from "express";
export declare const sendFriendRequest: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const acceptFriendRequest: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const rejectFriendRequest: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getFriends: (req: any, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getIncomingRequests: (req: any, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getOutgoingRequests: (req: any, res: Response) => Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=friendRequestController.d.ts.map