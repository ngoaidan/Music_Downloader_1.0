import * as React from 'react';

export const isReadyRef = React.createRef<any>();

export const navigationRef = React.createRef<any>();

export function navigate(name, params) {
    if (isReadyRef.current && navigationRef.current) {
        navigationRef.current.navigate(name, params);
    } else {
    }
}