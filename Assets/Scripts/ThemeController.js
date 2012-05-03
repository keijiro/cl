#pragma strict

var ambientColors : Color[];
var bgColors : Color[];
var fx : ParticleSystem[];

private var currentAmbientColor : Color;
private var currentBgColor : Color;

function ChangeTheme() {
    fx[Config.theme].enableEmission = false;
    Config.theme = (Config.theme + 1) % 3;
    fx[Config.theme].enableEmission = true;
}

function Start() {
    currentAmbientColor = ambientColors[Config.theme];
    currentBgColor = bgColors[Config.theme];
    fx[Config.theme].enableEmission = true;
}

function Update () {
    var delta = Mathf.Exp(-0.75 * Time.deltaTime);
    currentAmbientColor = Color.Lerp(ambientColors[Config.theme], currentAmbientColor, delta);
    currentBgColor = Color.Lerp(bgColors[Config.theme], currentBgColor, delta);
    
    RenderSettings.ambientLight = currentAmbientColor;
    RenderSettings.fogColor = currentBgColor;
    Camera.main.backgroundColor = currentBgColor;
}
