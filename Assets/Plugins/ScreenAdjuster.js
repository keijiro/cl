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

static function GetBrightness() {
    return 1.0;
}

static function SetBrightness(level : float) {
}

#endif
