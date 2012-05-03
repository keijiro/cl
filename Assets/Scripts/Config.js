#pragma strict

static var ampm : boolean;
static var shade : boolean;
static var mute : boolean;
static var hud : boolean;

function Awake() {
    Application.targetFrameRate = 60.0;
    
    ampm = PlayerPrefs.GetInt("ampm", 1) != 0;
    shade = PlayerPrefs.GetInt("shade", 0) != 0;
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
    PlayerPrefs.SetInt("ampm", ampm ? 1 : 0);
    PlayerPrefs.SetInt("shade", shade ? 1 : 0);
    PlayerPrefs.SetInt("mute", mute ? 1 : 0);
    PlayerPrefs.SetInt("hud", hud ? 1 : 0);
}