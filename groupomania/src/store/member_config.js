// Create config default for requests once user token obtained
// >> set 'Authorization headers'

import store from '@/store'
import axios from 'axios'

// use instance method 'subscribe'
store.subscribe((mutation) => {
    /*** test to see result ***
* console.log(mutation); *
* type: auth/config_Token payload: return null *
* type: auth/config_User payload: return null *
*/
    switch (mutation.type) {
        case 'auth/config_Token':
            //console.log(mutation.payload); // = token ok
            if (mutation.payload) {
                // (then specify config default to apply for requests (cf.axios documentation ok))
                // Set Authorization headers for all resquest to do > use 'common' 
                axios.defaults.headers.common['Authorization'] = `Bearer ${mutation.payload}` // check headers: return payload ok!
                localStorage.setItem('token', mutation.payload)
            } else { // if no token 
                axios.defaults.headers.common['Authorization'] = ""
                localStorage.removeItem('token')
            }
    }
})
