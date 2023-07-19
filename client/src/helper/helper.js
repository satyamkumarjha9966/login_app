import axios from 'axios';

// Make API Request



// Authenticate Function
export async function authenticate(username) {
    try {
        return await axios.post('/api/authenticate', {username})
    } catch (error) {
        return { error : "Username Does Not Exist"}
    }
}

// Get User Details
export async function getUser({username}) {
    try {
        const {data} = await axios.get(`/api/user/${username}`);
        return {data};
    } catch (error) {
        return {error : " Password Does Not Matched"}
    }
}

// Register user function
export async function registerUser(credentials) {
    try {
        const {data : {message}, status} = await axios.post(`/api/register`, credentials)

        let {username, email} = credentials;

        // Send Mail
        if (status === 200) {
            await axios.post('/app/registerMail', {username, userEmail: email, text: message})
        };
        return Promise.resolve(message);
    } catch (error) {
        return Promise.reject({error});
    }
}

// login function 
export async function verifyPassword({username, password}) {
    try {
        if (username) {  
            const {data} = await axios.post('/api/login', {username, password});
            return Promise.resolve({data})
        }
        
    } catch (error) {
        return Promise.reject("Password Does Not Matched")
    }
}

// Update User Profile Function
export async function updateuser(response) {
    try {
        const token = await localStorage.getItem("token");
        const data = await axios.put('/api/updateuser', response, { headers : { "Authorization" : `Bearer ${token}`}})
        return Promise.resolve({data});
    } catch (error) {
        return Promise.reject("User Data Could Not Update");
    }
}