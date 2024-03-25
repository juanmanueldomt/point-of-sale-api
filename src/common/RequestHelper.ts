export class RequestHelper {
    public static formatInfoRequest(request: any): string {
        return request.method + request.originalUrl + " - user-agent: " + request.headers["user-agent"];
    }

    public static formatInfoResponse(res: any): string {
        return res.statusCode;
    }
}
