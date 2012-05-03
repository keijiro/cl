#pragma strict

@HideInInspector
var intensity : float;

private var lightIntensity : float;
private var screenBrightness : float;
private var shadeFlag : boolean;

function Start() {
    intensity = 1.0;
    lightIntensity = light.intensity;
    screenBrightness = ScreenAdjuster.GetBrightness();
}

function SwitchBrightness() {
    if (shadeFlag) {
        animation.Play("Light On");
    } else {
        animation.Play("Light Off");
    }
    shadeFlag = !shadeFlag;
}

function Update() {
    light.intensity = lightIntensity * intensity;
    ScreenAdjuster.SetBrightness(screenBrightness * intensity);
}

function OnApplicationPause(pause : boolean) {
    if (pause) {
        animation.Stop();
        ScreenAdjuster.SetBrightness(screenBrightness);
        intensity = 1.0;
        shadeFlag = false;
    } else {
        screenBrightness = ScreenAdjuster.GetBrightness();
    }
}
