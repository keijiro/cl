#pragma strict

static var theme : int;
static var ampm : boolean;
static var mute : boolean;
static var hud : boolean;

function Awake() {
    Application.targetFrameRate = 60.0;
    
    theme = PlayerPrefs.GetInt("theme", 0);
    ampm = PlayerPrefs.GetInt("ampm", 1) != 0;
    mute = PlayerPrefs.GetInt("mute", 0) != 0;
    hud = PlayerPrefs.GetInt("hud", 0) != 0;
}

function OnApplicationPause(pause : boolean) {
    if (pause) SaveSettings();
}

function OnApplicationQuit() {
    SaveSettings();
}

function SaveSettings() {
    PlayerPrefs.SetInt("theme", theme);
    PlayerPrefs.SetInt("ampm", ampm ? 1 : 0);
    PlayerPrefs.SetInt("mute", mute ? 1 : 0);
    PlayerPrefs.SetInt("hud", hud ? 1 : 0);
}
