import qs from "qs";
import usermodel from "../../Models/user.model";
import axios from 'axios'
import jwt from 'jsonwebtoken'

interface GoogleUserResult {
    id: string;
    email: string;
    verified_email: boolean;
    name: string;
    given_name: string;
    family_name: string;
    picture: string;
    locale: string;
}

interface GoogleOauthToken {
    access_token: string;
    id_token: string;
    expires_in: number;
    refresh_token: string;
    token_type: string;
    scope: string;
}

const getGoogleOauthToken = async ({ code, }: { code: string; }): Promise<GoogleOauthToken> => {
    const rootURl: any = process.env.GOOGLE_TOKEN_URL;

    const options = {
        code,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: process.env.BASE_REDIRECT_URL,
        grant_type: "authorization_code",
    };
    try {
        const { data } = await axios.post<GoogleOauthToken>(
            rootURl,
            qs.stringify(options),
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            }
        );

        return data;
    } catch (err: any) {
        console.log("Failed to fetch Google Oauth Tokens");
        throw new Error(err);
    }
};



async function getGoogleUser({
    id_token,
    access_token,
}: {
    id_token: string;
    access_token: string;
}): Promise<GoogleUserResult> {
    try {
        const { data } = await axios.get<GoogleUserResult>(
            `${process.env.GOOGLE_USERINFO_URL}?alt=json&access_token=${access_token}`,
            {
                headers: {
                    Authorization: `Bearer ${id_token}`,
                },
            }
        );

        return data;
    } catch (err: any) {
        console.log(err);
        throw Error(err);
    }
}

let googleOauthHandlar = async (req, res) => {

    // get the code from qs
    const code = req.query.code as string;

    try {
        // get the id and access token with the code
        const { id_token, access_token } = await getGoogleOauthToken({ code });
        // console.log({ id_token, access_token });

        // get user with tokens
        const googleUser = await getGoogleUser({ id_token, access_token });

        if (!googleUser?.verified_email) {
            return res.customResponseMiddleware(200, "error", "Google account not verified!")
        }

        let user = await usermodel.aggregate([
            {
                $match: {
                    email: googleUser.email,
                },
            },
        ]);
        if (user.length > 0) {
            delete user[0].password
            user[0].url = ''
            res.status(200).json({
                message: "User details retrived",
                status: "success",
                data: user,
            });
        } else {
            let obj = {
                "email": googleUser.email,
                "fullname": googleUser.name,
                "username": googleUser.name.toLowerCase().replace(" ", "_"),
                "profile_picture": googleUser.picture,
                "sso": "google"
            }
            await usermodel.create({
                ...obj,
                token: jwt.sign(obj, process.env.JWT_PRIVATE),
            });

            let user = await usermodel.aggregate([
                {
                    $match: {
                        email: googleUser.email,
                    },
                },
            ]);
            if (user.length > 0) {
                delete user[0].password
                user[0].url = ''
                res.status(200).json({
                    message: "User details retrived",
                    status: "success",
                    data: user,
                });
            }

        }

        console.log(googleUser);


    } catch (e) {
        return res.customResponseMiddleware(400, "error", String(e))

    }

}


export default { googleOauthHandlar }