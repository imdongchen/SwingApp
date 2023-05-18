import {UserInfo} from 'firebase/auth';
import {Avatar} from 'native-base';
import React, {ComponentProps} from 'react';

export function ProfileAvatar({
  displayName,
  photoURL,
  size = 'md',
}: UserInfo & {size?: ComponentProps<typeof Avatar>['size']}) {
  return (
    <Avatar
      bg="lightBlue.400"
      size={size}
      source={{uri: photoURL || undefined}}>
      {getInitials(displayName || '')}
    </Avatar>
  );
}

function getInitials(name: string) {
  return name
    .split(' ')
    .map(n => n[0])
    .join('');
}
