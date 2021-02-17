import { notify } from '../../helpers/notification';
import { IStore } from '../../helpers/types';

import { LOADING, MODE_TOGGLE, ADD_TO_CART, ADD_TO_LIKED_LIST, REMOVE_FROM_LIKED_LIST, REMOVE_FROM_CART } from '../constants';

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
            notify('Failed!!', 'Item already exists in the Cart...');
            return {
                ...state,
            }
        }
        notify('Successful!!', 'Saved to the Cart...');
        return { 
            ...state,
            cartSum: state.cartSum + 1,
            cartList: [...state.cartList, action.payload]
        }
    },

    [ADD_TO_LIKED_LIST]: (state: IStore, action: any) => {
        var itemExistsInLikedList = state.likedList.some( (value: any) => { return value.id ===  action.payload.id} ); 
        if (itemExistsInLikedList) {
            notify('Failed!!', 'Item already exists in the Liked list...');
            return {
                ...state,
            }
        }
        notify('Successful!!', 'Saved to the Liked list...');
        return { 
            ...state,
            likedSum: state.likedSum + 1,
            likedList: [...state.likedList, action.payload]
        }
    },

    [REMOVE_FROM_LIKED_LIST]: (state: IStore, action: any) => {
        var filtered = state.likedList.filter(function(value: any, index, arr){ 
            return !(value.id === action.payload);
        });
        notify('Successful!!', 'Removed from the Liked List...');
        return { 
            ...state,
            likedSum: state.likedSum - 1,
            likedList: [...filtered]
        }
    },

    [REMOVE_FROM_CART]: (state: IStore, action: any) => {
        var filtered = state.cartList.filter(function(value: any, index, arr){ 
            return !(value.id === action.payload);
        });
        notify('Successful!!', 'Removed from the Cart...');
        return { 
            ...state,
            cartSum: state.cartSum - 1,
            cartList: [...filtered]
        }
    }
}

export default function AppReducer(state: IStore = INITIAL_STATE, action: any) : IStore {
    const handler = ACTION_HANDLERS[action.type]
    return handler ? handler(state, action) : state
}
