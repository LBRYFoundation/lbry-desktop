// @flow
import React from 'react';
import Card from 'component/common/card';
import HomepageSelector from 'component/homepageSelector';
import SettingLanguage from 'component/settingLanguage';
// $FlowFixMe
import homepages from 'homepages';

type Props = {};

export default function SettingAppearance(props: Props) {
  return (
    <Card
      title={__('Appearance')}
      subtitle=""
      isBodyList
      body={
        <>
          {/* --- Language --- */}
          <div className="card__main-actions">
            <SettingLanguage />
          </div>

          {/* --- Homepage --- */}
          {homepages && Object.keys(homepages).length > 1 && (
            <div className="card__main-actions">
              <HomepageSelector />
            </div>
          )}
        </>
      }
    />
  );
}
