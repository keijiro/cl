#pragma strict

#if UNITY_IPHONE && !UNITY_EDITOR

import System.Runtime.InteropServices;

@DllImportAttribute("__Internal") static private function _ScreenAdjusterGetBrightness() : float {}
@DllImportAttribute("__Internal") static private function _ScreenAdjusterSetBrightness(level : float) {}

#else

static private function _ScreenAdjusterGetBrightness() : float { return 1.0; }
static private function _ScreenAdjusterSetBrightness(level : float) {}

#endif

private var lightIntensity : float;
private var screenBrightness : float;

function Start() {
    lightIntensity = light.intensity;

    var currentBrightness = _ScreenAdjusterGetBrightness();
    if (currentBrightness < 0.1) {
        screenBrightness = 0.5;
        Config.shade = true;
    } else {
        screenBrightness = currentBrightness;
        Config.shade = false;
    }
}

function Update() {
    light.intensity = lightIntensity * (Config.shade ? 0.2 : 1.0);
    _ScreenAdjusterSetBrightness(Config.shade ? 0.0 : screenBrightness);
}
