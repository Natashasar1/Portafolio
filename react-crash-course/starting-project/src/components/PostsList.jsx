import { useState } from 'react';
import NewPost from './NewPost';
import Post from './Post';

import classes from './PostsList.module.css';
function PostsList() {
    const [enteredBody, setEnteredBody] = useState('');
    const [enteredAuthor, setEnteredAuthor] = useState('');

    function bodyChangeHandler(event) {
        setEnteredBody(event.target.value);
    }

    function authorChangeHandler(event) {
        setEnteredBody(event.target.value);
    }
    return (
        <>
    <NewPost onBodyChange={bodyChangeHandler} onAuthorChange={authorChangeHandler} />
    <ul className={classes.posts}>
    <Post author="Natasha" body={enteredBody} />
    <Post author="Valeria" body="ReactJs is great" />
            </ul>
            </>
    );
}
export default PostsList;