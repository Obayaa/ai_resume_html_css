
const BASE_URL = process.env.BASE_URL;
// import { TOKEN } from "pa/ges/_app";


// When initializing your application or during user login
const retrieveToken = () => {
    return localStorage.getItem('auth-token');
};


const API_URL = {
    get: async (url, authRequired = true) => {
        try {
            let headers = {}
            let TOKEN = retrieveToken();

            if (authRequired) {
                headers = {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${TOKEN ? TOKEN : ''}`
                }
            } else {
                headers = {
                    'Content-Type': 'application/json',
                }
            }
            const response = await fetch(`${BASE_URL}${url}`,
                {
                    method: 'GET',
                    headers
                }
            );
            // console.log(response)
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error:', error);
            return error;
        }
    },
    post: async (url, body, authRequired = true) => {
        try {
            let headers = {}
            let TOKEN = retrieveToken();
            if (authRequired) {
                headers = {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${TOKEN ? TOKEN : ''}`
                }
            } else {
                headers = {
                    'Content-Type': 'application/json',
                }
            }
            const response = await fetch(`${BASE_URL}${url}`, {
                method: 'POST',
                headers,
                body: JSON.stringify(body)
            });
            // console.log("TOKEN", TOKEN)
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error:', error);
        }
    },
    put: async (url, body, authRequired = true) => {
        try {
            let headers = {}
            let TOKEN = retrieveToken();
            if (authRequired) {
                headers = {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${TOKEN ? TOKEN : ''}`
                }
            } else {
                headers = {
                    'Content-Type': 'application/json',
                }
            }
            const response = await fetch(`${BASE_URL}${url}`, {
                method: 'PUT',
                headers,
                body: JSON.stringify(body)
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error:', error);
        }
    },
    delete: async (url, bodyToSend, authRequired = true) => {
        try {
            let headers = {}
            let TOKEN = retrieveToken();
            if (authRequired) {
                headers = {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${TOKEN ? TOKEN : ''}`
                }
            } else {
                headers = {
                    'Content-Type': 'application/json',
                }
            }
            const response = await fetch(`${BASE_URL}${url}`
                , {
                    method: 'DELETE',
                    headers,
                    body: bodyToSend ? JSON.stringify(bodyToSend) : undefined
                }
            );
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error:', error);
        }
    },
    patch: async (url, body, authRequired = true) => {
        try {
            let headers = {}
            let TOKEN = retrieveToken();
            if (authRequired) {
                headers = {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${TOKEN ? TOKEN : ''}`
                }
            } else {
                headers = {
                    'Content-Type': 'application/json',
                }
            }
            const response = await fetch(`${BASE_URL}${url}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error:', error);
        }

    }
}

export default API_URL;

