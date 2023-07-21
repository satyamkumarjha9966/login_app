import axios from 'axios';

// Specifie Backend Server Domain URL
axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;


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

// Generate OTP
export async function generateOTP(username) {
    try {
        const {data : {code}, status} = await axios.get('/api/generateOTP', { params : { username } })

        // Send Mail With OTP
        if (status === 200) {
            let {data: {email}} = await getUser({username});
            let text = `Your Password Recovery OTP is ${code}. Verify and Recover Your Password.`
            await axios.post('/api/registerMail', { username, userEmail: email, text, subject : "Password Recovery OTP"})
        }

        return Promise.resolve(code);

    } catch (error) {
        return Promise.reject({error})
    }
}

// Verify OTP
export async function verifyOTP({username, code}) {
    try {
        const {data, status} = await axios.get('/api/verifyOTP', {params : {username, code}})
        return Promise.resolve({data, status});
    } catch (error) {
        return Promise.reject(error);
    }
}

// Reset Password
export async function resetPassword({username, password}) {
    try {
        const {data, status} = await axios.put('/api/resetPassword', {username, password});
        return Promise.resolve({data, status});
    } catch (error) {
        return Promise.reject(error)
    }
}