#pragma strict

var skin : GUISkin;
var baseColor : Color;

private var clockController : ClockController;
private var lightController : LightController;
private var dateString : String;
private var position : float;

private static var dowNames = [
    "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"
];

private static var monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

function Awake() {
    clockController = GameObject.Find("Clock").GetComponent.<ClockController>();
    lightController = GameObject.Find("Light").GetComponent.<LightController>();
}

function SetDate(month : int, day : int, dayOfWeek: int) {
    dateString = dowNames[dayOfWeek] + " " + day + " " + monthNames[month - 1];
}

function Update() {
    if (Input.GetMouseButtonDown(0) && Input.mousePosition.y > 1.5 * 40) {
        Config.hud = !Config.hud;
    }
    
    var target = Config.hud ? 1.0 : 0.0;
    position = target - (target - position) * Mathf.Exp(-15.0 * Time.deltaTime); 
}

function OnGUI() {
    var sw = Screen.width;
    var sh = Screen.height;
    
    GUI.skin = skin;
    GUILayout.BeginArea(Rect(8, sh - position * 40, sw - 12, 40));
    GUILayout.BeginHorizontal();
    
    GUI.color = baseColor;
    GUILayout.Label(dateString);
    
    GUILayout.FlexibleSpace();
    
    if (GUILayout.Button("", "ampm switch")) {
        Config.ampm = !Config.ampm;
        clockController.UpdateDisplay();
    }
    
    GUILayout.Button("", "theme switch");
    
    if (GUILayout.Button("", "light switch")) {
        lightController.SwitchBrightness();
    }
    
    GUI.color = baseColor * (Config.mute ? 0.5 : 1.0);
    if (GUILayout.Button("", "audio switch")) {
        Config.mute = !Config.mute;
    }
    
    GUILayout.EndHorizontal();
    GUILayout.EndArea();
}