import React, { memo, useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { Mutation, MutationLoginArgs } from "../../src/schematypes/schematypes"
import { TextField, ITextFieldStyles } from 'office-ui-fabric-react/lib/TextField';
import { AUTH_TOKEN } from '../constants'
import { Image, IImageProps, ImageFit } from 'office-ui-fabric-react/lib/Image';
import HeaderImage from "../assets/EBLogoHeader.png"
import { IStackStyles, Stack } from 'office-ui-fabric-react/lib/Stack';
import {
  getTheme,
  mergeStyleSets,
  FontWeights,
  ContextualMenu,
  Text,
  DefaultButton,
  IButtonStyles,
  PrimaryButton,
  IconButton,
  IIconProps,

} from 'office-ui-fabric-react';
import { isLoggedInVar } from '../cache';

import Loading from "./Loading"

const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`

type Login = {
  login: boolean
  email: string | undefined
  password: string | undefined
  name: string
}

interface Props {
  login: Login
  onChangeLoginEmail: (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue: string | undefined) => void
  onChangeLoginPassword: (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue: string | undefined) => void
  setLogin: (value: React.SetStateAction<Login>) => void
}

const headerStackStyles: Partial<IStackStyles> = { root: { width: "100vw", backgroundColor: "#20314b", marginBottom: "10px" } };
const headerImageStyles: Partial<IStackStyles> = { root: { marginLeft: "auto", marginRight: "auto" } };
const textFieldStyles: Partial<ITextFieldStyles> = { fieldGroup: { width: 250 } };
const textErrorStyles: Partial<ITextFieldStyles> = { root: { color: "red", marginBottom: 10 } };
const primaryButtonStyles: Partial<IButtonStyles> = { root: { /* width: 150, */ marginTop: "20px !important" } };
const signInIcon: IIconProps = { iconName: 'SignIn' };

const imageProps: IImageProps = {
  src: HeaderImage,
  imageFit: ImageFit.contain,
};

export const Login: React.FC<Props> = memo(({ login, onChangeLoginEmail, onChangeLoginPassword, setLogin }) => {



  const [loginMutation, { data, error, loading }] = useMutation<Mutation, MutationLoginArgs>(LOGIN_MUTATION, {
    onCompleted({ login: login1 }) {

      localStorage.setItem('token', login1!.token as string);
      setLogin({ ...login, login: false })


    }, errorPolicy: 'none'
  });

  const loginCallback = () => {
    loginMutation({
      variables: {
        email: login.email!,
        password: login.password!
      }

    })
  }

  if (error) {
    error.graphQLErrors.map(error => {
      console.log(error.message);

    })
  };
  if (loading) return <Loading></Loading>;
  if (error) return (
    <Stack
      horizontalAlign="center"
      verticalAlign="start"
      verticalFill
      styles={{
        root: {
          /*  width: '960px', */
          margin: '0 auto',
          textAlign: 'center',
          color: '#605e5c',
          /* backgroundColor: "rgba(177, 140, 72, 0.1);" */

        }
      }}
      gap={15}>

      <Stack styles={headerStackStyles} horizontal>
        <Image
          {...imageProps}
          alt='Header Image'
          width={400}
          height={100}
          styles={headerImageStyles}
        />


      </Stack>

      <Stack
        horizontalAlign="center"
        verticalAlign="start"

        styles={{
          root: {
            /*  width: '960px', */
            margin: '0 auto',
            textAlign: 'center',
            color: 'white',
            backgroundColor: "white",
            border: "1px solid rgb(138, 136, 134)",
            boxShadow: "2px 3px 11px 7px #00000026",
            padding: "30px",
            marginTop: "75px !important",

          }
        }}>

        <Text styles={textErrorStyles}>Incorrect username or password</Text>
        <TextField
          label="Email"
          value={login.email}
          onChange={onChangeLoginEmail}
          styles={textFieldStyles}
        />

        <TextField
          label="Password"
          value={login.password}
          onChange={onChangeLoginPassword}
          styles={textFieldStyles}
        />


        <PrimaryButton styles={primaryButtonStyles} iconProps={signInIcon} text="Sign In" onClick={loginCallback} />



      </Stack>

    </Stack>

  );

  return (
    <Stack
      horizontalAlign="center"
      verticalAlign="start"
      verticalFill
      styles={{
        root: {
          /*  width: '960px', */
          margin: '0 auto',
          textAlign: 'center',
          color: '#605e5c',
          /* backgroundColor: "rgba(177, 140, 72, 0.1);" */

        }
      }}
      gap={15}>

      <Stack styles={headerStackStyles} horizontal>
        <Image
          {...imageProps}
          alt='Header Image'
          width={400}
          height={100}
          styles={headerImageStyles}
        />


      </Stack>

      <Stack
        horizontalAlign="center"
        verticalAlign="start"

        styles={{
          root: {
            /*  width: '960px', */
            margin: '0 auto',
            textAlign: 'center',
            color: 'white',
            backgroundColor: "white",
            border: "1px solid rgb(138, 136, 134)",
            boxShadow: "2px 3px 11px 7px #00000026",
            padding: "30px",
            marginTop: "75px !important",

          }
        }}>


        <TextField
          label="Email"
          value={login.email}
          onChange={onChangeLoginEmail}
          styles={textFieldStyles}
        />

        <TextField
          label="Password"
          value={login.password}
          onChange={onChangeLoginPassword}
          styles={textFieldStyles}
        />


        <PrimaryButton styles={primaryButtonStyles} iconProps={signInIcon} text="Sign In" onClick={loginCallback} />



      </Stack>

    </Stack>

  )



})

export default Login