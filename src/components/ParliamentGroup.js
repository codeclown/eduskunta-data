import classNames from 'classnames';
import React from 'react';

const parliamentGroups = [
  {
    // 'Keskustan eduskuntaryhmä'
    groupId: 'kesk01',
    color: '#71ad2c'
  },
  {
    // 'Liike Nyt -eduskuntaryhmä'
    groupId: 'liik01',
    color: '#ae2375'
  },
  {
    // 'Vihreä eduskuntaryhmä'
    groupId: 'vihr01',
    color: '#61bf1a'
  },
  {
    // 'Kansallisen kokoomuksen eduskuntaryhmä'
    groupId: 'kok01',
    color: '#0011ff'
  },
  {
    // 'Kristillisen liiton eduskuntaryhmä'
    groupId: 'kd01',
    color: '#ff8f1b'
  },
  {
    // 'Vasemmistoliiton eduskuntaryhmä'
    groupId: 'vas01',
    color: '#f00a64'
  },
  {
    // 'Sosialidemokraattinen eduskuntaryhmä'
    groupId: 'sd01',
    color: '#d7000a'
  },
  {
    // 'Ruotsalainen eduskuntaryhmä'
    groupId: 'r01',
    color: '#609de9'
  }
];

const ParliamentGroup = ({ groupId, groupName, dim }) => {
  const groupConfig = parliamentGroups.find(group => group.groupId === groupId);
  return (
    <span className={classNames(dim && 'text-muted')}>
      {groupConfig && groupConfig.color && (
        <span className="parliament-group-color" style={{ backgroundColor: groupConfig.color }} />
      )}
      {groupName}
    </span>
  );
};

export default ParliamentGroup;
