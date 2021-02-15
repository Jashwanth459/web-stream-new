import React from 'react';
// import { connect } from 'react-redux';
import { useSelector } from 'react-redux';

// import ShopContext from '../context/shop-context'
import { MainNavigation } from '../../components/MainNavigation'
import { IStore } from '../../helpers/types';
// import { removeProductFromCart } from '../store/actions';
import './Profile.css';

export interface ILandings { 
  landings: IStore
}

function ProfilePage(props: any) {
  const cartItemCount = useSelector((state: ILandings) => state);
  console.log('cartItem', cartItemCount)
  // const dispatch = useDispatch();
  console.log('props', props)
  const backgroundImage = !cartItemCount.landings.isLightTheme ? 
    `url('http://localhost:3000/statics/white_home_background.jpg')`
    : `url('http://localhost:3000/statics/black_home_background.jpg')`
  const stylesObj = {
    backgroundImage
  }
  return (
    <div className='App'>
    <MainNavigation cartItemNumber={cartItemCount.landings} />
    <div className='container' style={stylesObj}>
      <h3>Coming soon...</h3>
    </div>
    {/* <main className="cart">
    Hello
      {this.context.cart.length <= 0 && <p>No Item in the Cart!</p>}
      <ul>
        {this.context.cart.map(cartItem => (
          <li key={cartItem.id}>
            <div>
              <strong>{cartItem.title}</strong> - ${cartItem.price} (
              {cartItem.quantity})
            </div>
            <div>
              <button
                onClick={this.context.removeProductFromCart.bind(
                  this,
                  cartItem.id
                )}
              >
                Remove from Cart
              </button>
            </div>
          </li>
        ))}
      </ul>
    </main> */}
    </div>
  );
}

// const mapStateToProps = (state: any) => {
//   return {
//     // cartItems: state.cart,
//     cartItemCount: state.landings.cartSum
//   };
// };

// const mapDispatchToProps = dispatch => {
//   return {
//     removeProductFromCart: id => dispatch(removeProductFromCart(id))
//   };
// };

// export default connect(
//   mapStateToProps
// )(CartPage);

export default ProfilePage
