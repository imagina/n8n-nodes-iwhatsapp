"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IwhatsappApi = void 0;
class IwhatsappApi {
    constructor() {
        this.name = 'iwhatsappApi';
        this.displayName = 'IwhatsApp API';
        this.documentationUrl = 'https://whatsApp.com';
        this.properties = [
            {
                displayName: 'Access Token',
                type: 'string',
                name: 'accessToken',
                default: '',
                required: true,
            },
            {
                displayName: 'Bussiness Account ID',
                type: 'string',
                name: 'businessAccountId',
                default: '',
                required: true,
            },
        ];
        this.authenticate = {
            type: 'generic',
            properties: {
                headers: {
                    Authorization: '=Bearer {{$credentials.accessToken}}',
                },
            },
        };
        this.test = {
            request: {
                baseURL: 'https://graph.facebook.com/v13.0',
                url: '/',
                ignoreHttpStatusErrors: true,
            },
            rules: [
                {
                    type: 'responseSuccessBody',
                    properties: {
                        key: 'error.type',
                        value: 'OAuthException',
                        message: 'Invalid access token',
                    },
                },
            ],
        };
    }
}
exports.IwhatsappApi = IwhatsappApi;
//# sourceMappingURL=IwhatsappApi.credentials.js.map