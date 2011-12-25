#pragma strict

var beep1 : AudioClip;
var beep2 : AudioClip;

private var ampm : GameObject;
private var numbers : GameObject[] = new GameObject[6];
private var prevSecond : int;

function Start() {
    ampm = GameObject.Find("AMPM");
    numbers[0] = GameObject.Find("H1");
    numbers[1] = GameObject.Find("H2");
    numbers[2] = GameObject.Find("M1");
    numbers[3] = GameObject.Find("M2");
    numbers[4] = GameObject.Find("S1");
    numbers[5] = GameObject.Find("S2");
}

function Update() {
    var time = System.DateTime.Now;

    if (time.Second != prevSecond) {
        ampm.SendMessage("SetAmPm", time.Hour >= 12);

        var hour = time.Hour;
        if (PlayerPrefs.GetInt("two_four_hour", 0) == 0 && hour >= 12) {
            hour -= 12;
        }

        numbers[0].SendMessage("SetNumber", hour / 10);
        numbers[1].SendMessage("SetNumber", hour % 10);
        numbers[2].SendMessage("SetNumber", time.Minute / 10);
        numbers[3].SendMessage("SetNumber", time.Minute % 10);
        numbers[4].SendMessage("SetNumber", time.Second / 10);
        numbers[5].SendMessage("SetNumber", time.Second % 10);

        if (!Config.nightMode) {
            var beepEnabled = PlayerPrefs.GetInt("hour_beep", 1);
            var tickEnabled = PlayerPrefs.GetInt("second_tick", 1);

            if (beepEnabled && time.Minute == 0 && time.Second == 0) {
                audio.PlayOneShot(beep2);
            } else if (beepEnabled && time.Minute == 59 && time.Second >= 57) {
                audio.PlayOneShot(beep1);
            } else if (tickEnabled) {
                audio.Play();
            }
        }

        prevSecond = time.Second;
    }
}
