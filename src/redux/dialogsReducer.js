const SEND_MESSAGE = 'myProject/dialogs/SEND-MESSAGE';

let initialState = {
    dialogs: [
        {
            id: 1,
            name: 'Enji',
            img: 'https://i.pinimg.com/originals/df/71/c6/df71c6da6d92e2b0011a380492015ee5.jpg',
        },
        {
            id: 2,
            name: 'Marceille',
            img: 'https://shutniki.club/wp-content/uploads/2019/12/v1-babay29.png',
        },
        {
            id: 3,
            name: 'Leon',
            img: 'https://i.pinimg.com/474x/03/10/9f/03109ff60e3ad4e24ba8e37300fca9bb.jpg',
        },
        {
            id: 4,
            name: 'Marise',
            img: 'https://cache3.youla.io/files/images/720_720_out/5c/8b/5c8bea3b9f35999287588518.jpg',
        },
    ],
    messages: [
        {id: 1, message: 'Hi)',},
        {id: 2, message: 'How is your studying?',},
        {id: 3, message: 'It\'s fine now, but I\'m worrying about my future.',},
        {id: 4, message: 'I wanna to be everything okay(',},
        {id: 5, message: 'Just do something, and the result will show itself))',},
    ],
};

const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEND_MESSAGE:
            return (
               {
                    ...state,
                    messages: [...state.messages, {id: 6, message: action.newMessageText,}],
                }
            );
        default:
            return state;
    }
}

export const sendMessage = (newMessageText) => ({type: SEND_MESSAGE, newMessageText});

export default dialogsReducer;