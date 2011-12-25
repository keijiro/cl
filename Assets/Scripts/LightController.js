#pragma strict

private var intensity : float;

function Start() {
    intensity = light.intensity;
}

function Update() {
    light.intensity = intensity * (Config.nightMode ? 0.1 : 1.0);
}
