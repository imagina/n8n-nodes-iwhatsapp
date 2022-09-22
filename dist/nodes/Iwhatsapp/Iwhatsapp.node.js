"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Iwhatsapp = void 0;
const MessagesDescription_1 = require("./MessagesDescription");
const MediaDescription_1 = require("./MediaDescription");
class Iwhatsapp {
    constructor() {
        this.description = {
            displayName: 'WhatsApp Business Cloud',
            name: 'iwhatsapp',
            icon: 'file:whatsapp.svg',
            group: ['output'],
            version: 1,
            subtitle: '={{ $parameter["resource"] + ": " + $parameter["operation"] }}',
            description: 'Access WhatsApp API',
            defaults: {
                name: 'WhatsApp',
            },
            inputs: ['main'],
            outputs: ['main'],
            credentials: [
                {
                    name: 'whatsAppApi',
                    required: true,
                },
            ],
            requestDefaults: {
                baseURL: 'https://graph.facebook.com/v13.0/',
            },
            properties: [
                {
                    displayName: 'Resource',
                    name: 'resource',
                    type: 'options',
                    noDataExpression: true,
                    options: [
                        {
                            name: 'Message',
                            value: 'message',
                        },
                        {
                            name: 'Media',
                            value: 'media',
                        },
                    ],
                    default: 'message',
                },
                ...MessagesDescription_1.messageFields,
                ...MediaDescription_1.mediaFields,
                ...MessagesDescription_1.messageTypeFields,
                ...MediaDescription_1.mediaTypeFields,
            ],
        };
    }
}
exports.Iwhatsapp = Iwhatsapp;
//# sourceMappingURL=Iwhatsapp.node.js.map