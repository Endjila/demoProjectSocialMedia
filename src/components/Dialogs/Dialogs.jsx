import React from 'react';
import classes from './Dialogs.module.css';
import Message from './Message/Message';
import DialogItem from './DialogItem/DialogItem';
import AddMessageReduxForm from './DialogForm';

const Dialogs = (props) => {

    let dialogsElements = props.dialogs.map(u => <DialogItem img={u.img} name={u.name} id={u.id} key={u.id} />);
    let messageElements = props.messages.map(m => <Message message={m.message} key={m.id} />);

    let addNewMessage = (values) => {
        props.sendMessage(values.newMessageText);
    }

    return (
        <div className={classes.dialogs}>
            <div className={classes.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={classes.messages}>
                <div className={classes.messagesBlock}>
                    {messageElements}
                </div>
                <AddMessageReduxForm onSubmit={addNewMessage}/>
            </div>
        </div>
    )

}

export default Dialogs;