import React, { useContext, useEffect, useState } from "react";
import styles from "./register.module.scss";
import { useMutation } from "@apollo/react-hooks";
import { CREATE_USER } from "@graphql/mutations";
import toastMessage from "@utils/toastMessage";
import { ControllersContext } from "@contexts/ControllersContext";
import { AuthContext } from "@contexts/AuthContext";
import ContainerSpaceBetween from "@components/atoms/containerSpaceBetween";
import GenericButton from "@components/atoms/genericButton";
import GenericButtonGoogle from "@components/atoms/genericButtonGoogle";
import GenericTitle from "@components/atoms/genericTitle";
import GenericInput from "@components/atoms/genericInput";
import GenericMaskedInput from "@components/atoms/genericMaskedInput";
import GenericText from "@components/atoms/genericText";
import Image from "next/image";
import Router from "next/router";

export default function Register() {
  const controllersContext = useContext(ControllersContext);
  const authContext = useContext(AuthContext);
  const { updateFooterType } = controllersContext;
  const {
    createAccount,
    signInAccountWithGoogle,
    authIsLoading,
    updateLoading,
    updateUser,
    user,
  } = authContext;

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const [createUser] = useMutation(CREATE_USER);

  useEffect(() => {
    updateFooterType("none");
  }, [updateFooterType]);

  useEffect(() => {
    if (user.uid) {
      Router.back();
    }
  }, [user]);

  const redirect = () => {
    Router.replace("/login", "/login", { shallow: true });
  };

  const emailSignUp = ({ name, email, password, phone }) => {
    if (
      email &&
      password &&
      password === passwordConfirm &&
      password.length >= 6
    ) {
      createAccount({ name, email, password, phone }).then((response) => {
        updateLoading(true);

        if (response.code === "auth/email-already-in-use") {
          toastMessage("This email already in use", "error");
          updateLoading(false);
        }

        if (!response.code) {
          const { uid, email } = response;

          createUser({
            variables: {
              users: {
                uid,
                email,
                name,
                phone,
                paymentMethods: {
                  data: {
                    nickName: "Money",
                    number: "",
                    type: "money",
                    niceType: "money",
                    valid: "",
                    nameOwner: "",
                  },
                },
                mainPaymentMethod: {
                  data: {
                    nickName: "Money",
                    number: "",
                    type: "money",
                    niceType: "money",
                    valid: "",
                    nameOwner: "",
                  },
                },
              },
            },
          }).then(({ data }) => {
            updateLoading(false);
            updateUser(data.insert_users_one);
            Router.back()
          }).catch(() => {
            updateLoading(false);
          });
        }
      });
    }
  };

  const goolgeSignIn = () => {
    signInAccountWithGoogle().then((response) => {
      const { uid, email } = response;

      createUser({
        variables: {
          users: {
            uid,
            email,
            name,
            paymentMethods: {
              data: {
                nickName: "Money",
                number: "",
                type: "money",
                niceType: "money",
                valid: "",
                nameOwner: "",
              },
            },
            mainPaymentMethod: {
              data: {
                nickName: "Money",
                number: "",
                type: "money",
                niceType: "money",
                valid: "",
                nameOwner: "",
              },
            },
          },
        },
      }).then(({ data }) => {
        updateLoading(false);
        updateUser(data.insert_users_one);
        Router.back()
      }).catch(() => {
        updateLoading(false);
      });
    });
  };

  const isDisabled = () => {
    if (
      email &&
      password &&
      password === passwordConfirm &&
      password.length >= 6
    ) {
      return false;
    }
    return true;
  };

  return (
    <div className={styles.container}>
      <div className={styles.imageBackgroundContainer}>
        <div className={styles.imageContainer}>
          <Image src={"/logo.png"} alt="logo" layout="fill" objectFit="cover" />
        </div>
      </div>

      <div className={styles.registerContainer}>
        <ContainerSpaceBetween>
          <GenericTitle>Register</GenericTitle>
          <div className={styles.loginWrapper} onClick={() => redirect()}>
            <GenericText>Login</GenericText>
            <span>&#8594;</span>
          </div>
        </ContainerSpaceBetween>

        <form>
          <GenericInput label="Your Name" value={name} setValue={setName} />
          <GenericMaskedInput
            label="Phone (optional)"
            mask={["(99) 9 9999-9999"]}
            value={phone}
            setValue={setPhone}
          />
          <GenericInput label="Email" value={email} setValue={setEmail} />
          <GenericInput
            label="Password"
            type="password"
            value={password}
            setValue={setPassword}
          />
          <div className={styles.passwordRule}>
            <ul>
              <li>6 Min characters</li>
            </ul>
          </div>
          <GenericInput
            label="Password Confirm"
            type="password"
            value={passwordConfirm}
            setValue={setPasswordConfirm}
          />
        </form>
        <div className={styles.button}>
          <GenericButton
            isDisabled={isDisabled()}
            text="Register"
            onClick={() => emailSignUp({ name, email, password, phone })}
            isLoading={authIsLoading}
          />
        </div>
        <br />
        <ContainerSpaceBetween>
          <hr />
          <span>or</span>
          <hr />
        </ContainerSpaceBetween>
        <br />
        <GenericButtonGoogle
          text="Login with Google"
          onClick={() => goolgeSignIn()}
        />
        <br />
      </div>
    </div>
  );
}
