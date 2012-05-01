#pragma strict

var amMesh : Mesh;
var pmMesh : Mesh;

private var isPm : boolean;

function SetAmPm(pmFlag : boolean) {
    if (pmFlag != isPm) {
        GetComponent.<MeshFilter>().mesh = pmFlag ? pmMesh : amMesh;
        isPm = pmFlag;
    }
    renderer.enabled = Config.ampm;
}
