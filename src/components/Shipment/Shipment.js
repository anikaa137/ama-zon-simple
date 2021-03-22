import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { UserContext } from "../../App";
import './Shipment.css'

const Shipment = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const { register, handleSubmit, watch, errors } = useForm();
    const onSubmit = (data) => {
        console.log('on submit',data)
    };

    console.log(watch("example")); // watch input value by passing the name of it

    return (
        <form className="ship-from" onSubmit={handleSubmit(onSubmit)}>
            <input name="name" ref={register({ required: true })} defaultValue={loggedInUser.name} placeholder="name" />
            {errors.exampleRequired && <span className="error" > Name is required</span>}

            <input name="email" ref={register({ required: true })} defaultValue={loggedInUser.email} placeholder="email"/>
            {errors.exampleRequired && <span className="error">  email is required</span>}

            <input name="address" ref={register({ required: true })} placeholder="address"/>
            {errors.exampleRequired && <span className="error">  address is required</span>}

            <input name="phone" ref={register({ required: true })} placeholder="phone"/>
            {errors.exampleRequired && <span className="error"> phone is required</span>}

            <input type="submit" />
        </form>
    );
};

export default Shipment;
