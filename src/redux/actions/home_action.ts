import { LOADING, GET_DATA } from "../constants";

export function getData(filter: Array<number>) {
    return async (dispatch: any) => {
        if (!filter) {
            dispatch({type: LOADING})
        }
        return fetch('https://data.nasa.gov/resource/y77d-th95.json')
            .then(response => response.json())
            .then(data => {
                return dispatch({
                    type: GET_DATA,
                    data,
                    rawData:data,
                    filter
                })
            })
    }
}
