import { useState, FormEvent, ChangeEvent } from "react";

import FormInput from "../form-input/form-input.component";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";

import {
  emailSignInStart,
  googleSignInStart,
} from "../../store/user/user.action";

import { SignInContainer, ButtonContainer } from "./sign-in-form.styles";
import { useDispatch } from "react-redux";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;
  const dispatch = useDispatch();

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const signInWithGoogle = async () => {
    dispatch(googleSignInStart());
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      dispatch(emailSignInStart(email, password));
      resetFormFields();
    } catch (error) {
      console.log("user sign in failed", error);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <SignInContainer>
      <h2>I already have an account</h2>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="email"
          type="email"
          required
          onChange={handleChange}
          name="email"
          value={email}
        />
        <FormInput
          label="Password"
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
        />
        <ButtonContainer>
          <Button type="submit">SIGN IN</Button>
          <Button
            onClick={signInWithGoogle}
            buttonType={BUTTON_TYPE_CLASSES.google}
            type="button"
          >
            GOOGLE SIGN IN
          </Button>
        </ButtonContainer>
      </form>
    </SignInContainer>
  );
};

export default SignInForm;
