import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Container, Button } from 'react-bootstrap'
import FormContainer from "../components/FormContainer";
import { toast } from 'react-toastify'
import Loader from "../components/Loader";
import { useRegisterMutation, useUpdateUserMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { useDispatch, useSelector } from "react-redux";


const ProfileScreen = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [updateProfile, { isLoading }] = useUpdateUserMutation()

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { userInfo } = useSelector((state) => state.auth);

    useEffect(() => {
        setName(userInfo.name)
        setEmail(userInfo.email)
    }, [userInfo.setName, userInfo.setEmail]);

    const submitHandler = async (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            toast.error('Password do not match')
        } else {
            try {
                const res = await updateProfile({
                    _id: userInfo._id,
                    name, email, password
                }).unwrap()
                dispatch(setCredentials({ ...res }))
                toast.success(`You've successfully updated your profile!`)
            } catch (err) {
                toast.error(err?.data?.message || err.error)
            }
        }
    }
    return (
        <FormContainer>
            <h1>Edit Profile</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group className="my-2" controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="enter name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group className="my-2" controlId="email">
                    <Form.Label>Email Adress</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group className="my-2" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group className="my-2" controlId="confirmPassword">
                    <Form.Label>ConfirmPassword</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="confirm password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                {/* if it's loading, show spinner */}
                {isLoading && <Loader />}
                <Button type='submit' variant='primary' className='mt-3'>Update</Button>

            </Form>
        </FormContainer>
    )
}

export default ProfileScreen