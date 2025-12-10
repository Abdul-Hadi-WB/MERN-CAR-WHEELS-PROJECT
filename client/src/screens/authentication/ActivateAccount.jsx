import React, { useEffect, useState } from "react";
import Loader from "../../layouts/Loader";
import { useParams } from "react-router-dom";
import { successToast, errorToast } from "../../helpers/toastify";
import axios from "axios";
import apis from "../../config/apis";


const ActivateAccount = () => {
  const [loader, setLoader] = useState(false);
  const { token } = useParams();

  useEffect(() => {
    token && activateAccount();
  }, [token]);

  const activateAccount = async () => {
    try {
      setLoader(true);
      const { data } = await axios.post(`${apis.auth}/signup`, { token });

      if (data?.message) {
        successToast(data.message);
        setLoader(false);
      }

      if (data?.error) {
        errorToast(data.error);
        setLoader(false);
      }
    } catch (err) {
      setLoader(false);
      console.log(err.message);
    }
  };

  return <div className="mt-96">{loader && <Loader />}</div>;
};

export default ActivateAccount;
