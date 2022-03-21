import fetch from 'node-fetch';

export default async (watchType: string, payload: any) => {
    return fetch('http://realtime:9000/event', {
        method: 'POST',
        body: JSON.stringify({
            watchType,
            payload,
        }),
    });
};