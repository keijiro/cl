#pragma strict

#if UNITY_IPHONE && !UNITY_EDITOR

import System.Runtime.InteropServices;

@DllImportAttribute("__Internal") static private function _ScreenAdjusterGetBrightness() : float {}
@DllImportAttribute("__Internal") static private function _ScreenAdjusterSetBrightness(level : float) {}

static function GetBrightness() {
    return _ScreenAdjusterGetBrightness();
}

static function SetBrightness(level : float) {
    _ScreenAdjusterSetBrightness(level);
}

#else

private static var brightness = 1.0;

static function GetBrightness() {
    return brightness;
}

static function SetBrightness(level : float) {
    brightness = level;
}

#endif
