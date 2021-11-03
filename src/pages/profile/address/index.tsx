import styles from "./address.module.scss";
import React, { useEffect, useContext } from "react";
import { ControllersContext } from "@contexts/ControllersContext";
import { AuthContext } from "@contexts/AuthContext";
import CardAddress from "@components/molecules/cardAddress";
import GenericText from "@components/atoms/genericText";
import GenericButton from "@components/atoms/genericButton";
import { useRouter } from "next/router";
import { initializeApollo } from "@graphql/apollo";
import { GET_USER_ADDRESS_BY_UID } from "@graphql/queries";
import Image from "next/image";

export default function Address() {
  const router = useRouter();
  const client = initializeApollo();
  const controllersContext = useContext(ControllersContext);
  const authContext = useContext(AuthContext);
  const { updateFooterType, updateHeaderText } = controllersContext;
  const { user, updateUser } = authContext;

  useEffect(() => {
    updateHeaderText("Address");
    updateFooterType("none");
  }, [updateHeaderText, updateFooterType]);

  useEffect(() => {
    const userStorage: any = JSON.parse(localStorage.getItem("@noemia:user"));
    if (!user.street) {
      client
        .query({
          query: GET_USER_ADDRESS_BY_UID,
          variables: {
            uid: userStorage.uid,
          },
        })
        .then(({ data }) => {
          updateUser(data.users[0]);
        });
    }
  }, []);

  return (
    <div className={styles.address}>
      {user.street ? (
        <CardAddress />
      ) : (
        <div className={styles.noAddress}>
          <div className={styles.imageContainer}>
            <Image
              src={`/maps.png`}
              alt={"address"}
              layout="fill"
              objectFit="cover"
            />
          </div>
          <GenericText>
            We don`t find any address, add a dress and come back!
          </GenericText>
          <div className={styles.button}>
            <GenericButton
              text="Add Address!"
              onClick={() => router.push("/profile/address/add-address")}
            />
          </div>
        </div>
      )}
    </div>
  );
}
