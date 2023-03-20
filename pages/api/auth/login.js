import axios from 'axios';
import cookie from 'cookie';
export default async (req, res) => {
  if (req.method === 'POST') {
    var resp = {};
    const apiLocal = process.env.NEXTAUTH_URL + '/api/auth/local';
    resp = await axios
      .post(apiLocal, req.body)
      .then((response) => {

        console.warn("response", response);
        const jwt = response.data.jwt;
        const id = response.data.user.id;

        res
          .setHeader('Set-Cookie', [
            cookie.serialize('token', jwt, {
              httpOnly: true,
              secure: process.env.NODE_ENV !== 'development',
              maxAge: 60 * 60 * 24 * 7, // 1 week
              sameSite: 'strict',
              path: '/',
            }),
            cookie.serialize('userid', id, {
              httpOnly: true,
              secure: process.env.NODE_ENV !== 'development',
              maxAge: 60 * 60 * 24 * 7, // 1 week
              sameSite: 'strict',
              path: '/',
            }),
          ])
          .json({ message: response.data.user });
      })
      .catch((error) => {
        console.warn("error warning", error)
        if (!error.response.data.error.message) {
          return res.status(500).json({ message: 'Internal server error' });
        } else {
          const messages = error.response.data.error.message;
          return res.status(403).json({ message: messages });
        }
      });
  }
};