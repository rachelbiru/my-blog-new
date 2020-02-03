import axios from 'axios';

export const register = newUser => {
    return axios
        .post('users/register', {
            first_name: newUser.first_name,
            last_name: newUser.last_name,
            email: newUser.email,
            password: newUser.password
        })
        .then(res => {
            console.log(newUser, 'Registerd!!!');
        })
}

export const login = User => {
    return axios
        .post('users/login', {
            email: User.email,
            password: User.password,
        })
        .then(res => {
            localStorage.setItem('usertoken', res.data)
            localStorage.setItem('email', res.data.email)

            console.log(res.data);
            return res.data;
        })
        .catch(err => {
            console.log(err);
        })
}




