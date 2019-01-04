import React from 'react';
import { Text } from 'react-native';
import { withNavigationFocus } from 'react-navigation';

class FocusStateLabel extends React.Component {
  render() {
    return(
      console.log("isFocused", this.props.isFocused)
    );
  }
}

export default withNavigationFocus(FocusStateLabel);
