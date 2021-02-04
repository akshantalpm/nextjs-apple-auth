const EnvironmentVar = require('../../enviornment');
const AppleAuth = require('apple-auth');

export default async function handler(req, res) {
    const config = {
        "client_id": EnvironmentVar.clientId,
        "team_id": "3JRGPHC3AW",
        "key_id": EnvironmentVar.keyId,
        "redirect_uri": EnvironmentVar.redirectUri,
        "scope": "name email"
    }

    let auth = new AppleAuth(config, EnvironmentVar.accessKey, 'text');

    if (req.method === 'POST') {
        try {
            const response = await auth.accessToken(req.body.code);

            const user = {};
            user.idToken = response.id_token;
            user.accessToken = response.access_token;

            res.status(200).json(user);
        } catch (ex) {
            console.error(ex);
            res.send("An error occurred!");
        }
    } else {
        res.status(200).json({})
    }
}
