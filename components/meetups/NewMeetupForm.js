import { useRef, useState } from 'react';

import Card from '../ui/Card';
import classes from './NewMeetupForm.module.css';
import Link from 'next/link';

function NewMeetupForm(props) {
  const titleInputRef = useRef();
  const imageInputRef = useRef();
  const addressInputRef = useRef();
  const descriptionInputRef = useRef();
  const [disabled, setDisabled] = useState(false);

  function submitHandler(event) {
    event.preventDefault();

    const enteredTitle = titleInputRef.current.value;
    const enteredImage = imageInputRef.current.value;
    const enteredAddress = addressInputRef.current.value;
    const enteredDescription = descriptionInputRef.current.value;

    const meetupData = {
      title: enteredTitle,
      image: enteredImage,
      address: enteredAddress,
      description: enteredDescription,
    };

    props.onAddMeetup(meetupData);
    setDisabled(true)
    console.log("clicked....")
  }
  // const handleClick = () => {
  // }

  return (
    <Card>
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='title'>Meetup Title</label>
          <input type='text' required id='title' ref={titleInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='image'>Meetup Image</label>
          <input type='url' required id='image' ref={imageInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='address'>Address</label>
          <input type='text' required id='address' ref={addressInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='description'>Description</label>
          <textarea
            id='description'
            required
            rows='5'
            ref={descriptionInputRef}
          ></textarea>
        </div>
        <div className={disabled ? classes.Btnstyle : classes.actions}>
          {/* <Link href='/'> */}
          <button
            // onClick={handleClick}
            disabled={disabled}
          >
            {/* {disabled ? 'Adding...' : 'Add Meetup'} */}
            Add Meetup
          </button>
          {/* </Link> */}
        </div>
      </form>
    </Card>
  );
}

export default NewMeetupForm;