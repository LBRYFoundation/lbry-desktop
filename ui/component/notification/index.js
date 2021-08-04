import { connect } from 'react-redux';
import { doReadNotifications, doDeleteNotification } from 'redux/actions/notifications';
import { doResolveUri } from 'lbry-redux';
import Notification from './view';

export default connect(null, {
  doReadNotifications,
  doDeleteNotification,
  doResolveUri,
})(Notification);
