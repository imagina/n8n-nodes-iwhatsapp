"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mediaTypeFields = exports.mediaFields = void 0;
const MediaFunctions_1 = require("./MediaFunctions");
exports.mediaFields = [
    {
        displayName: 'Operation',
        name: 'operation',
        noDataExpression: true,
        type: 'options',
        placeholder: '',
        options: [
            {
                name: 'Upload',
                value: 'mediaUpload',
                action: 'Upload media',
            },
            {
                name: 'Download',
                value: 'mediaUrlGet',
                action: 'Download media',
            },
            {
                name: 'Delete',
                value: 'mediaDelete',
                action: 'Delete media',
            },
        ],
        default: 'mediaUpload',
        displayOptions: {
            show: {
                resource: ['media'],
            },
        },
        description: 'The operation to perform on the media',
    },
];
exports.mediaTypeFields = [
    {
        displayName: 'Phone Number ID',
        name: 'phoneNumberId',
        type: 'string',
        default: '',
        placeholder: '',
        routing: {
            request: {
                method: 'POST',
                url: '={{$value}}/media',
            },
        },
        displayOptions: {
            show: {
                operation: ['mediaUpload'],
                resource: ['media'],
            },
        },
        required: true,
        description: "The ID of the business account's phone number to store the media",
    },
    {
        displayName: 'Property Name',
        name: 'mediaPropertyName',
        type: 'string',
        default: 'data',
        displayOptions: {
            show: {
                operation: ['mediaUpload'],
                resource: ['media'],
            },
        },
        required: true,
        description: 'Name of the binary property which contains the data for the file to be uploaded',
        routing: {
            send: {
                preSend: [MediaFunctions_1.setupUpload],
            },
        },
    },
    {
        displayName: 'Media ID',
        name: 'mediaGetId',
        type: 'string',
        default: '',
        displayOptions: {
            show: {
                operation: ['mediaUrlGet'],
                resource: ['media'],
            },
        },
        routing: {
            request: {
                method: 'GET',
                url: '=/{{$value}}',
            },
        },
        required: true,
        description: 'The ID of the media',
    },
    {
        displayName: 'Media ID',
        name: 'mediaDeleteId',
        type: 'string',
        default: '',
        displayOptions: {
            show: {
                operation: ['mediaDelete'],
                resource: ['media'],
            },
        },
        routing: {
            request: {
                method: 'DELETE',
                url: '=/{{$value}}',
            },
        },
        required: true,
        description: 'The ID of the media',
    },
    {
        displayName: 'Additional Fields',
        name: 'additionalFields',
        type: 'collection',
        placeholder: 'Add Field',
        default: {},
        displayOptions: {
            show: {
                resource: ['media'],
                operation: ['mediaUpload'],
            },
        },
        options: [
            {
                displayName: 'Filename',
                name: 'mediaFileName',
                type: 'string',
                default: '',
                description: 'The name to use for the file',
            },
        ],
    },
];
//# sourceMappingURL=MediaDescription.js.map