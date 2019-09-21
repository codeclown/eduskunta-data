import React from 'react';
import ParliamentGroup from './ParliamentGroup';

const PersonInfo = ({ personId, firstName, lastName, subtitle, parliamentGroupId, parliamentGroupName, parliamentGroupEndDate, small }) => (
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <img
      width={small ? 30 : 50}
      height={small ? 30 : 50}
      src={`/edustaja/${personId}/portrait.jpg`}
      alt={`${firstName} ${lastName}`}
      className="rounded float-left mr-2"
    />
    <div>
      <a
        className="text-body clearfix"
        href={`/edustaja/${personId}`}
      >
        {firstName} {lastName}
      </a>
      {subtitle || ''}
      {parliamentGroupId && (
        <ParliamentGroup
          groupId={parliamentGroupId}
          groupName={parliamentGroupName}
          dim={parliamentGroupEndDate !== null}
        />
      )}
    </div>
  </div>
);

export default PersonInfo;
