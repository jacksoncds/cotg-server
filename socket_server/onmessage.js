const auth = require('./authentication');
const routes = require('./routes');

let clients = [];

/**
 * Try to parse request data.
 * @param {*} ws websocket request.
 * @param {*} data data sent.
 * @return {object} parsed data.
 */
function tryParsePayload(ws, data) {
    let req = null;

    try {
        req = JSON.parse(data);
    } catch (error) {
        ws.send('Data could not be parsed.');
    }

    if (req !== null) {
        return req;
    } else {
        return null;
    }
}

/**
 * Get client by token.
 * @param {*} clients Clients.
 * @param {*} token Token.
 * @return {Object} token.
 */
function getClientByToken(clients, token) {
    return clients.find(function(client) {
        if (client.member.extensionToken === token) {
            return client;
        }
    });

    return null;
}

module.exports = (ws, message, request, wss) => {
    // Parse data.
    let req = null;

    if (req = tryParsePayload(ws, message)) {
        // Auth.
        if (req) {
            if (req.path !== 'auth' && auth.isAuthenticated()) {
                // All requests that require authentication.

                let authClient = getClientByToken(clients, req.token);

                if (authClient) {
                    routes(req.path, authClient, req.data, {});
                } else {
                    ws.send('Not authenticated.');
                }
            } else {
                auth.authenticate(req.inGameName, req.token, request.headers['x-real-ip'])
                .then((member) => {
                    clients.push(
                        {
                            connection: ws,
                            member: member,
                        }
                    );

                    let success = {
                        responseId: 'auth',
                        status: 200,
                        data: 'Authenticated.',
                    };

                    ws.send(JSON.stringify(success));
                })
                .catch((err) => {
                    let error = {
                        responseId: 'auth',
                        status: 501,
                        data: 'Could not authenticate.',
                    };
                    ws.send(JSON.stringify(error));
                });
            }
        } else {
            auth.unauthorized(ws);
        }
    }

    console.log('received %s', message);
};
