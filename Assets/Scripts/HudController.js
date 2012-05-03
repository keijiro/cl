#pragma strict

var skins : GUISkin[];
var baseColor : Color;
var imgsAmPmButton : Texture2D[];
var imgsThemeButton : Texture2D[];
var imgsLightButton : Texture2D[];
var imgsAudioButton : Texture2D[];

@HideInInspector
var guiPosition : float;

private var clockController : ClockController;
private var themeController : ThemeController;
private var lightController : LightController;

private var resolution : int;
private var guiHeight : int;

private var dateString : String;

private static var dowNames = [
    "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"
];

private static var monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

function SetDate(month : int, day : int, dayOfWeek: int) {
    dateString = dowNames[dayOfWeek] + " " + day + " " + monthNames[month - 1];
}

function Awake() {
    clockController = FindObjectOfType(ClockController);
    themeController = FindObjectOfType(ThemeController);
    lightController = FindObjectOfType(LightController);
}

function Start() {
    resolution = Screen.dpi > 200 ? 1 : 0;
    guiHeight = resolution == 1 ? 80 : 40;
    guiPosition = Config.hud ? 1.0 : 0.0;
}

function Update() {
    if (!animation.isPlaying && Input.GetMouseButtonDown(0) && Input.mousePosition.y > guiHeight) {
        Config.hud = !Config.hud;
        animation.Play(Config.hud ? "HUD On" : "HUD Off");
    }
}

function OnGUI() {
    var sw = Screen.width;
    var sh = Screen.height;
    
    GUI.skin = skins[resolution];
    GUI.color = baseColor;
    
    GUILayout.BeginArea(Rect(8, sh - guiPosition * guiHeight, sw - 12, guiHeight - 4));
    GUILayout.BeginVertical();
    GUILayout.FlexibleSpace();
    GUILayout.BeginHorizontal();
    
    GUILayout.Label(dateString);
    GUILayout.FlexibleSpace();
    
    if (GUILayout.Button(imgsAmPmButton[resolution])) {
        Config.ampm = !Config.ampm;
        clockController.UpdateDisplay();
    }
    
    if (GUILayout.Button(imgsThemeButton[resolution])) {
        themeController.ChangeTheme();
    }
    
    if (GUILayout.Button(imgsLightButton[resolution])) {
        lightController.SwitchBrightness();
    }
    
    GUI.color = baseColor * (Config.mute ? 0.5 : 1.0);
    if (GUILayout.Button(imgsAudioButton[resolution])) {
        Config.mute = !Config.mute;
    }
    
    GUILayout.EndHorizontal();
    GUILayout.EndVertical();
    GUILayout.EndArea();
}
