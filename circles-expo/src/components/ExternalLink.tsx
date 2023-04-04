import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import { Platform } from 'react-native';
import { Text, useThemeColor } from './Themed';

export const ExternalLink = ({ hrefAttrs, children, ...props }: React.ComponentProps<typeof Link>) => {
  const color = useThemeColor('text');

  return (
    <Link
      hrefAttrs={{
        ...hrefAttrs,
        // On web, launch the link in a new tab.
        target: '_blank',
      }}
      {...props}
      onPress={(e) => {
        if (Platform.OS !== 'web') {
          // Prevent the default behavior of linking to the default browser on native.
          e.preventDefault();
          // Open the link in an in-app browser.
          WebBrowser.openBrowserAsync(props.href as string);
        }
      }}
    >
      <Text
        style={[
          {
            color,
            textDecorationLine: 'underline',
          },
        ]}
      >
        {children}
      </Text>{' '}
      <FontAwesome style={{ paddingBottom: 3 }} name="external-link" color={color} />
    </Link>
  );
};
