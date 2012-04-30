#pragma strict

var skin : GUISkin;
var baseColor : Color;

function OnGUI() {
    var sw = Screen.width;
    var sh = Screen.height;
    
    GUI.skin = skin;
    GUILayout.BeginArea(Rect(8, sh - 40, sw - 12, 40));
    GUILayout.BeginHorizontal();
    
    GUI.color = baseColor;
    GUILayout.Label("Mon 30 Apr");
    
    GUILayout.FlexibleSpace();
    
    GUILayout.Button("", "theme switch");
    
    GUI.color = baseColor * (Config.shade ? 0.5 : 1.0);
    if (GUILayout.Button("", "light switch")) {
        Config.shade = !Config.shade;
    }
    
    GUI.color = baseColor * (Config.mute ? 0.5 : 1.0);
    if (GUILayout.Button("", "audio switch")) {
        Config.mute = !Config.mute;
    }
    
    GUILayout.EndHorizontal();
    GUILayout.EndArea();
}