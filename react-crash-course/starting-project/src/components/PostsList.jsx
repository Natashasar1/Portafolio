import { useState } from 'react';
import NewPost from './NewPost';
import Post from './Post';
import Modal from './Modal';

import classes from './PostsList.module.css';
function PostsList({isPosting, onStopPosting}) {
    
    const [enteredBody, setEnteredBody] = useState('');
    const [enteredAuthor, setEnteredAuthor] = useState('');

    

    function bodyChangeHandler(event) {
        setEnteredBody(event.target.value);
    }

    function authorChangeHandler(event) {
        setEnteredAuthor(event.target.value);
    }

   /* let modalContent; 

    if (modalIsVisible) {
        modalContent = (
            
        );
    }*/
    return (
        <>
            {isPosting && (
            <Modal onClose={onStopPosting}>
                <NewPost onBodyChange={bodyChangeHandler}
                        onAuthorChange={authorChangeHandler}
                        onCancel={onStopPosting}
                    />
                    
            </Modal>
            )} 
    <ul className={classes.posts}>
    <Post author={enteredAuthor} body={enteredBody} />
    <Post author="Valeria" body="ReactJs is great" />
            </ul>
            </>
    );
}
export default PostsList;