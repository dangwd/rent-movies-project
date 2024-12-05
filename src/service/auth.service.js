import axios from 'axios';
const api = import.meta.env.VITE_APP_API_LG;

class AuthServices {
    funcLogin(user) {
        const formData = new URLSearchParams();
        for (const key in user) {
            formData.append(key, user[key]);
        }
        return axios
            .post(api + 'login', formData, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
            .then((res) => {
                if (res.data) {
                    console.log(res.data.meta);
                    const currentDate = new Date();
                    const expireTokenTime = new Date(currentDate.getTime() + res.data.metadata.atokenExp * 60 * 1000).toString();
                    const jToken = { ExpireToken: expireTokenTime, ...res.data };
                    localStorage.setItem('user', JSON.stringify(jToken));
                }
                return res.data;
            });
    }
}
export default new AuthServices();
