import {
  BACKGROUND,
  COLD_GREY,
  DEEP_OCEAN,
  DEEP_PINK,
  LIGHT_GREY,
  LIGHT_OCEAN,
  LIGHT_PINK,
  WHITE_TEXT,
} from './color'

export const ANTD_CONFIG_BLACK = {
  token: {
    fontFamily: '"Gill Sans", "Gill Sans MT", sans-serif',
    fontSize: 16,
    colorText: LIGHT_GREY,
    colorLink: LIGHT_GREY,
    colorLinkHover: LIGHT_PINK,
    fontSizeHeading1: 30,
    fontSizeHeading2: 16,
    linkDecoration: 'underline',
    colorBgContainer: 'transparent',
  },
  components: {
    Layout: {
      bodyBg: BACKGROUND,
      footerBg: BACKGROUND,
      headerBg: BACKGROUND,
    },

    Tabs: {
      itemColor: `${LIGHT_GREY}`,
    },

    Button: {
      defaultBg: DEEP_PINK,
      defaultColor: WHITE_TEXT,
      defaultHoverBg: LIGHT_PINK,
      defaultHoverColor: LIGHT_OCEAN,
      defaultActiveBg: DEEP_OCEAN,
      defaultActiveColor: LIGHT_OCEAN,
      borderRadius: 8,
      fontWeight: 600,
      paddingInlineLG: 27,
      border: false,
    },

    Input: {
      borderRadius: 8,
      colorBorder: LIGHT_GREY,
      hoverBorderColor: `${DEEP_PINK}70`,
      activeBorderColor: DEEP_PINK,
      activeShadow: `0 0 0 2px ${DEEP_PINK}30`,
      colorText: LIGHT_PINK,
      colorTextPlaceholder: LIGHT_GREY,
    },

    Modal: {
      contentBg: `${COLD_GREY}`,
      headerBg: `${COLD_GREY}`,
    },

    Popover: {
      colorBgElevated: BACKGROUND,
    },

    Drawer: {
      colorBgElevated: BACKGROUND,
    },

    Badge: {
      textFontSize: 10,
      indicatorHeight: 14,
      colorBgContainer: 'white',
    },

    Notification: {
      colorBgElevated: BACKGROUND,
    },
  },
}

export const ANTD_CONFIG = {
  token: {
    fontFamily: '"Gill Sans", "Gill Sans MT", sans-serif',
    fontSize: 16,
    colorText: COLD_GREY,
    colorLink: COLD_GREY,
    colorLinkHover: LIGHT_PINK,
    fontSizeHeading1: 30,
    fontSizeHeading2: 16,
    linkDecoration: 'underline',
  },
  components: {
    Layout: {
      bodyBg: 'white',
      footerBg: 'white',
      headerBg: 'white',
    },

    Button: {
      defaultBg: DEEP_PINK,
      defaultColor: WHITE_TEXT,
      defaultHoverBg: LIGHT_PINK,
      defaultHoverColor: WHITE_TEXT,
      defaultActiveBg: DEEP_OCEAN,
      defaultActiveColor: LIGHT_PINK,
      borderRadius: 8,
      fontWeight: 600,
      paddingInlineLG: 27,
      border: false,
    },

    Input: {
      borderRadius: 8,
      colorBorder: LIGHT_GREY,
      hoverBorderColor: `${DEEP_PINK}70`,
      activeBorderColor: DEEP_PINK,
      activeShadow: `0 0 0 2px ${DEEP_PINK}30`,
      colorText: COLD_GREY,
      colorTextPlaceholder: LIGHT_GREY,
    },

    Drawer: {
      colorBgElevated: 'white',
    },

    Badge: {
      textFontSize: 10,
      indicatorHeight: 14,
    },
  },
}
