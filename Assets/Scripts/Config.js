#pragma strict

static var nightMode : boolean;

function Awake() {
    Application.targetFrameRate = 60.0;
}

function Update() {
    if (Input.GetButtonDown("Fire1")) {
        nightMode = !nightMode;
    }
}
