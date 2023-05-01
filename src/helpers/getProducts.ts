import { Filter } from "../type/types";

/* eslint-disable max-len */
export const getProducts = () => {
  const URL = 'http://vinyl-records-store.eu-central-1.elasticbeanstalk.com/records/';

  return fetch(URL)
    .then((response) => response.json());
};


export const getDetails = (productId: string) => {
  const URL = `http://vinyl-records-store.eu-central-1.elasticbeanstalk.com/records/${productId}`;

  return fetch(URL)
    .then((response) => response.json());
};

export const buttonsFilter = Object.values(Filter);
