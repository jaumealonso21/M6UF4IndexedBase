window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
var db;
function startDB() {
    if (!window.indexedDB) {
        window.alert("El teu navegador no suporta IndexedDB.");
    }

    var dbName = "ProvaDB";

    var request = indexedDB.open(dbName, 1);

    request.onerror = function (event) {
        console.log("request.onerror" + event.target.errorCode);
    };
    request.onupgradeneeded = function (event) {
        console.log("request.onupgradeneeded, we are creating a new version of the dataBase");
        db = event.target.result;
        var objectStore = db.createObjectStore("alumnes", {keyPath: "dni"});
        objectStore.createIndex("by_dni", "dni", {unique: true});
    };
    request.onsuccess = function (event) {
        console.log("request.onsuccess, database opened, now we can add / remove / look for data in it!");
        db = event.target.result;
    };

}

function deleteDB() {

    var request = indexedDB.deleteDatabase("ProvaDB");
    request.onsuccess = function (event) {
        console.log("Base de dades esborrada");
    };
}

function addData() {

    var transaction = db.transaction(["alumnes"], "readwrite");
    transaction.oncomplete = function (event) {
        console.log("Transacció Completa!");
    };
    transaction.onerror = function (event) {
        console.log("transaction.onerror errcode=" + event.target.error.name);
    };

    var objectStore = transaction.objectStore("alumnes");
    var alumne = {};
    alumne.dni = document.getElementById("dni").value;
    alumne.nom = document.getElementById("nom").value;
    alumne.cognom = document.getElementById("cognom").value;
    alumne.email = document.getElementById("correu").value;
    var request = objectStore.add(alumne);
    //var request = objectStore.add({dni: "44444444H", nom: "Peter", cognom: "Parker", email: "peter@cdm.dom"});
    request.onsuccess = function (event) {
        console.log("Dades afegides correctament.");
    };
    request.onerror = function (event) {
        console.log("request.onerror, no es poden inserir dades, errcode = " + event.target.error.name);
    };
}

