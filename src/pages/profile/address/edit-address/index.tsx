import styles from "./editAddress.module.scss";
import React, { useState, useEffect, useContext } from "react";
import { ControllersContext } from "@contexts/ControllersContext";
import GenericInput from "@components/atoms/genericInput";
import GenericButton from "@components/atoms/genericButton";
import { AuthContext } from "@contexts/AuthContext";
import { useMutation } from "@apollo/react-hooks";
import { UPDATE_USER_ADDRESS } from "@graphql/mutations";
import { initializeApollo } from "@graphql/apollo";
import { GET_USER_ADDRESS_BY_UID } from "@graphql/queries";
import toastMessage from "@utils/toastMessage";
import { useRouter } from "next/router";

export default function EditAddress() {
  const router = useRouter();
  const client = initializeApollo();

  const controllersContext = useContext(ControllersContext);
  const authContext = useContext(AuthContext);
  const { updateFooterType, updateHeaderText } = controllersContext;
  const { user, updateUser } = authContext;

  const [street, setStreet] = useState(user.street);
  const [number, setNumber] = useState(user.number);
  const [zipCode, setZipCode] = useState(user.zipCode);
  const [state, setState] = useState(user.state);
  const [city, setCity] = useState(user.city);
  const [neighbourhood, setNeighbourhood] = useState(user.neighbourhood);
  const [isLoading, setIsLoading] = useState(false);

  const [updateAddress] = useMutation(UPDATE_USER_ADDRESS);

  useEffect(() => {
    updateHeaderText("Edit Address");
    updateFooterType("none");
    const userStorage: any = JSON.parse(localStorage.getItem("@noemia:user"));

    client
      .query({
        query: GET_USER_ADDRESS_BY_UID,
        variables: {
          uid: userStorage.uid,
        },
      })
      .then(({ data }) => {
        setStreet(data.users[0].street);
        setNumber(data.users[0].number);
        setZipCode(data.users[0].zipCode);
        setState(data.users[0].state);
        setCity(data.users[0].city);
        setNeighbourhood(data.users[0].neighbourhood);
      });
  }, [updateFooterType, updateHeaderText]);

  const saveAddAdress = () => {
    setIsLoading(true);

    const userStorage: any = JSON.parse(localStorage.getItem("@noemia:user"));
    const newAdress = {
      street,
      number,
      zipCode,
      state,
      city,
      neighbourhood,
    };

    const userUpdated = { ...user, ...newAdress };

    updateUser(userUpdated);

    if (userUpdated !== user) {
      updateAddress({
        variables: {
          uid: userStorage.uid,
          street: userUpdated.street,
          number: userUpdated.number,
          zipCode: userUpdated.zipCode,
          state: userUpdated.state,
          city: userUpdated.city,
          neighbourhood: userUpdated.neighbourhood,
        },
      })
        .then(({ data }) => {
          toastMessage("Your adrress has was updated!", "success");
          router.back();
        })
        .catch(() => {
          toastMessage("Something went wrong!", "error");
        });
    }
    setIsLoading(false);
  };

  return (
    <div className={styles.myInformations}>
      <form className={styles.form}>
        <GenericInput
          id="street"
          label="Street"
          value={street}
          setValue={setStreet}
        />
        <div className={styles.grid}>
          <GenericInput
            id="number"
            label="Number"
            type="number"
            value={number}
            setValue={setNumber}
          />
          <GenericInput
            id="zipcode"
            label="Zip code"
            value={zipCode}
            setValue={setZipCode}
          />
        </div>
        <GenericInput
          id="state"
          label="State"
          value={state}
          setValue={setState}
        />
        <GenericInput id="city" label="City" value={city} setValue={setCity} />
        <GenericInput
          id="Neighbourhood"
          label="Neighbourhood"
          value={neighbourhood}
          setValue={setNeighbourhood}
        />
      </form>
      <div className={styles.button}>
        <GenericButton
          text="save"
          isDisabled={false}
          isLoading={isLoading}
          onClick={() => saveAddAdress()}
        />
      </div>
    </div>
  );
}
