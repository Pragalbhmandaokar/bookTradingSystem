import React, { Fragment } from 'react'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
const linkButton = ({ buttonText, buttonStyle, link }) => (
    <Fragment>
      <Link style={linkStyle} to={link}>
        <Button variant="contained" color="primary" style={buttonStyle}>
          {buttonText}
        </Button>
      </Link>
    </Fragment>
  );
  
  LinkButtons.propTypes = {
      buttonText: PropTypes.string,
      // eslint-disable-next-line react/forbid-prop-types
      buttonStyle: PropTypes.object.isRequired,
      link: PropTypes.string,
    };
    
    LinkButtons.defaultProps = {
        link: '/',
        buttonText: 'Default Button Text',
    };
    
    
    
    export default linkButton;