import styles from "./profile.module.scss";
import React, { useEffect, useContext } from "react";
import { ControllersContext } from "@contexts/ControllersContext";
import { AuthContext } from "@contexts/AuthContext";
import ItemProfileMenu, {
  ProfileItemLogout,
} from "@components/molecules/itemProfileMenu";
import EmptyMessage from "@components/molecules/emptyMessage";
import GenericButton from "@components/atoms/genericButton";
import Router from "next/router";
import toastMessage from "@utils/toastMessage";

export default function Profile() {
  const controllersContext = useContext(ControllersContext);
  const authContext = useContext(AuthContext);
  const { updateFooterType, isLoading } = controllersContext;
  const { user } = authContext;

  useEffect(() => {
    updateFooterType("main");
  }, [updateFooterType]);

  return user.uid ? (
    <ProfileWithLogin authContext={authContext} />
  ) : (
    <WithoutLogin />
  );
}

function WithoutLogin() {
  return (
    <div className={styles.container}>
      <EmptyMessage title="You dont do your login!" text=" " />
      <GenericButton
        isDisabled={false}
        text={"Login"}
        onClick={() => Router.push("/login")}
      />
    </div>
  );
}

function ProfileWithLogin({ authContext }) {
  const { signOut, authIsLoading } = authContext;

  const doSignOut = () => {
    signOut()
      .then(() => {
        toastMessage("You are loged out!", "success");
        Router.push("/");
      })
      .catch(() => {
        toastMessage("Something went wrong!", "error");
      });
  };

  return (
    <div className={styles.profile}>
      <ItemProfileMenu icon="file-text" path="/profile/my-informations">
        My informations
      </ItemProfileMenu>
      <ItemProfileMenu icon="credit-card" path="/profile/payment-methods">
        Payment Methods
      </ItemProfileMenu>
      <ItemProfileMenu icon="map-pin" path="/profile/address">
        Adress
      </ItemProfileMenu>
      <ProfileItemLogout
        icon="log-out"
        doLogout={() => doSignOut()}
        isLoading={authIsLoading}
      >
        Logout
      </ProfileItemLogout>
    </div>
  );
}
