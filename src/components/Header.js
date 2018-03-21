import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCurrentUser } from '../actions';
import { bindActionCreators } from "redux";
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { bindActionCreators } from "redux";
import { fetchCurrentUser } from '../actions';

class Header extends Component {

  constructor(props) {
    super(props)
  }

  componentDidMount () {
    this.props.fetchCurrentUser()
  }
  renderContent() {
    switch (this.props.auth) {
      case null:
        return <a className='Header-login' href='/auth/google'>Login</a>;
      case false:
        return <a className='Header-login' href='/auth/google'>Login</a>;
      default:
        return (
        <a className='Header-login' href='/api/logout'>Logout</a>
      )
    }
  }

  render() {
    return (
      <div className='container-fluid'>
        <div className='Header-bar row text-center'>
          <div className='col-2 py-3'><FontAwesomeIcon icon='bars' color='#283e48' className='cursor-pointer' size='lg' onClick={this.props.toggleSidebar} /></div>
          <div className='col-8 mt-2'><strong class='Header-bar-brand'>ReSlackd</strong></div>
          <div className='col-2 py-3'>{this.renderContent()}</div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
    return { auth };
}

function mapDispatchToProps(dispatch) {
<<<<<<< HEAD
  return bindActionCreators({ fetchCurrentUser }, dispatch);
}
    
export default connect(mapStateToProps, mapDispatchToProps)(Header);
=======
  return bindActionCreators({ fetchCurrentUser  }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
>>>>>>> 37ee0938ac956fe48e00f2e370756a3fe93d8826
