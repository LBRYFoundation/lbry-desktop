import { connect } from 'react-redux';
import { doReadNotifications, doDeleteNotification } from 'redux/actions/notifications';
import { doCommentReactList } from 'redux/actions/comments';
import Notification from './view';
import { selectFetchingMyChannels } from 'lbry-redux';
import {
  selectIsFetchingReacts,
} from 'redux/selectors/comments';

const select = (state) => ({
    fetchingChannels: selectFetchingMyChannels(state),
    isFetchingReacts: selectIsFetchingReacts(state),
});

export default connect(select, {
  doReadNotifications,
  doDeleteNotification,
  doCommentReactList,
})(Notification);
