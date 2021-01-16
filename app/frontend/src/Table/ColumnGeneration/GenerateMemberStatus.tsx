import React from 'react';
import { DBMemberStats } from '../../Interfaces/MemberStats';

export default (m:DBMemberStats) => {

  const statusToColor: { [key: string]: string | undefined } = {
    'up': 'green',
    'down': 'red',
    'unknown': 'blue'
  };

  const status = m.monitorStatus.description;
  const statusSpan =
    <span
      style={{fontWeight: 'bold', color: statusToColor[status] || '',}}
      >
      {status}
    </span>;

  const state = m['status.enabledState'].description;
  const stateSpan =
    <span
      style={{fontWeight: state === 'disabled' ? 'bold': 'normal'}}
    >
      {state}
    </span>;

  return (
    <>
      {statusSpan} ({stateSpan})
    </>
  );

};
