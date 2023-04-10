import classes from './MeetupDetail.module.css'

export default function MeetupDetail(props){
    return(
        <section className={classes.details}>
            <img src={props.image} alt="A First Meet up" />
            <h1>{props.title}</h1>
            <address>{props.address} </address>
            <p>{props.description}</p>
        </section>
    )
}