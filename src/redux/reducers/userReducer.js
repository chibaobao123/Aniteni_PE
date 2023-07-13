const users = {
    user: []
}

export const userReducer = (state = users, action) => {
    
    switch(action.type) {
        case 'GET_USER_OWNER': {
            state.user = [...state.user, action.value]
            return {...state};
        }

        default : return {...state};;
    }
}