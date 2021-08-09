// @flow
import * as ICONS from 'constants/icons';
import * as PAGES from 'constants/pages';
import { SETTINGS_GRP } from 'constants/settings';
import React from 'react';
import Button from 'component/button';
import Card from 'component/common/card';
import SettingAccountPassword from 'component/settingAccountPassword';
import SettingsRow from 'component/settingsRow';
import SyncToggle from 'component/syncToggle';
import { getPasswordFromCookie } from 'util/saved-passwords';

type Props = {
  // --- select ---
  isAuthenticated: boolean,
  walletEncrypted: boolean,
  user: User,
  // --- perform ---
  doWalletStatus: () => void,
};

export default function SettingAccount(props: Props) {
  const { isAuthenticated, walletEncrypted, user, doWalletStatus } = props;
  const [storedPassword, setStoredPassword] = React.useState(false);

  // Determine if password is stored.
  React.useEffect(() => {
    if (isAuthenticated || !IS_WEB) {
      doWalletStatus();
      getPasswordFromCookie().then((p) => {
        if (typeof p === 'string') {
          setStoredPassword(true);
        }
      });
    }
    // enterSettings(); @KP need to do this at each component, or just at Settings Page?
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Card
      id={SETTINGS_GRP.ACCOUNT}
      title={__('Account')}
      subtitle=""
      isBodyList
      body={
        <>
          {isAuthenticated && (
            <div className="card__main-actions">
              <SettingAccountPassword />
            </div>
          )}

          {/* @if TARGET='app' */}
          <div className="card__main-actions">
            <SyncToggle disabled={walletEncrypted && !storedPassword && storedPassword !== ''} />
          </div>
          {/* @endif */}

          {/* @if TARGET='web' */}
          {user && user.fiat_enabled && (
            <SettingsRow
              title={__('Bank Accounts')}
              subtitle={__('Connect a bank account to receive tips and compensation in your local currency')}
            >
              <Button
                button="secondary"
                label={__('Manage')}
                icon={ICONS.SETTINGS}
                navigate={`/$/${PAGES.SETTINGS_STRIPE_ACCOUNT}`}
              />
            </SettingsRow>
          )}
          {/* @endif */}

          {/* @if TARGET='web' */}
          {isAuthenticated && (
            <SettingsRow
              title={__('Payment Methods')}
              subtitle={__('Add a credit card to tip creators in their local currency')}
            >
              <Button
                button="secondary"
                label={__('Manage')}
                icon={ICONS.SETTINGS}
                navigate={`/$/${PAGES.SETTINGS_STRIPE_CARD}`}
              />
            </SettingsRow>
          )}
          {/* @endif */}
        </>
      }
    />
  );
}
