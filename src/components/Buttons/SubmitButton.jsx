import React,{Fragment} from 'react'
import PropTypes from 'prop-types';

 const SubmitButton = ({ buttonText }) => (
    <Fragment>
      <Button
        type="submit"
        variant="contained"
        color="primary">
        {buttonText}
      </Button>
    </Fragment>
  );
  
  SubmitButtons.propTypes = {
    buttonText: PropTypes.string.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    buttonStyle: PropTypes.object.isRequired,
  };
  
export default SubmitButton;