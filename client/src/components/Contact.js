import { useRef, useState } from "react";
import emailjs from '@emailjs/browser';


function Contact(props) {

    const form = useRef();
    const [hideClassName, setHideClassName] = useState(true);

    const sendEmail = (e) => {
        e.preventDefault();
        setHideClassName(false);
        emailjs.sendForm(process.env.REACT_APP_SERVICE_ID, process.env.REACT_APP_TEMPLATE_ID, form.current, process.env.REACT_APP_EMAIL_PUBLIC_KEY)
        .then((result) => {
            console.log(result.text);
            e.target.reset();
            setHideClassName(false);
        }, (error) => {
            console.log(error.text);
        });
    };

    return (
        <form className="contact-form" ref={form} onSubmit={sendEmail}>
            <h2>Contact Me</h2>
            <div className="form-group">
                <input type="text"
                    placeholder="Full Name"
                    name="user_name" required />
            </div>
            <div className="form-group">
                <input type="email"
                    placeholder="Email"
                    name="user_email" required />
            </div>
            <div className="form-group">
                <textarea name="message" placeholder="Message"
                    cols="30" rows="10"></textarea>
            </div>
            <button type="submit">Send Message </button>
            <div className={`text-center  ${hideClassName ? 'opacity-0' : 'mt-4'}`}>
                Message has been sent successfully! I'll be in touch soon!
            </div>
        </form>
    );
}

export default Contact;