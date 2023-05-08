import React from 'react';
import {Image, StyleSheet} from 'react-native';
import {View} from 'react-native';
import {Text} from 'react-native';
import {banner} from '../../../../assets/Image';
import {fonts} from '../../../utils/fonts';
import {theme} from '../../../utils/theme';

const HomeBanner = () => {
  const {
    headtag,
    moneytag,
    difftag,
    diffContainer,
    root,
    diffText,
    bannerContainer,
    bannerImage,
  } = HomeBannerStyle;
  return (
    <View style={root}>
      <View>
        <Text style={headtag}>Expense total</Text>
        <Text style={moneytag}>$ 3264</Text>
        <View style={diffContainer}>
          <Text style={difftag}>+$320</Text>
          <Text style={diffText}> than last month</Text>
        </View>
      </View>
      <View style={bannerContainer}>
        <Image source={banner} style={bannerImage} />
      </View>
    </View>
  );
};

export default HomeBanner;

const HomeBannerStyle = StyleSheet.create({
  root: {
    marginVertical: 24,
    backgroundColor: theme.colors.banner,
    padding: 20,
    borderRadius: 7,
    gap: 6,
    flexDirection: 'row',
    position: 'relative',
  },
  headtag: {
    color: theme.colors.white,
    fontFamily: fonts.CarosSoft,
    fontSize: 18,
  },
  moneytag: {
    color: theme.colors.white,
    fontFamily: fonts.CarosSoftMedium,
    fontSize: 48,
  },
  difftag: {
    fontSize: 12,
    backgroundColor: theme.icon[200],
    justifyContent: 'center',
    alignItems: 'center',
    padding: 4,
    color: theme.colors.white,
    fontFamily: fonts.CarosSoftMedium,
    borderRadius: 4,
  },
  diffContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    color: theme.colors.white,
  },
  diffText: {color: theme.colors.white, fontFamily: fonts.CarosSoftLight},
  bannerContainer: {
    height: 200,
    width: 200,
    position: 'absolute',
    right: -20,
    top: -10,
    transform: [{rotateX: '20deg'}],
  },
  bannerImage: {width: '100%', height: '100%', resizeMode: 'cover'},
});
