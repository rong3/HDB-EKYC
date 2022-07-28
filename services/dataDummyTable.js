// All user related database operations can be defined here.
import axios from 'axios'
import { GET_TABLE_DATA } from "./CONSTANTS";

/**
 * Function to fetch all the users.
 */
export const getAllTableData = () => {
    return new Promise((resolve, reject) => {
        try {
            // do an SDK, DB call or API endpoint axios call here and return the promise.
            axios
                .get(GET_TABLE_DATA())
                .then((res) => {
                    resolve(res.data);
                })
                .catch((err) => {
                    reject("Error in getAllUsers axios!");
                });
        } catch (error) {
            reject('SYSTEM_ERROR');
        }
    });
};
