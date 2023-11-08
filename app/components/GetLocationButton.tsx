'use client';

import React from 'react';

// Props for a function callback
type Props = {
  onClick: () => void;
};

export default function GetLocationButton({ onClick }: Props) {
  return (
    <div>
      <button onClick={onClick}>Get your location</button>
    </div>
  );
}
