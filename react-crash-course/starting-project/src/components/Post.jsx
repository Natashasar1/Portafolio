import classes from './Post.module.css';
//!REACT COMPONENT NO.1
function Post(props) {
   
    return (<li className={classes.post}>
        
        <p className={classes.author}>{props.author}</p>
        <p className={classes.text}>{props.body}</p>
    </li>
    );
}
export default Post;