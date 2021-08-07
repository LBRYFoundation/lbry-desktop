// @flow
import { ALERT } from 'constants/icons';
import React from 'react';
import Button from 'component/button';
import Card from 'component/common/card';
import { FormField } from 'component/common/form';
import SettingAutoLaunch from 'component/settingAutoLaunch';
import SettingClosingBehavior from 'component/settingClosingBehavior';
import SettingsRow from 'component/settingsRow';
import SettingWalletServer from 'component/settingWalletServer';

// @if TARGET='app'
const IS_MAC = process.platform === 'darwin';
// @endif

type Price = {
  currency: string,
  amount: number,
};

type SetDaemonSettingArg = boolean | string | number | Price;

type DaemonSettings = {
  download_dir: string,
  share_usage_data: boolean,
  max_key_fee?: Price,
  max_connections_per_download?: number,
  save_files: boolean,
  save_blobs: boolean,
  ffmpeg_path: string,
};

type Props = {
  daemonSettings: DaemonSettings,
  setDaemonSetting: (string, ?SetDaemonSettingArg) => void,
  clearCache: () => Promise<any>,
};

export default function SettingSystem(props: Props) {
  const { daemonSettings, setDaemonSetting, clearCache } = props;
  const [clearingCache, setClearingCache] = React.useState(false);

  return (
    <Card
      title={__('System')}
      subtitle=""
      isBodyList
      body={
        <>
          {/* @if TARGET='app' */}
          <SettingsRow
            title={__('Save all viewed content to your downloads directory')}
            subtitle={__(
              'Paid content and some file types are saved by default. Changing this setting will not affect previously downloaded content.'
            )}
          >
            <FormField
              type="checkbox"
              name="save_files"
              onChange={() => setDaemonSetting('save_files', !daemonSettings.save_files)}
              checked={daemonSettings.save_files}
            />
          </SettingsRow>
          <SettingsRow
            title={__('Save hosting data to help the LBRY network')}
            subtitle={
              <React.Fragment>
                {__("If disabled, LBRY will be very sad and you won't be helping improve the network.")}{' '}
                <Button button="link" label={__('Learn more')} href="https://lbry.com/faq/host-content" />.
              </React.Fragment>
            }
          >
            <FormField
              type="checkbox"
              name="save_blobs"
              onChange={() => setDaemonSetting('save_blobs', !daemonSettings.save_blobs)}
              checked={daemonSettings.save_blobs}
            />
          </SettingsRow>
          {/* @endif */}

          {/* @if TARGET='app' */}
          {/* Auto launch in a hidden state doesn't work on mac https://github.com/Teamwork/node-auto-launch/issues/81 */}
          {!IS_MAC && (
            <SettingsRow
              title={__('Start minimized')}
              subtitle={__(
                'Improve view speed and help the LBRY network by allowing the app to cuddle up in your system tray.'
              )}
            >
              <SettingAutoLaunch noLabels />
            </SettingsRow>
          )}
          {/* @endif */}

          {/* @if TARGET='app' */}
          <SettingsRow title={__('Leave app running in notification area when the window is closed')}>
            <SettingClosingBehavior noLabels />
          </SettingsRow>
          {/* @endif */}

          {/* @if TARGET='app' */}
          <SettingsRow title={__('Experimental settings')} useVerticalSeparator>
            {/* Disabling below until we get downloads to work with shared subscriptions code */}
            {/*
            <FormField
              type="checkbox"
              name="auto_download"
              onChange={() => setClientSetting(SETTINGS.AUTO_DOWNLOAD, !autoDownload)}
              checked={autoDownload}
              label={__('Automatically download new content from my subscriptions')}
              helper={__(
                "The latest file from each of your subscriptions will be downloaded for quick access as soon as it's published."
              )}
            />
            */}

            <fieldset-section>
              <FormField
                name="max_connections"
                type="select"
                label={__('Max Connections')}
                helper={__(
                  'For users with good bandwidth, try a higher value to improve streaming and download speeds. Low bandwidth users may benefit from a lower setting. Default is 4.'
                )}
                min={1}
                max={100}
                onChange={(e) => setDaemonSetting('max_connections_per_download', e.target.value)}
                value={daemonSettings.max_connections_per_download}
              >
                {[1, 2, 4, 6, 10, 20].map((connectionOption) => (
                  <option key={connectionOption} value={connectionOption}>
                    {connectionOption}
                  </option>
                ))}
              </FormField>
            </fieldset-section>

            <SettingWalletServer />
          </SettingsRow>
          {/* @endif */}

          <SettingsRow
            title={__('Clear application cache')}
            subtitle={__('This might fix issues that you are having. Your wallet will not be affected.')}
          >
            <Button
              button="secondary"
              icon={ALERT}
              label={clearingCache ? __('Clearing') : __('Clear Cache')}
              onClick={() => {
                setClearingCache(true);
                clearCache();
              }}
              disabled={clearingCache}
            />
          </SettingsRow>
        </>
      }
    />
  );
}
