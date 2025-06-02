export interface HttpController<Request, Response> {
    handle(req: Request, res: Response): Promise<void>;
}