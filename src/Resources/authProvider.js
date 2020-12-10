
// in src/authProvider.js
export default {
    // called when the user attempts to log in
    login: async ({ username, password }) => {

        const request = new Request('https://findar-api-staging.herokuapp.com/user/login', {
            method: 'POST',
            body: JSON.stringify({ email: username, password }),
            headers: new Headers({ 'Content-Type': 'application/json' }),
        });
        localStorage.setItem('username', username);
        let email = localStorage.getItem("username")
        var name   = email.substring(0, email.lastIndexOf("@"));
        var domain = email.substring(email.lastIndexOf("@") +1);
        let fullname = name.split(".")
        let fn = fullname[0]
        let ln = fullname[1]
        let loginSchool0 = domain.split(".")
        let loginSchool = loginSchool0[0]
        localStorage.setItem('school', loginSchool)
        console.log(username);
        console.log(password);

        return fetch(request)
            .then(response => {
                if (response.status < 200 || response.status >= 300) {
                    throw new Error(response.statusText);
                }
                return response.json();
            })
            .then(({ token }) => {
                localStorage.setItem('token', token);

                console.log(token);

            });

    },
    // called when the user clicks on the logout button
    logout: () => {
        localStorage.removeItem('username');
        localStorage.removeItem('token');

        return Promise.resolve();
    },
    // called when the API returns an error
    checkError: ({ status }) => {
        if (status === 401 || status === 403) {
            localStorage.removeItem('username');
            return Promise.reject();
        }
        return Promise.resolve();
    },
    // called when the user navigates to a new location, to check for authentication
    checkAuth: () => {
        return localStorage.getItem('token')
            ? Promise.resolve()
            : Promise.reject();
    },
    // called when the user navigates to a new location, to check for permissions / roles
    getPermissions: () => Promise.resolve(),
};
