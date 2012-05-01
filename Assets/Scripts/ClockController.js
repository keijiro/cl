#pragma strict

var beep1 : AudioClip;
var beep2 : AudioClip;

private var hud : HudController;
private var ampm : AmPmController;
private var numbers : NumberController[] = new NumberController[6];
private var prevSecond : int;

function Start() {
    hud = GameObject.Find("HUD").GetComponent.<HudController>();
    ampm = GameObject.Find("AMPM").GetComponent.<AmPmController>();
    numbers[0] = GameObject.Find("H1").GetComponent.<NumberController>();
    numbers[1] = GameObject.Find("H2").GetComponent.<NumberController>();
    numbers[2] = GameObject.Find("M1").GetComponent.<NumberController>();
    numbers[3] = GameObject.Find("M2").GetComponent.<NumberController>();
    numbers[4] = GameObject.Find("S1").GetComponent.<NumberController>();
    numbers[5] = GameObject.Find("S2").GetComponent.<NumberController>();
}

function UpdateDisplay() {
    var time = System.DateTime.Now;
    
    hud.SetDate(time.Month, time.Day, time.DayOfWeek);
    ampm.SetAmPm(time.Hour >= 12);
    
    var hour = time.Hour;
    if (Config.ampm) {
        if (hour == 0) {
            hour = 12;
        } else if (hour > 12) {
            hour -= 12;
        }
    }
    
    numbers[0].SetNumber(hour / 10);
    numbers[1].SetNumber(hour % 10);
    numbers[2].SetNumber(time.Minute / 10);
    numbers[3].SetNumber(time.Minute % 10);
    numbers[4].SetNumber(time.Second / 10);
    numbers[5].SetNumber(time.Second % 10);
}

function PlayTick() {
    var time = System.DateTime.Now;
    if (time.Minute == 0 && time.Second == 0) {
        audio.PlayOneShot(beep2);
    } else if (time.Minute == 59 && time.Second >= 57) {
        audio.PlayOneShot(beep1);
    } else {
        audio.Play();
    }
}

function Update() {
    var current = System.DateTime.Now.Second;
    if (current != prevSecond) {
        UpdateDisplay();
        if (!Config.mute) PlayTick();
        prevSecond = current;
    }
}
