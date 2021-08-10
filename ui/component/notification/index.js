import { connect } from 'react-redux';
import { doReadNotifications, doDeleteNotification } from 'redux/actions/notifications';
import { doResolveUri, selectMyChannelClaims } from 'lbry-redux';
import Notification from './view';

const select = (state) => ({
    myChannels: selectMyChannelClaims(state),
  });

export default connect(select, {
  doReadNotifications,
  doDeleteNotification,
  doResolveUri,
})(Notification);
