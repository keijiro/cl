#pragma strict

private var lightIntensity : float;
private var screenBrightness : float;

function Start() {
    lightIntensity = light.intensity;

    var currentBrightness = ScreenAdjuster.GetBrightness();
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
    ScreenAdjuster.SetBrightness(Config.shade ? 0.0 : screenBrightness);
}
