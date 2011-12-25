#pragma strict

var numberMeshes : Mesh[];
var hideZero : boolean;

private var current = -1;

function SetNumber(index : int) {
    if (current != index) {
        current = index;

        if (hideZero && index == 0) {
            renderer.enabled = false;
        } else {
            renderer.enabled = true;
            GetComponent.<MeshFilter>().mesh = numberMeshes[current];
            animation.Play();
        }
    }
}
