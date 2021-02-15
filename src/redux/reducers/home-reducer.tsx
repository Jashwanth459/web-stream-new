import { IStore } from '../../helpers/types';

import { LOADING, MODE_TOGGLE, ADD_TO_CART, ADD_TO_LIKED_LIST, REMOVE_FROM_LIKED_LIST } from '../constants';

const INITIAL_STATE: IStore = {
    likedList: [],
    cartList: [],
    loading: false,
    cartSum: 0,
    likedSum: 0,
    isLightTheme: true
}

export const ACTION_HANDLERS: any = {

    [LOADING]: (state: IStore, action: any) => {
      return { 
          ...state,
          loading: true
      }
    },

    [MODE_TOGGLE]: (state: IStore, action: any) => {
        return { 
            ...state,
            isLightTheme: !state.isLightTheme
        }
    },

    [ADD_TO_CART]: (state: IStore, action: any) => {
        var itemExistsInCart = state.cartList.some( (value: any) => { return value.id ===  action.payload.id} ); 
        if (itemExistsInCart) {
            return {
                ...state
            }
        }
        return { 
            ...state,
            cartSum: state.cartSum + 1,
            cartList: [...state.cartList, action.payload]
        }
    },

    [ADD_TO_LIKED_LIST]: (state: IStore, action: any) => {
        var itemExistsInLikedList = state.likedList.some( (value: any) => { return value.id ===  action.payload.id} ); 
        if (itemExistsInLikedList) {
            return {
                ...state
            }
        }
        return { 
            ...state,
            likedSum: state.likedSum + 1,
            likedList: [...state.likedList, action.payload]
        }
    },

    [REMOVE_FROM_LIKED_LIST]: (state: IStore, action: any) => {
        var filtered = state.likedList.filter(function(value: any, index, arr){ 
            return !(value.id === action.payload.id);
        });
        return { 
            ...state,
            likedSum: state.likedSum - 1,
            likedList: [...filtered]
        }
    }
}

export default function AppReducer(state: IStore = INITIAL_STATE, action: any) : IStore {
    const handler = ACTION_HANDLERS[action.type]
    return handler ? handler(state, action) : state
}
